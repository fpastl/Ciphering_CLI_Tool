const { doEncryption } = require('../ciphers/index');

let correctValuesArray = [
    {
        received: [['a','a','a'], 'abc'],
        expected: 'zyx',
    },
    {
        received: [['r1','r1','r0'], 'abc'],
        expected: 'ijk',
    },
    {
        received: [['c1','c0','c1'], 'abc'],
        expected: 'bcd',
    },
];
for (let i = 0; i < correctValuesArray.length; i++) {
    test(`input text:"${correctValuesArray[i]['received'][1]}", cipher types: "${ correctValuesArray[i]['received'][0].join(',')}"; expected output: "${correctValuesArray[i]['expected']}"`, () => {
        expect(doEncryption(...correctValuesArray[i]['received'])).toEqual(correctValuesArray[i]['expected']);
    });
}