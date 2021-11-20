const { Encrypt } = require('./cipher');
doEncryption = (cipherTypes,text,i=0) => {
    text=text.toString();
    if(i<cipherTypes.length-1){
        return Encrypt(doEncryption(cipherTypes,text,++i),cipherTypes[cipherTypes.length-i][0], cipherTypes[cipherTypes.length-i][1]);
    }
    return Encrypt(text,cipherTypes[0][0], cipherTypes[0][1]);
} 
module.exports.doEncryption = doEncryption;