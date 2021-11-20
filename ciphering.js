function ciphering() {
    const { stderr } = require("process");
    const { getFlagsData } = require("./src/getFlagsData");
    const { transformStream } = require("./src/transformStream");
    const { dataRW } = require("./src/dataRW");
    const { doEncryption } = require("./ciphers");
    try {
        const flags = process.argv.slice(2);
        let { cipherTypes, inputFile, outputFile } = getFlagsData(flags);
        const cipherStream = new transformStream(doEncryption.bind(null, cipherTypes));
        dataRW(inputFile, outputFile, cipherStream);
    } catch (err) {
        stderr.write(`\nОшибка: ${err.message}\n`);
    }
}
ciphering();
module.exports.ciphering = ciphering;
