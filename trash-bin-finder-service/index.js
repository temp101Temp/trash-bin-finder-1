// utils
const container = require('./iocContainer');

const config = container.resolve('config');
const bodyParser = container.resolve('bodyParser');
const swaggerUi = container.resolve('swaggerUi')
const trashbinApi = container.resolve('trashBinApi');
const swaggerDocs = container.resolve('swaggerDocs')

const routes = container.resolve('routes');
const app = container.resolve('app');

initServer()
uncaughtErrorHandler()

app.listen(config.servicePort, () => {
    console.log(`app listening on port ${config.servicePort}`)
})

function initServer() {
    app.use(bodyParser.json());
    app.use('/api', routes);
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

function uncaughtErrorHandler() {
    process.on('uncaughtException', (err) => {
        console.log(err)
    })
}