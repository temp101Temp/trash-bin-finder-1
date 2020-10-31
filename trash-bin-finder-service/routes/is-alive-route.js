module.exports = (router) =>{
    router.get('/isAlive',(req,res)=>{
        res.status(200).send(true);
    })
    return router;
}