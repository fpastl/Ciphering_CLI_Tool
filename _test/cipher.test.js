const { Encrypt } = require('../ciphers/cipher');
const { configWrongAtbashError, configWrongEncDecError, configWrongCipherError } = require("../src/errorsConfig");

let correctValuesArray = [
    {
        received: ['aBc_', 'c', 1],
        expected: 'bCd_',
    },
    {
        received: ['bcd', 'c', 0],
        expected: 'abc',
    },
    {
        received: ['abc!', 'r', 1],
        expected: 'ijk!',
    },
    {
        received: ['ijkЁ', 'r', 0],
        expected: 'abcЁ',
    },
    {
        received: ['abc1', 'a'],
        expected: 'zyx1',
    },
    {
        received: ['', 'a'],
        expected: '',
    },
];
for (let i = 0; i < correctValuesArray.length; i++) {
    test(`input text:"${correctValuesArray[i]['received'][0]}", cipher type: "${correctValuesArray[i]['received'][1]}${correctValuesArray[i]['received'][2] ?? ""}"; expected output: "${correctValuesArray[i]['expected']}"`, () => {
        expect(Encrypt(...correctValuesArray[i]['received'])).toEqual(correctValuesArray[i]['expected']);
    });
}

let errorsArray = [
    {
        title: 'wrong cipher type error',
        received: ['abc', 'e', 1],
        expected: configWrongCipherError,
    },
    {
        title: 'wrong encription/description cipher type error',
        received: ['abc', 'c', 2],
        expected: configWrongEncDecError,
    },
    {
        title: 'cipher type "a" with encription/description error',
        received: ['abc', 'a', 1],
        expected: configWrongAtbashError,
    },
];
for (let i = 0; i < errorsArray.length; i++) {
    test(`input text:"${errorsArray[i]['received'][0]}", cipher type: "${errorsArray[i]['received'][1]}${errorsArray[i]['received'][2] ?? ""}"; expected result : ${errorsArray[i]['title']}`, () => {
  
      const t = () => {
        Encrypt(...errorsArray[i]['received']);
      };
      expect(t).toThrow(errorsArray[i]['expected']);
    });
}