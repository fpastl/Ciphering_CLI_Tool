const { configWrongAtbashError, configWrongEncDecError, configWrongCipherError } = require("../src/errorsConfig");

module.exports.Encrypt = (text, ciphersType, EncDec = -1) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const shiftArray = {
        // Caesar: 0 - encoding, 1 - decoding  
        C: (i) => (curr) => chars[i == 0 ? (curr + 1) % chars.length : (curr + (chars.length - 1)) % chars.length],

        // Atbash
        A: () => (curr) => chars[chars.length - 1 - curr],

        // ROT-8: 0 - encoding, 1 - decoding
        R: (i) => (curr) => chars[i == 0 ? (curr + 8) % chars.length : (curr + (chars.length - 8)) % chars.length],
    };
    if (ciphersType.toUpperCase() == 'A' && EncDec != -1) throw new configWrongAtbashError();
    else if ((ciphersType.toUpperCase() != 'A' && EncDec != 1) && (ciphersType.toUpperCase() != 'A' && EncDec != 0)) throw new configWrongEncDecError();
    if (!shiftArray[ciphersType.toUpperCase()]) throw new configWrongCipherError();

    let shif = shiftArray[ciphersType.toUpperCase()]((+EncDec + 1) % 2);
    if (text) return text.split('').map(char => {
        let upperChar = char.toUpperCase();
        let charIndex = chars.indexOf(upperChar);
        if (charIndex + 1) {
            if (upperChar == char) return shif(charIndex);
            else return shif(charIndex).toLowerCase();
        }
        return char;
    }).join('');
    return text;
}