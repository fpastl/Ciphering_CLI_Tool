class configTemplateError extends Error {
    constructor(description) {
        super(`Неверный формат аргумента -c(--config) :  \n ${description}`);
        this.name = "configTemplateError";
    }
}
class configEmptyCipherError extends configTemplateError {
    constructor() {
        super(`лишний символ "-"`);
    }
};
class configWrongCipherError extends configTemplateError {
    constructor(description) {
        super(`неверный флаг шифрования, должен быть C, R или A`);
    }
};
class configWrongAtbashError extends configTemplateError {
    constructor(description) {
        super(`у типа шифрования A не требуется указывать дополнительных флагов`);
    }
};
class configWrongEncDecError extends configTemplateError {
    constructor(description) {
        super(`для флагов шифрования C и Р должен быть флаг, равный 1 или 0, указывающего на "шифрованние" или "дешифрование"`);
    }
};
class configExtraFlagError extends configTemplateError {
    constructor(str) {
        super(`обнаружны лишние флаги в "${str}", должно быть - "${str.slice(0, 2)}"`);
    }
};

module.exports = {
    configEmptyCipherError: configEmptyCipherError,
    configExtraFlagError: configExtraFlagError,
    configWrongEncDecError: configWrongEncDecError,
    configWrongAtbashError: configWrongAtbashError,
    configWrongCipherError: configWrongCipherError,
}