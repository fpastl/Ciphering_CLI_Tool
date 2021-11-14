class repetitionsArg extends Error{
    constructor(argName){
        super(`аргумент ${argName} не должен встречаться больше одного раза`);
        this.name = "repetitionsArgsError";
    }
}
class notSetArgValue extends Error{
    constructor(argName){
        super(`не задано значение для аргумента ${argName}`);
        this.name = "notSetArgValueError";
    }
}

module.exports ={
    repetitionsArg: repetitionsArg,
    notSetArgValue : notSetArgValue,
}