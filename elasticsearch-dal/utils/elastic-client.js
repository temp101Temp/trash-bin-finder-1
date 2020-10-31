const { Client } = require('@elastic/elasticsearch')
class ElasticClient {
    constructor(config) {
        this._client = new Client({
            auth: {
                username: config.username,
                password: config.password
            }, node: config.url
        })
        this._config = config;
    }
    getEmptyingDateById = async (id) => {
        try {
            return await this._client.search({
                index: this._config.index,
                scroll: this._config.scrollTimeout,
                size: this._config.size,
                body: {
                    query: {
                        match: { id: id }
                    }
                }
            }).body
        } catch (err) {
            throw err;
        }
    }
    getAllTrashBinByRangeEmptyingDate = async (emptyingDateRange) => {
        try {
            return await scrollSearch(await searchByEmptyingDateRange(this._client, emptyingDateRange, this._config)
                , this._client, this._config)
        } catch (err) {
            throw err
        }
    }
    getAllTrashBinByEmptyingDate = async (emptyingDate) => {
        try {
            return await scrollSearch(await searchByEmptyingDate(this._client, emptyingDate, this._config)
                , this._client, this._config)
        } catch (err) {
            throw err
        }
    }

    addTrashBin = async (params) => {
        try {
            return await this._client.index({
                index: this._config.index,
                id: params.id,
                refresh: true,
                body: params
            });
        } catch (err) {
            throw err
        }
    }

    deleteTrashBinById = async (id) => {
        try {
            return await this._client.delete({
                index: this._config.index,
                refresh: true,
                id: id
            });
        } catch (err) {
            throw err
        }
    }

    updateTrashBinLocationById = async (params) => {
        try {
            return await this._client.update({
                index: this._config.index,
                refresh: true,
                id: params.id,
                body: {
                    doc: {
                        geoLocation: params.geoLocation
                    }
                }

            });
        } catch (err) {
            throw err
        }
    }
    getAllTrashBinsByDistanceFromSpecificPoint = async (params) => {
        try {
            return await scrollSearch(await searchByDistanceFromSpecificPoint(this._client, params, this._config)
                , this._client, this._config)
        } catch (err) {
            throw err
        }
    }

    updateTrashBinEmptingDateById = async (params) => {
        try {
            return await this._client.update({
                index: this._config.index,
                refresh: true,
                id: params.id,
                body: {
                    doc: {
                        emptyingDate: params.emptyingDate
                    }
                }

            });
        } catch (err) {
            throw err
        }
    }
}
module.exports = ElasticClient;
async function searchByDistanceFromSpecificPoint(client, params, config) {
    return await client.search({
        index: config.index,
        scroll: config.scrollTimeout,
        size: config.size,
        body: {
            query: {
                bool: {
                    must: {
                        match_all: {}
                    },
                    filter: {
                        geo_distance: {
                            distance: params.distance,
                            geoLocation: params.geoLocation
                        }
                    }
                }
            }
        }
    });
}
async function searchByEmptyingDate(client, emptyingDate, config) {
    return await client.search({
        index: config.index,
        scroll: config.scrollTimeout,
        size: config.size,
        body: {
            query: {
                match: { emptyingDate: emptyingDate }
            }
        }
    });
}
async function searchByEmptyingDateRange(client, dateRange, config) {
    return await client.search({
        index: config.index,
        scroll: config.scrollTimeout,
        size: config.size,
        body: {
            query: {
                range: {
                    emptyingDate: {
                        gte: dateRange.gteEmptyingDate,
                        lt: dateRange.ltEmptyingDate
                    }
                }
            }
        }
    });
}

async function scrollSearch(response, client, config) {
    let responseQueue = [];
    let allResults = []
    responseQueue.push(response)

    while (responseQueue.length) {
        const { body } = responseQueue.shift()

        body.hits.hits.forEach(function (hit) {
            allResults.push(hit._source)
        })

        if (body.hits.total.value === allResults.length) {
            break
        }

        responseQueue.push(
            await client.scroll({
                scrollId: body._scroll_id,
                scroll: config.scrollTimeout
            })
        )
    }
    return allResults
}