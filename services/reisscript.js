const {
    planReis,
    multiReis,
    formatteerReis
} = require("multiplanner");

module.exports = {
    service: async (reisscript) => formatteerReis(await planReis(multiReis(reisscript))),
    responsetype: "text/plain"
};