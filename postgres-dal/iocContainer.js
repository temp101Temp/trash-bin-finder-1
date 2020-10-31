// env var init
// you can install these vars from the command line and discard this code
process.env.NODE_CONFIG_DIR = "./static";
// when you have a production config file
//process.env.NODE_ENV= "production"


const express = require('express');
const router = express.Router()
const app = express();
const bodyParser = require('body-parser');
const awilix = require('awilix');
const { Client } = require('pg')
const config = require('config');

// utils
const PostgresClient = require('./utils/postgres-client');

// api
const TrashBinApi = require('./api/trash-bin-api')

// routes
const isAliveRouter = require('./routes/is-alive-route');
const trashBinRouter = require('./routes/trash-bin-route');
const routes = require('./routes/routes.js');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC,
})


container.register({
    //router
    router: awilix.asValue(router),
    routes: awilix.asFunction(routes),
    isAliveRouter:awilix.asFunction(isAliveRouter),
    trashBinRouter: awilix.asFunction(trashBinRouter),

    //api
    trashBinApi: awilix.asClass(TrashBinApi).singleton(),
    queryConfig:awilix.asValue(config.postgresSetting.queries),

    //client
    postgresClient: awilix.asClass(PostgresClient).singleton(),
    postgresConnnectionSettings :awilix.asValue(config.postgresSetting.connectionSettings), 
    pgClient: awilix.asValue(Client),


    config: awilix.asValue(config),
    bodyParser: awilix.asValue(bodyParser),
    app: awilix.asValue(app),
})
module.exports = container;
