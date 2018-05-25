'use strict'

require('require-self-ref');
const app = require('./lib/server.js');

app.start()
    .then(function(fastify){})
    .catch(function(err){
        console.error(err.stack);
    });