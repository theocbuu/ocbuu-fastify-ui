'use strict'

async function handleHome(req, reply){
  //return { hello: 'test again world' }
  reply.view('/view/home/index', {text:'text'});
}


module.exports=[
  {
    method:'GET',
    url:'/',
    handler: handleHome
  }
]