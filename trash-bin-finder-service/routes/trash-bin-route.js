module.exports = (router, trashBinApi, csvClient, urlEnding) => {

    router.get("/reportByEmptyingDateRange", async (req, res) => {
        try {
            let { gteEmptyingDate, ltEmptyingDate } = req.query;
            console.log(`action: get report by emptyingDate range  request. params:${JSON.stringify({ gteEmptyingDate, ltEmptyingDate })}`)
            let result = await trashBinApi.getReportByRangeEmptyingDate(urlEnding.getReportEmptyingDate, { gteEmptyingDate, ltEmptyingDate });
            res.writeHead(200, {
                'Content-Type': 'text/csv',
                "Content-Disposition": "attachment;filename=report.csv",
            });
            csvClient.write(result, { headers: true }).pipe(res)
            console.log(`action: successfully complete get report by emptyingDate range request. params:${JSON.stringify({ gteEmptyingDate, ltEmptyingDate })}`)
        } catch (err) {
            if (err.isAxiosError) {
                if (err.response.status === 404) {
                    console.log("didnt find any trash bins")
                    res.status(404).send();
                }
            } else {
                msg = `action: An error occurred in the proccess of
            -get report by emptyingDate range request.`
                console.log(msg)
                res.status(500).send(msg);
            }
        }
    })

    router.get("/emptyingDateById", async (req, res) => {
        try {
            let id = req.query.id;
            console.log(`action: get by id request. params:${JSON.stringify({ id })}`)
            let result = await trashBinApi.getEmptyingDateById(urlEnding.getById, id);
            console.log(`action: successfully complete get by id request. params:${JSON.stringify({ id })}`)
            res.send(result);
        } catch (err) {
            if (err.isAxiosError) {
                if (err.response.status === 404) {
                    console.log("didnt find trash bin")
                    res.status(404).send();
                }
            } else {
                let msg = `action: An error occurred in the proccess of
            -get by id request.`
                console.log(msg)
                res.status(500).send(msg);
            }
        }
    })

    router.get("/byEmptyingDate", async (req, res) => {
        try {
            let emptyingDate = req.query.emptyingDate;
            console.log(`action: get by emptyingDate request. params:${JSON.stringify({ emptyingDate })}`)

            let result = await trashBinApi.getAllTrashBinByEmptyingDate(urlEnding.getByEmptyingDate, emptyingDate);
            console.log(`action: successfully complete get by emptyingDate request. params:${JSON.stringify({ emptyingDate })}`)
            res.send(result);
        } catch (err) {
            if (err.isAxiosError) {
                if (err.response.status === 404) {
                    console.log("didnt find any trash bins")
                    res.status(404).send();
                }
            } else {
                let msg = `action: An error occurred in the proccess of
            -get by emptying date request.`
                console.log(msg)
                res.status(500).send(msg);
            }
        }
    })

    router.get("/byDistanceFromPoint", async (req, res) => {
        try {
            let { geoLocation, distance } = req.query;
            geoLocation = JSON.parse(geoLocation);
            console.log(`action: get by distance from point request.
         params:${JSON.stringify({ geoLocation, distance })}`)
            let result = await trashBinApi.getAllTrashBinsByDistanceFromSpecificPoint(urlEnding.getByLocation, { geoLocation, distance });
            console.log(`action: successfully complete get by distance 
            from point request. params:${JSON.stringify({ geoLocation, distance })}`)
            res.send(result);
        } catch (err) {
            if (err.isAxiosError) {
                if (err.response.status === 404) {
                    console.log("didnt find any trash bins")
                    res.status(404).send();
                }
            } else {
                let msg = `action: An error occurred in the proccess of 
            -get by distance from point request.`
                console.log(msg)
                res.status(500).send(msg);
            }
        }
    })

    router.delete("/", async (req, res) => {
        try {
            let id = req.query.id;
            console.log(`action: delete by id request . params:${JSON.stringify({ id })}`)
            await trashBinApi.deleteTrashBinById(urlEnding.deleteById, id);
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

            await trashBinApi.addTrashBin(urlEnding.add, body);
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
            await trashBinApi.updateTrashBinLocationById(urlEnding.updateLocation, { geoLocation, id });
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
            await trashBinApi.updateTrashBinEmptingDateById(urlEnding.updateEmptyingDate, { emptyingDate, id });
            console.log(`action: successfully complete update emptying date by id request 
            . params:${JSON.stringify({ emptyingDate, id })}`)
            res.send()
        } catch (err) {
            let msg = `action: An error occurred in the proccess of 
            -update emptying date by id request.`
            console.log(err)
            res.status(500).send(msg);
        }
    })
    return router;
}