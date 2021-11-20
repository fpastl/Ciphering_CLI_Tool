const { getConfigArray } = require("./getConfigArray");
const { repetitionsArg,notSetArgValue,notFoundArgCError } = require("./errors");

module.exports.getFlagsData = (flags) => {
    const configFlags = ['-c', '--config'];
    const inputFlags = ['-i', '--input'];
    const outputFlags = ['-o', '--output'];
    let config, input=false, output=false;
    let c = 0, i = 0, o = 0;

    flags.forEach((element, key) => {

        if (configFlags.includes(element)) {
            if (++c > 1) throw new repetitionsArg(`-c(--config)`);
            config = flags[key + 1];
        }
        if (inputFlags.includes(element)) {
            if (++i > 1) throw new repetitionsArg(`-i(--input)`);
            input = flags[key + 1];
        }
        if (outputFlags.includes(element)) {
            if (++o > 1) throw new repetitionsArg(`-o(--output)`);
            output = flags[key + 1];
        }
    });
    if (!c) {
        throw new notFoundArgCError();
    }
    if(!config){
        throw new notSetArgValue(`-c(--config)`);
    }
    if(!input && input!==false){
        throw new notSetArgValue(`-i(--input)`);
    }
     if(!output && output!==false){
        throw new notSetArgValue(`-o(--output)`);
    }
    let cipherTypes = getConfigArray(config); 
    return {
        cipherTypes: cipherTypes,
        inputFile: input,
        outputFile: output,
    }
}