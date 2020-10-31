class TrashBinApi {
    constructor(axiosClient, redisClient) {
        this._client = axiosClient;
        this._redisClient = redisClient
    }
    // GET
    //#region getAllTrashBinsByDistanceFromSpecificPoint summary
    /**
     * @swagger
     * /api/byDistanceFromPoint:
     *  get:
     *    description: Get all of the trash bins that in the given distance from given geo point 
     *    parameters:
     *       - name: geoLocation
     *         description: geo point of the location.
     *         in: query
     *         required: true
     *         type: object
     *       - name: distance
     *         description: number and measurement unit (ending could be 'm','km etc)
     *         in: query
     *         required: true
     *         type: string
     *    responses:
     *      '200':
     *        description: An array conatining search result
     *        schema:
     *            type: array
     *            items:
     *              type: object
     *              required:
     *                - id
     *                - color
     *                - type
     *                - geoLocation
     *                - emptyingDate
     *              properties:
     *                id:
     *                  type: string
     *                color:
     *                  type: string
     *                type:
     *                  type: string
     *                geoLocation:
     *                  type: object
     *                  required:
     *                    - lan
     *                    - lat
     *                  properties:
     *                    lan:
     *                      type: integer
     *                      format: double
     *                    lat:
     *                      type: integer
     *                      format: double
     *                emptyingDate:
     *                  type: string
     *                  format: date
     *                 
     */
    //#endregion
    getAllTrashBinsByDistanceFromSpecificPoint = async (urlEnding, params) => {
        try {
            let result = await this._client.get(urlEnding, params)
            return result.data
        } catch (err) {
            throw err
        }
    }
    getEmptyingDateById = async (urlEnding,id) => {
        let result;
        try {
            result = await this._redisClient.get(id);
            if (result !== null) {
                console.log(`action: successfully complete fetching data from redis - get by id request s. params:${JSON.stringify({ id })}`)
               return result
            }
        } catch (err) {
            let msg = `action: An error occurred in the proccess of
            fetching data from redis -get by id request.`
            console.log(msg)
            console.log(err)
            throw err
        }
        try {
            result = await this._client.get(urlEnding, {id})
            return result.data
        } catch (err) {
            throw err
        }
    }

    //#region getAllTrashBinByRangeEmptyingDate summary
    /**
     * @swagger
     * /api/reportByEmptyingDateRange:
     *  get:
     *    description: Get report of all of the trash bins thats matches the emptying date range
     *    produces:
     *      - text/csv
     *    parameters:
     *       - name: gteEmptyingDate 
     *         description: trash bin gte emptying date.
     *         in: query
     *         required: true
     *         type: string
     *         format: date
     *       - name: ltEmptyingDate 
     *         description: trash bin lt emptying date.
     *         in: query
     *         required: true
     *         type: string
     *         format: date
     *    responses:
     *      '200':
     *        description: report in csv file format  
     */
    //#endregion
    getReportByRangeEmptyingDate = async (urlEnding, emptyingDateRange) => {
        try {
            let result = await this._client.get(urlEnding,  emptyingDateRange )
            return result.data;
        } catch (err) {
            throw err
        }
    }

    //#region getAllTrashBinByEmptyingDate summary
    /**
     * @swagger
     * /api/byEmptyingDate:
     *  get:
     *    description: Get all of the trash bins thats matches the emptying date 
     *    parameters:
     *       - name: emptyingDate 
     *         description: trash bin emptying date.
     *         in: query
     *         required: true
     *         type: string
     *         format: date
     *    responses:
     *      '200':
     *        description: An array conatining search result
     *        schema:
     *            type: array
     *            items:
     *              type: object
     *              required:
     *                - id
     *                - color
     *                - type
     *                - geoLocation
     *                - emptyingDate
     *              properties:
     *                id:
     *                  type: string
     *                color:
     *                  type: string
     *                type:
     *                  type: string
     *                geoLocation:
     *                  type: object
     *                  required:
     *                    - lan
     *                    - lat
     *                  properties:
     *                    lan:
     *                      type: integer
     *                      format: double
     *                    lat:
     *                      type: integer
     *                      format: double
     *                emptyingDate:
     *                  type: string
     *                  format: date
     *                 
     */
    //#endregion
    getAllTrashBinByEmptyingDate = async (urlEnding, emptyingDate) => {
        try {
            let result = await this._client.get(urlEnding, { emptyingDate })
            return result.data;
        } catch (err) {
            throw err
        }
    }

    // POST
    //#region addTrashBin summary
    /**
     * @swagger
     * /api/:
     *  post:
     *    description: Add new trash bin
     *    parameters:
     *      - in: body
     *        name: trash bin
     *        description: The trash bin to add.
     *        schema:
     *          type: object
     *          required: true
     *          properties:
     *            id:
     *              type: string
     *            type:
     *              type: string
     *            color:
     *              type: string
     *            emptyingDate:
     *              type: string
     *              format: date
     *            geoLocation:
     *              type: object
     *              properties:
     *                  lon:
     *                    type: integer
     *                    format: double
     *                  lat:
     *                    type: integer
     *                    format: double
     *    responses:
     *      '200':
     *        description: Trash bin added             
     */
    //#endregion
    addTrashBin = async (urlEnding, params) => {
        try {
            return await this._client.put(urlEnding, params)
        } catch (err) {
            throw err
        }
    }

    // DELETE
    //#region deleteTrashBinById summary
    /**
     * @swagger
     * /api/:
     *  delete:
     *    description: delete trash bin
     *    parameters:
     *       - name: id 
     *         description: trash bin id.
     *         in: query
     *         required: true
     *         type: string
     *    responses:
     *      '200':
     *        description: Trash bin deleted             
     */
    //#endregion
    deleteTrashBinById = async (urlEnding, id) => {
        try {
            return await this._client.delete(urlEnding, { id });
        } catch (err) {
            throw err
        }
    }

    // PUT
    //#region updateTrashBinLocationById summary
    /**
     * @swagger
     * /api/locationById:
     *  put:
     *    description: update trash bin location by his id
     *    parameters:
     *      - in: body
     *        name: request
     *        description: The request details.
     *        schema:
     *          type: object
     *          required: true
     *          properties:
     *            id:
     *              type: string
     *            geoLocation:
     *              type: object
     *              properties:
     *                  lon:
     *                    type: integer
     *                    format: double
     *                  lat:
     *                    type: integer
     *                    format: double
     *    responses:
     *      '200':
     *        description: Trash bin location updated             
     */
    //#endregion
    updateTrashBinLocationById = async (urlEnding, params) => {
        try {
            return await this._client.post(urlEnding, params);
        } catch (err) {
            throw err
        }
    }

    //#region updateTrashBinLocationById summary
    /**
     * @swagger
     * /api/emptyingDateById:
     *  put:
     *    description: update trash bin emptying date by his id
     *    parameters:
     *      - in: body
     *        name: request
     *        description: The request details.
     *        schema:
     *          type: object
     *          required: true
     *          properties:
     *            id:
     *              type: string
     *            emptyingDate:
     *              type: string
     *              format: date
     *    responses:
     *      '200':
     *        description: Trash bin emptying date updated             
     */
    //#endregion
    updateTrashBinEmptingDateById = async (urlEnding, params) => {
        try {
            try {
                console.log(`action: saving to redis update request data.
                 params:${JSON.stringify(params)}`)
                 let {emptyingDate} = params;
                await this._redisClient.set(params.id, {emptyingDate} )
                console.log(`action: request data successfully saved into redis. 
                params:${JSON.stringify(params)}`)
            } catch (err) {
                console.log(`action: An error occurred in the proccess of- saving 
                updated data to redis. params:${JSON.stringify(params)}`)
                throw err
            }
            return await this._client.post(urlEnding, params);
        } catch (err) {
            throw err
        }
    }
}
module.exports = TrashBinApi;