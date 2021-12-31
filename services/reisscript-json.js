const {
    planReis,
    multiReis,
    formatteerReis
} = require("multiplanner");

module.exports = {
    service: async (reisscript) => JSON.stringify(await planReis(multiReis(reisscript))),
    responsetype: "application/json"
};