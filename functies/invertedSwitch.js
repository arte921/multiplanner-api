const invertedSwitch = async (switches, waarde) => {
    for (const [test = () => {}, succes] of switches) {
        const testResultaat = await test(waarde);
        if (testResultaat) {
            return await succes(waarde, testResultaat);
        }
    }
};

module.exports = invertedSwitch;