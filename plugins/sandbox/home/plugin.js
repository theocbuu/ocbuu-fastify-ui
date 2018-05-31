'use strict'

async function sandboxHome(fastify, options){
    fastify.get('/shome', async(req, reply)=>{
        return{hello: 'hello sandbox home'}
    })
}

module.exports=sandboxHome