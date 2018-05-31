'use strict'

async function home (fastify, options) {
    fastify.get('/', async (req, reply) => {
      //return { hello: '/need2redirect to /home' }
      reply.view('/view/home/index', {text:'text'});
    })
}



module.exports=home

// async function handleTest(req, reply){
//   return{hello:'world'}
// }


// module.exports=[
//   {
//     method:'GET',
//     path:'/test',
//     handler:handleTest
//   }
// ]

  

