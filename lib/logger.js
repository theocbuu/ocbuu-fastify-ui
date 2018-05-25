'use strict'

const pino=require('pino');

let logger;

module.exports=function(){
    const options={prettyPrint:true, level:'trace'}
    logger=pino(options);
    return logger;
}

