//#region  env var init
// you can install these vars from the command line and discard this code
process.env.NODE_CONFIG_DIR = "./static";

// when you have a production config file
//process.env.NODE_ENV= "production"
//#endregion

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();
// config
const config = require('config');

// routes
const isAliveRouter = require('./routes/is-alive-route')
const trashBinRouter = require('./routes/trash-bin-route');
const routes = require('./routes/routes');

// classes
const TrashBinApi = require('./api/trash-bin-api');
const ElasticClient = require('./utils/elastic-client');


// init prams
initServer();
uncaughtErrorHandler();
app.listen(config.servicePort,()=>{
    console.log(`listning on port ${config.servicePort}`)
})


function initServer (){
    // init
    const elasticClient = new ElasticClient(config.elasticSetting);
    const trashbinApi = new TrashBinApi( elasticClient);

    app.use(bodyParser.json());
    app.use('/api',routes(router, isAliveRouter(router),
    trashBinRouter(router,trashbinApi)));
}

function uncaughtErrorHandler (){
    process.on('uncaughtException', (err) => {
        console.log(err)
    })
}