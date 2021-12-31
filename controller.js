const path = require("path");
const http = require('http');
const fs = require('fs/promises');

const leesMap = require("./functies/leesMap.js");
const invertedSwitch = require("./functies/invertedSwitch.js");

(async () => {
    const services = {};
    const paginas = {};

    const servicepaden = (await leesMap("./services")).paden;
    const paginapaden = (await leesMap("./paginas")).paden;

    for (const pad of servicepaden) {
        services[pad.slice(9, -3)] = require(`./${pad}`);
    }

    for (const pad of paginapaden) {
        paginas[pad.slice(8)] = (await fs.readFile(`./${pad}`)).toString();
    }


    http.createServer((request, response) => {
        const { headers, method, url } = request;
        let body = [];

        request
            .on('error', console.error)
            .on('data', e => body.push(e))
            .on('end', async () => {
                response.setHeader('Access-Control-Allow-Origin', '*');
                response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                response.setHeader('Access-Control-Allow-Headers', '*');

                body = Buffer.concat(body).toString();
                response.on('error', console.error);

                const resource = invertedSwitch([
                    [url => url.length <= 1, () => "index.html"],
                    [url => url.startsWith("/"), () => url.slice(1)],
                    [() => true, () => url]
                ], url);

                invertedSwitch([
                    [
                        pad => services[pad],
                        (_, service) => service
                            .service(body)
                            .then((antwoord) => {
                                response.statusCode = 200;
                                response.setHeader('Content-Type', service.responsetype);
                                response.end(antwoord);
                            })
                            .catch((error) => {
                                response.statusCode = 400;
                                response.end(error.toString());
                            })
                    ],
                    [
                        pad => paginas[pad],
                        (_, pagina) => {
                            response.statusCode = 200;
                            response.end(pagina);
                        }
                    ],
                    [
                        () => true,
                        () => {
                            response.statusCode = 404;
                            response.end("Resource not found.");
                        }
                    ]
                ], resource);


            });
    }).listen(25000);
})();