const { configExtraFlagError, configWrongEncDecError, configWrongAtbashError, configWrongCipherError, configEmptyCipherError } = require("./errorsConfig");
const { notSetArgValue } = require("./errors");
function checkConfigTemplate(str) {
    if (!str) throw new configEmptyCipherError();
    const ciphersType = str[0].toUpperCase(), EncDec = str[1];
    if (!['C', 'R', 'A'].includes(ciphersType)) throw new configWrongCipherError();
    if (ciphersType == 'A') {
        if (EncDec !== undefined) throw new configWrongAtbashError();
    }
    else {
        if (EncDec != 0 && EncDec != 1) throw new configWrongEncDecError();
        if (str.length > 2) throw new configExtraFlagError(str);
    }
}

module.exports.getConfigArray = function getConfigArray(str) {
    if (!str) throw new notSetArgValue(`-c(--config)`);
    let configArray = str.split('-');
    if (!configArray[configArray.length - 1]) configArray.pop();
    configArray.forEach(el => checkConfigTemplate(el));
    return configArray;
}
module.exports.checkConfigTemplate = checkConfigTemplate;