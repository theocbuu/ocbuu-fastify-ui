'use strict'

async function handleShome(req, reply){
  //return { hello: 'test again world' }
  reply.view('/view/home/index', {text:'text'});
}


module.exports=[
  {
    method:'GET',
    url:'/shome',
    handler: handleShome
  }
]
