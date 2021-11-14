function checkConfigTemplate(str){
    const ciphersType = str[0].toUpperCase(),EncDec = str[1]; 
    if(!['C','R','A'].includes(ciphersType)) throw new Error(`неверный флаг штфрования, должен быть C, R или A`);
    if(ciphersType == 'A') {
        if(EncDec !== undefined)throw new Error(`у типа шифрования A не требуется указывать дополнительных параметров`);
    }
    else{
        if(EncDec!= 0 && EncDec!= 1)throw new Error(`для флагов шифрования C и Р должен быть флаг, равный 1 или 0, указывающего на "шифрованние" или "дешифрование"`);
        if(str.length>2) throw new Error(`обнаружны лишние флаги в "${str}", должно быть - "${str.slice(0,2)}"`);
    }
}

module.exports.getConfigArray = function getConfigArray(str){
    if(!str)  throw new Error(`Отсутсвуют данные для аргумента -c(--config)`);
    let configArray = str.split('-');
    try{
        configArray.forEach( el => checkConfigTemplate(el));
        return configArray;
    }catch(err){
        throw new Error(`Неверный формат аргумента -c(--config) : \n ${err.message}`);
    }
}