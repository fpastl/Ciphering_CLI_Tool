const fs = require("fs");
const { stderr } = require("process");
const process = require("process");
const { stdin, stdout } = process;
module.exports.dataRW = (inputFile, outputFile, cipherStream) => {
    let outPlace = (outputFile !== false) ? fs.createWriteStream(outputFile, { flags: 'a' }) : stdout;
    if (inputFile === false) {
        stdout.write('введите текст:\n');
        stdin.pipe(cipherStream).pipe(outPlace);
    } else {
        const inputStream = fs.createReadStream(inputFile, 'utf-8');
        inputStream.on('error', (err) => {
            process.exit(err);
        });
        inputStream.pipe(cipherStream).pipe(outPlace, { end: false });
        inputStream.on('end', () => { outPlace.end('\n\n'); stdout.write('\nУспех!\n') });
    }
    process.on("exit", (err) => {
        if (err.code == 'ENOENT') stderr.write(`\nОшибка: не удалось найти файл "${err.path}", который указан в аргументе -i(--input)\n`);
    })
}