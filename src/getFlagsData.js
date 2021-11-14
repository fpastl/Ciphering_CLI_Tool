const { getConfigArray } = require("./getConfigArray");
module.exports.getFlagsData = (flags) => {
    const configFlags = ['-c', '--config'];
    const inputFlags = ['-i', '--input'];
    const outputFlags = ['-o', '--output'];
    let config, input=false, output=false;
    let c = 0, i = 0, o = 0;

    flags.forEach((element, key) => {

        if (configFlags.includes(element)) {
            if (++c > 1) throw new Error(`аргумента -c(--config) не должен встречаться больше одного раза`);
            config = key;
        }
        if (inputFlags.includes(element)) {
            if (++i > 1) throw new Error(`аргумента -i(--input) не должен встречаться больше одного раза`);
            input = flags[key + 1];
        }
        if (outputFlags.includes(element)) {
            if (++o > 1) throw new Error(`аргумента -o(--output) не должен встречаться больше одного раза`);
            output = flags[key + 1];
        }
    });
    if (!c) {
        throw new Error(`не найден аргумента -c(--config)`);
    }
    if(!input && input!==false){
        throw new Error(`не задано значение для аргумента -i(--input)`);
    }
     if(!output && output!==false){
        throw new Error(`не задано значение для аргумента -o(--output)`);
    }
    return {
        cipherTypes: getConfigArray(flags[config + 1]),
        inputFile: input,
        outputFile: output,
    }
}