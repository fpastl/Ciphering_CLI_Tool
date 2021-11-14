const { Transform } = require("stream");
module.exports.transformStream = class transformStream extends Transform{
    constructor(transformFunc){
        super();
        this.transformFunc = transformFunc;
    }
    _transform(chunk,encoding,callback){
        const transformChnk = this.transformFunc(chunk);
        this.push(transformChnk);
        callback();
    }
}