module.exports = (router,isAliveRouter,trashBinRouter) =>{
    router.use('/isAlive',isAliveRouter)
    router.use('/trashBin',trashBinRouter)
    return router;
}