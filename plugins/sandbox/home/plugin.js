'use strict'


const log=require('../../../lib/logger.js')();
const fastify=require('fastify')({logger:log});
const path=require('path');
const dir = require('node-dir');

async function sandboxHome(fastify, options){
    const routePaths = await dir.promiseFiles(path.join(__dirname, '../../..', 'routes')) 
    //console.log('routePaths: '+routePaths);
    let routes = [];
    for(let i=0; i<routePaths.length; i++){
        log.trace('register route at %s', routePaths[i]);
        routes=routes.concat(require(routePaths[i]));
        //fastify.route doesn't take an array, but individual value.
        fastify.route(routes[i]);
    }
    log.trace('add routes ', routes)
}


module.exports=sandboxHome



