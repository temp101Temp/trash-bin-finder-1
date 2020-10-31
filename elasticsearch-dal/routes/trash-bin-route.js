module.exports = (router, trashBinApi) => {

    router.get("/byEmptyingDate", async (req, res) => {
        try {
            let emptyingDate = req.query.emptyingDate;
            console.log(`action: get by emptyingDate request. params:${JSON.stringify({ emptyingDate })}`)
            let result = await trashBinApi.getAllTrashBinByEmptyingDate(emptyingDate);
            console.log(`action: successfully complete get by emptyingDate request. params:${JSON.stringify({ emptyingDate })}`)
            if (result.length > 0) {
                res.send(result);
            } else {
                res.status(404).send()
            }
        } catch (err) {
            let msg = `action: An error occurred in the proccess of 
            -get by emptying date request.`
            console.log(msg)
            res.status(500).send(msg);
        }

    })

    router.get("/emptyingDateById", async (req, res) => {
        try {
            let id = req.query.id;
            console.log(`action: get by id request. params:${JSON.stringify({ id })}`)
            let rawResult = await trashBinApi.getEmptyingDateById(id);
            try {
                let filtered = result.hits.hits[0]._source.emptyingDate
                console.log(`action: successfully complete get by id request. params:${JSON.stringify({ id })}`)
                res.send(filtered);
            } catch (err) {
                let msg = `action: trash bin disent exists - get by id request.`
                console.log(msg)
                res.status(404).send()
            }
        } catch (err) {
            let msg = `action: An error occurred in the proccess of
            -get by id request.`
            console.log(msg)
            res.status(500).send(msg);
        }
    })

    router.get("/byEmptyingDateRange", async (req, res) => {
        try {
            let { gteEmptyingDate, ltEmptyingDate } = req.query;
            console.log(`action: get by emptyingDate request. params:${JSON.stringify({ gteEmptyingDate, ltEmptyingDate })}`)
            let result = await trashBinApi.getByRangeEmptyingDate({ gteEmptyingDate, ltEmptyingDate });
            console.log(`action: successfully complete get by emptyingDate request. params:${JSON.stringify({ gteEmptyingDate, ltEmptyingDate })}`)
            if (result.length > 0) {
                res.send(result);
            } else {
                res.status(404).send()
            }
        } catch (err) {
            let msg = `action: An error occurred in the proccess of 
            -get by emptying date request.`
            console.log(msg)
            res.status(500).send(msg);
        }

    })

    router.get("/byDistanceFromPoint", async (req, res) => {
        try {
            let { geoLocation, distance } = req.query;
            geoLocation = JSON.parse(geoLocation);
            console.log(`action: get by distance from point request. params:${JSON.stringify({ geoLocation, distance })}`)
            let result = await trashBinApi.getAllTrashBinsByDistanceFromSpecificPoint({ geoLocation, distance });
            console.log(`action: successfully complete get by distance from point request. params:${JSON.stringify({ geoLocation, distance })}`)
            if (result.length > 0) {
                res.send(result);
            } else {
                res.status(404).send()
            }
        } catch (err) {
            let msg = `action: An error occurred in the proccess of 
            -get by distance from point request.`
            console.log(msg)
            res.status(500).send(msg);
        }
    })

    router.delete("/", async (req, res) => {
        try {
            let id = req.query.id;
            console.log(`action: delete by id request . params:${JSON.stringify({ id })}`)
            await trashBinApi.deleteTrashBinById(id);
            console.log(`action: successfully complete delete by id . params:${JSON.stringify({ id })}`)
            res.send()
        } catch (err) {
            let msg = `action: An error occurred in the proccess of 
            -delete by id request.`
            console.log(msg)
            res.status(500).send(msg);
        }

    })

    router.post("/", async (req, res) => {
        try {
            let body = req.body;
            console.log(`action: add new trash bin request . params:${JSON.stringify({ body })}`)
            await trashBinApi.addTrashBin(body);
            console.log(`action: successfully complete add new trash bin request.
            params:${JSON.stringify({ body })}`)
            res.send()
        } catch (err) {
            let msg = `action: An error occurred in the proccess of 
            -add new trash bin request.`
            console.log(msg)
            res.status(500).send(msg);
        }

    })

    router.put("/locationById", async (req, res) => {
        try {
            let { geoLocation, id } = req.body;
            console.log(`action: update location by id request . params:${JSON.stringify({ geoLocation, id })}`)
            await trashBinApi.updateTrashBinLocationById({ geoLocation, id });
            console.log(`action: successfully complete update location by id request.
            params:${JSON.stringify({ geoLocation, id })}`)
            res.send()
        } catch (err) {
            let msg = `action: An error occurred in the proccess of 
            -update location by id request.`
            console.log(msg)
            res.status(500).send(msg);
        }

    })

    router.put("/emptyingDateById", async (req, res) => {
        try {
            let { emptyingDate, id } = req.body;
            console.log(`action: update emptying date by id request . params:${JSON.stringify({ emptyingDate, id })}`)
            await trashBinApi.updateTrashBinEmptingDateById({ emptyingDate, id });
            console.log(`action: successfully complete update emptying date by id request 
            . params:${JSON.stringify({ emptyingDate, id })}`)
            res.send()
        } catch (err) {
            let msg = `action: An error occurred in the proccess of 
            -update emptying date by id request.`
            console.log(msg)
            res.status(500).send(msg);
        }

    })

    return router;
}