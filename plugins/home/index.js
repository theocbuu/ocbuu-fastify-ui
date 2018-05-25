'use strict'

async function home (fastify, options) {
    fastify.get('/', async (req, reply) => {
      //return { hello: '/need2redirect to /home' }
      reply.view('/view/home/index', {text:'text'});
    })
    // fastify.get('/home', async(req, reply)=>{
    //   reply.view('/view/home/index', {text:'text'});
    // })
}


module.exports=home

  

