const {
    planReis
} = require("multiplanner");

module.exports = {
    service: async (body) => JSON.stringify(await planReis(JSON.parse(body))),
    responsetype: "application/json"
};