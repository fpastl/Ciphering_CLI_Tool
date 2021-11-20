const { fork } = require('child_process');
const { type } = require('os');

const cipher = jest.fn(
    async (args) => {
        cipherProcess = fork('ciphering', args, { silent: true });
        return new Promise((resolve, reject) => {
            cipherProcess.stderr.on('data',data => {resolve({'data': data.toString('utf-8'), 'type': 'error'});});
            cipherProcess.stdout.on('data',data => {resolve({'data': data.toString('utf-8'), 'type': 'success'});});
        });
    }
);

const errCalls = [
    {
        input : "User passes the same cli argument twice",
        received: ['-c', "C1-C1-A-R0", '-i','-c','C0'],
        expected: "Ошибка: аргумент -c(--config) не должен встречаться больше одного раза",
    },
    {
        input : "User doesn't pass -c or --config argument",
        received: ['-i', "i.txt",'o','"o.txt"'],
        expected: "Ошибка: не найден аргумента -c(--config)",
    },
    {
        input : "User passes -i argument with path that doesn't exist",
        received: ['-c', "a-c1",'-i','./_test/~'], 
        expected: "Ошибка: не удалось найти файл",
    },
    {
        input : "User passes -o argument with path to directory that doesn't exist",
        received: ['-c', "a-c1",'-o','./_test/~'], 
        expected: "Ошибка: не удалось найти файл",
    },
    {
        input : "User passes incorrent symbols in argument for --config",
        received:  ['-c', "a-c2"],
        expected: "Ошибка: Неверный формат аргумента -c(--config)",
    },
    {
        input : 'Input: User passes correct sequence of symbols as argument for --config that matches regular expression',
        received: ['-c', "C1-C1-R0-A", '-i','./_test/i.txt', '-o','./_test/o.txt'],
        expected: 'Успех',
    },
    {
        input : 'Text in ./_test/i.txt: [This is secret. Message about "_" symbol!]',
        received: ['-c', "C1-C1-R0-A", '-i','./_test/i.txt'],
        expected: 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!',
    },
    {
        input : 'Text in ./_test/i.txt: [This is secret. Message about "_" symbol!]',
        received: ['-c', "C1-C0-A-R1-R0-A-R0-R0-C1-A", '-i','./_test/i.txt'],
        expected: 'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!',
    },
    {
        input : 'Text in ./_test/i.txt: [This is secret. Message about "_" symbol!]',
        received: ['-c', "A-A-A-R1-R0-R0-R0-C1-C1-A", '-i','./_test/i.txt'],
        expected: 'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!',
    },
    {
        input : 'Text in ./_test/i.txt: [This is secret. Message about "_" symbol!]',
        received: ['-c', "C1-R1-C0-C0-A-R0-R1-R1-A-C1", '-i','./_test/i.txt'],
        expected: 'This is secret. Message about "_" symbol!',
    },
];

for (let i = 0; i < errCalls.length; i++) {
    cipher(errCalls[i]['received']);
}
for (let i = 0; i < cipher.mock.results.length; i++) {
    test(`Input:${errCalls[i]['input']??''} (node ciphering ${ errCalls[i]['received'].join(" ")}); \nexpected result: "${errCalls[i]['expected']}"`, () => {
       return cipher.mock.results[i]['value'].then(data => {expect(data['data']).toMatch(errCalls[i]['expected'])});
    });
}
