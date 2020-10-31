class TrashBinApi {
    constructor(postgresClient, queryConfig) {
        this._client = postgresClient;
        this._config = queryConfig;
    }
    queryExacuter = async (params, requestSettings) => {
        try {
            let query = getQuery(this._config, requestSettings);
            let result = typeof params === "string" ? await this._client.exacute(query, [params]) :
                await this._client.exacute(query, toPostgres(params));
            return result.rows.length > 0 ? adjustResponse(result.rows) : result
        } catch (err) {
            throw err
        }
    }
}
module.exports = TrashBinApi;

function getQuery(config, reqSettings) {
    return config[reqSettings.method][reqSettings.route]
}
function toPostgres(trashBin) {
    return Object.keys(trashBin).map((key) => {
        if (key === "geoLocation") {
            return `POINT(${trashBin[key].lon} ${trashBin[key].lat})`
        }
        return trashBin[key]
    });
}

async function adjustResponse(response) {
    if (response[0].geoLocation) {
        return response.map((obj) => {
            geoLocation = JSON.parse(replaceToArrayJson(obj.geoLocation))
            obj.geoLocation = {
                lon:geoLocation[0],
                lat:geoLocation[1]
            }
            return obj
        })
    }
    return response
}

function replaceToArrayJson(string) {
    return "["+string.substring(1,string.length-1)+"]"
}