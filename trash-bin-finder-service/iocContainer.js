// env var init
// you can install these vars from the command line and discard this code
process.env.NODE_CONFIG_DIR = "./static";
// when you have a production config file
//process.env.NODE_ENV= "production"

// lib
const express = require('express');
const app = express();
const router = express.Router();
const Redis = require("ioredis");
const rdUtils = require("ioredis/built/utils");
const axios = require('axios');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const csvClient = require('fast-csv');
const awilix = require('awilix');
const config = require('config');

const isAliveRouter = require('./routes/is-alive-route');
const trashBinRouter = require('./routes/trash-bin-route');
const routes = require('./routes/routes');
const RedisClient = require("./utils/redis-client")
const Client = require('./utils/client');
const TrashBinApi = require('./api/trash-bin-api');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC,
})

container.register({
    //router
    router: awilix.asValue(router),
    routes: awilix.asFunction(routes),
    isAliveRouter: awilix.asFunction(isAliveRouter),
    trashBinRouter: awilix.asFunction(trashBinRouter),
 
    //api
    trashBinApi: awilix.asClass(TrashBinApi).singleton(),

    //client
    rdClient: awilix.asValue(Redis),
    rdUtils: awilix.asValue(rdUtils),
    rdSettings: awilix.asValue(config.redisClientSettings),
    redisClient: awilix.asClass(RedisClient).singleton(),
    axiosClient: awilix.asClass(Client),
    axios: awilix.asValue(axios),
    axiosConfig: awilix.asValue(config.clientSettings.baseSettings),


    config: awilix.asValue(config),
    urlEnding: awilix.asValue(config.clientSettings.urlEnding),
    bodyParser: awilix.asValue(bodyParser),
    app: awilix.asValue(app),
    swaggerDocs: awilix.asValue(swaggerJsDocInit(config.swaggerOption)),
    swaggerUi: awilix.asValue(swaggerUi),
    csvClient: awilix.asValue(csvClient),

})

//export the configured DI container
module.exports = container;

function swaggerJsDocInit(config) {
    return swaggerJsDoc(config)
}

