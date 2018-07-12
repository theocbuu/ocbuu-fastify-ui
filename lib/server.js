'use strict'

const log=require('./logger.js')();
const fastify=require('fastify')({logger:log});
const path=require('path');
const dir = require('node-dir');
const view = require('point-of-view');

const app={};

/** Create start function in app object */
app.start=async function(){

    /** simple test route */
    fastify.get('/simpleRoute', async(req, reply)=>{
        return{hello:'simple route'}
    });
    /** end simple test route */

    /** serve static files in /public folder */
    //with fastify for now I only able to serve only one static folder
    //which mean I have to move file from assets folder to public folder
    await fastify.register(require('fastify-static'), {
        root:path.join(__dirname, '..', 'public'),
        prefix:'/public/'
    })
    
    log.info('finished static files initialization');

        /** test serve static file 
        //can't do async here - I don't know why, yet
        fastify.get('/staticfile', function(req, reply){
            reply.sendFile('test.html');
        });
        */
    /** end serve static file in /public folder */

    
    /** loop through all files in /plugins and fastify.register(require()) them **/
    const pluginPaths = await dir.promiseFiles(path.join(__dirname, '..', 'plugins'))  
    for(let i=0; i < pluginPaths.length; i++){
        log.trace('registering plugin at %s', pluginPaths[i])
        //get all the plugins
        const plugins = require(pluginPaths[i]);
        //console.log('url paths: '+plugins);
        //register the plugins into this fastify instance.
        await fastify.register(plugins);
    }
    /** end loop through all files in /plugins and fastify.register(require()) them **/


    /** use marko view for html content */
    //require('marko/node-require').install();
    //tells marko to not output .js files 
    require('marko/compiler').defaultOptions.writeToDisk = false;
    fastify.register(view, {
        engine: {
          marko: require('marko')
        },
        includeViewExtension: true
      })
      log.trace('finished marko initialization')
    /** end of use marko for html content */

    
     /** Bundle up all CSS, LESS, and JS assests */
     const lasso = require('lasso');
     lasso.configure({
         //when lasso execute, the result will be output to static folder
         //static folder will be automatically created when lasso executed for the 1st time
         outputDir: path.join(__dirname, '..', 'public', 'static'),
         urlPrefix: '/public/static',
         plugins: [
             'lasso-marko'
         ]
     });

    await fastify.listen(3000);
    //log.trace('Sever is listening');
    return fastify;
}
/** end create start function in app object */


//app.start();
module.exports = app;