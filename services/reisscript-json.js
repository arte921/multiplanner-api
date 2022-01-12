const {
    planReis,
    multiReis,
    reisStats
} = require("multiplanner");

module.exports = {
    service: async (reisscript) => JSON.stringify(reisStats(await planReis(multiReis(reisscript)))),
    responsetype: "application/json"
};