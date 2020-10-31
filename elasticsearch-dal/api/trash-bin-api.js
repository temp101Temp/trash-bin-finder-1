class TrashBinApi {
    constructor(elasticClient) {
        this._client = elasticClient;
    }
    // get
    getAllTrashBinsByDistanceFromSpecificPoint = async (params) => {
        try {
            let results = await this._client.getAllTrashBinsByDistanceFromSpecificPoint(params)
            return results;
        } catch (err) {
            throw err
        }
    }

    getByRangeEmptyingDate = async (emptyingDateRange) => {
        try {
            let results = await this._client.getAllTrashBinByRangeEmptyingDate(emptyingDateRange)
            return results;
        } catch (err) {
            throw err
        }
    }
    getEmptyingDateById = async (id) => {
        try {
            let result = await this._client.getEmptyingDateById(id)
            return result
        } catch (err) {
            throw err
        }
    }

    getAllTrashBinByEmptyingDate = async (emptyingDate) => {
        try {
            let results = await this._client.getAllTrashBinByEmptyingDate(emptyingDate)
            return results;
        } catch (err) {
            throw err
        }
    }

    // PUT
    addTrashBin = async (params) => {
        try {
            return await this._client.addTrashBin(params)
        } catch (err) {
            throw err
        }
    }
    // DELETE
    deleteTrashBinById = async (id) => {
        try {
            return await this._client.deleteTrashBinById(id);
        } catch (err) {
            throw err
        }
    }

    // post
    updateTrashBinLocationById = async (params) => {
        try {
            return await this._client.updateTrashBinLocationById(params);
        } catch (err) {
            throw err
        }
    }

    updateTrashBinEmptingDateById = async (params) => {
        try {
            return await this._client.updateTrashBinEmptingDateById(params);
        } catch (err) {
            throw err
        }
    }
}
module.exports = TrashBinApi;