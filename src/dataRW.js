const fs = require("fs");
const { stderr } = require("process");
const process = require("process");
const { stdin, stdout } = process;
module.exports.dataRW = (inputFile, outputFile, cipherStream) => {


    let outPlace;
    if (outputFile !== false) {
        if (fs.existsSync(outputFile)) outPlace = fs.createWriteStream(outputFile, { flags: 'a' });
        else throw new Error(`\nОшибка: не удалось найти файл "${outputFile}", который указан в аргумента -o(--output)\n`);
    } else outPlace = stdout;
    if (inputFile === false) {
        stdout.write('введите текст:\n');
        stdin.pipe(cipherStream).pipe(outPlace);
    } else {
        const inputStream = fs.createReadStream(inputFile, 'utf-8');
        inputStream.on('error', (err) => {
            process.exit(err);
        });
        inputStream.pipe(cipherStream).pipe(outPlace, { end: false });
        inputStream.on('end', () => {if (outPlace !== stdout){ stdout.write('\nУспех!\n'); outPlace.end('\n\n'); }});
    }
    process.on("exit", (err) => {
        if(err){
                    if (err.code == 'ENOENT') {
            stderr.write(`\nОшибка: не удалось найти файл "${err.path}", который указан в аргумента -i(--input)\n`);
            process.end(11);
        }
        if (err.code == 'EPERM') {
            stderr.write(`\nОшибка: Файл "${err.path}" ограничен в доступе\n`);
            process.end(12);
        }
        stderr.write(`\n"${err.Error}" файл:"${err.path}"\n`);
        process.end(12);
        }

    })
}