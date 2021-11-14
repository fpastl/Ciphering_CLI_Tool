const { getConfigArray } = require("./getConfigArray");
module.exports.getFlagsData = (flags) => {
    const configFlags = ['-c', '--config'];
    const inputFlags = ['-i', '--input'];
    const outputFlags = ['-o', '--output'];
    let config, input, output;
    let c = 0, i = 0, o = 0;

    flags.forEach((element, key) => {

        if (configFlags.includes(element)) {
            if (++c > 1) throw new Error(`аргумента -c(--config) не должен встречаться больше одного раза`);
            config = key;
        }
        if (inputFlags.includes(element)) {
            if (++i > 1) throw new Error(`аргумента -i(--input) не должен встречаться больше одного раза`);
            input = key;
        }
        if (outputFlags.includes(element)) {
            if (++o > 1) throw new Error(`аргумента -o(--output) не должен встречаться больше одного раза`);
            output = key;
        }
    });
    if (!c) {
        throw new Error(`не найден аргумента -c(--config) flag`);
    }

    return {
        cipherTypes: getConfigArray(flags[config + 1]),
        inputFile: flags[input + 1],
        outputFile: flags[output + 1],
    }
}