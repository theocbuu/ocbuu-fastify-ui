'use strict'


const log=require('../../lib/logger.js')();
const fastify=require('fastify')({logger:log});
const path=require('path');
const dir = require('node-dir');

async function pluginOne(fastify, option){
    const routeDirs=await dir.promiseFiles(path.join(__dirname, '../..', 'routes'));
    let routes=[];
    for(let i=0; i<routeDirs.length; i++){
        log.trace('plugin-one register route at %s', routeDirs[i]);
        routes=routes.concat(require(routeDirs[i]));
        log.trace('routes for plugin-one', routes[i]);
        fastify.route(routes[i]);
    }
}


module.exports=pluginOne