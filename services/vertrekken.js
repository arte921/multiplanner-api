const {
    formatteerTreinen,
    stationVertrekken
} = require("multiplanner");

module.exports = {
    service: async (body, parameters) => formatteerTreinen(await stationVertrekken(parameters.station)),
    responsetype: "text/plain"
};