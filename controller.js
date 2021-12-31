const path = require("path");
const http = require('http');

const leesMap = require("./functies/leesMap.js");

(async () => {
    const services = {};
    
    const servicepaden = (await leesMap(path.join("./services"))).paden;

    for (const pad of servicepaden) {
        services[pad.slice(9, -3)] = require(`./${pad}`);
    }

    
    http.createServer((request, response) => {
        const { headers, method, url } = request;
        let body = [];

        request
            .on('error', console.error)
            .on('data', e => body.push(e))
            .on('end', async () => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', '*');

                body = Buffer.concat(body).toString();
                response.on('error', console.error);
            
                const service = services[url.slice(1)];

                service
                    .service(body)
                    .then((antwoord) => {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', service.responsetype);
                        response.end(antwoord);
                    })
                    .catch((error) => {
                        response.statusCode = 400;
                        response.end(error.toString());
                    });
            });
            }).listen(25000);
})();