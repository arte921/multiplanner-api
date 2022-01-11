const {
    formatteerTreinen,
    stationAankomsten
} = require("multiplanner");

module.exports = {
    service: async (body, parameters) => formatteerTreinen(await stationAankomsten(parameters.station)),
    responsetype: "text/plain"
};