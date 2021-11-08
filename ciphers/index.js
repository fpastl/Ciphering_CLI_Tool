const myCiphers = (text,ciphersType,EncDec = 1) =>{
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const shiftArray = {
        // Caesar: 0 - encoding, 1 - decoding  
        c : (i) => (curr)=> chars[i == 0 ? (curr+1)%chars.length : (curr + (chars.length - 1)) %chars.length],
       
        // Atbash
        a : () => (curr)=>chars[chars.length - 1 - curr],

        // ROT-8: 0 - encoding, 1 - decoding
        r : (i) => (curr)=> chars[i == 0 ? (curr+8)%chars.length : (curr + (chars.length - 8)) %chars.length],
     
    };   
    let shif = shiftArray[ciphersType]((EncDec+1)%2);
    if(text) return text.split('').map( char =>{
        let upperChar = char.toUpperCase();
        let charIndex = chars.indexOf(upperChar);
        if( charIndex + 1 ){
            if(upperChar == char) return shif(charIndex);
            else return shif(charIndex).toLowerCase();
        }
        return char;    
    }).join('');
    return text;
}