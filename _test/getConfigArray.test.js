const { getConfigArray } = require("../src/getConfigArray");
const { configExtraFlagError, configWrongEncDecError, configWrongAtbashError, configWrongCipherError, configEmptyCipherError } = require("../src/errorsConfig");
const { notSetArgValue } = require("../src/errors");

let correctValuesArray = [
  {
    received: 'a-c0-c1-r1-r0',
    expected: ['a','c0','c1','r1','r0']
  },
  {
    received: 'a-a-a-a-r0-c0-r0-c0',
    expected: ['a','a','a','a','r0','c0','r0','c0']
  },
  {
    received: 'a-a-a-a-',
    expected: ['a','a','a','a']
  },
];

for(let i=0;i<correctValuesArray.length;i++){
  test(`input: "${correctValuesArray[i]['received']}"; expected: ${correctValuesArray[i]['expected']}`, () => {
  expect(getConfigArray(correctValuesArray[i]['received'])).toEqual(correctValuesArray[i]['expected']);
});
}


let errorsArray = [
  {
    title: '"a1" - wrong, flag of encoding or decoding should not be passed Atbash cipher(a)',
    received: 'a1-r1-c0',
    expected: configWrongAtbashError,
  },
  {
    title: '"r" - wrong, flag of encoding or decodingmandatory (only 0 or 1) for Caesar(c) cipher and ROT-8(r)',
    received: 'a-r-c0',
    expected: configWrongEncDecError,
  },
  {
    title: '"c2" - wrong, flag of encoding or decodingmandatory (only 0 or 1) (only 0 or 1) for Caesar(c) cipher and ROT-8(r)',
    received: 'a-r1-c2',
    expected: configWrongEncDecError,
  },
  {
    title: '"--" - dont correct, extra char',
    received: 'a--r1-c0',
    expected: configEmptyCipherError,
  },
  {
    title: '"s" - wrong value of flag, need "a","r" or "c"',
    received: 's-r1-c0',
    expected: configWrongCipherError,
  },
  {
    title: '"r11" - extra char, correct: "r1"',
    received: 'a-r11-c0',
    expected: configExtraFlagError,
  },
  {
    title: 'not set value',
    received: '',
    expected: notSetArgValue,
  },
];
for(let i=0;i<errorsArray.length;i++){
  test(`input: "${errorsArray[i]['received']}";expected: error ${errorsArray[i]['title']}`, () => {
    const t = () => {
        getConfigArray(errorsArray[i]['received']);
      };
    expect(t).toThrow(errorsArray[i]['expected']);
  });
}