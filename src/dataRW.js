const fs = require("fs");
const { stdin,stdout } = require("process");
module.exports.dataRW = (inputFile,outputFile,cipherStream) => {
    let outPlace = (outputFile !==undefined) ? fs.createWriteStream(outputFile,{ flags: 'a' }) : stdout;
    if(inputFile === undefined){
        stdout.write('введите текст:\n');
        stdin.pipe(cipherStream).pipe(outPlace);
    }else{
        if(fs.existsSync(inputFile)){
            const inputStream = fs.createReadStream(inputFile, 'utf-8');
            inputStream.pipe(cipherStream).pipe(outPlace,{ end: false });
            inputStream.on('end', () => {outPlace.end('\n\n');stdout.write('\nУспех!\n')}); 
        }else{
            throw new Error('не удалось найти файл с данными, который указан в аргумента -i(--input)');
        }      
    }
}