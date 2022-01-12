const path = require("path");
const https = require('https');
const fs = require('fs/promises');

const leesMap = require("./functies/leesMap.js");
const invertedSwitch = require("./functies/invertedSwitch.js");
const { getBijbel } = require('bijbel-package');

(async () => {
    const certificaten = {
        key: await fs.readFile('/etc/letsencrypt/live/multiplanner.duckdns.org/privkey.pem'),
        cert: await fs.readFile('/etc/letsencrypt/live/multiplanner.duckdns.org/fullchain.pem')
    };

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


    https.createServer(certificaten, (request, response) => {
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

                const pad = await invertedSwitch([
                    [url => url.length <= 1, () => "index.html"],
                    [url => url.startsWith("/"), () => url.slice(1)],
                    [() => true, () => url]
                ], url);

                const resource = pad.match(/^[^\?]+/)[0];

                const parameters = {};
                const parameterStringMatch = pad.match(/(?<=\?)(.*)$/);
                if (parameterStringMatch) {
                    parameterStringMatch[0]
                        .split("&")
                        .map((parameter) => parameter.split("=").map(decodeURIComponent))
                        .map(([key, value]) => parameters[key] = value);
                }

                await invertedSwitch([
                    [
                        resource => services[resource],
                        (_, service) => service
                            .service(body, parameters)
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
                        resource => paginas[resource],
                        (_, pagina) => {
                            response.statusCode = 200;
                            response.end(pagina);
                        }
                    ],
                    [
                        (resource) => getBijbel(resource, parameters.filter),
                        (_, bijbel) => {
                            response.statusCode = 200;
                            response.end(bijbel);
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