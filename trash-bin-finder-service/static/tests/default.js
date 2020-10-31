module.exports = {
    mockServicePort: 4444,
    clientSettings: {
        baseSettings: {
            baseUrl: "http://localhost:4444/api",
            headers: { "Content-Type": "application/json" },
            timeout: 100000
        },
        urlEnding: {
            getByLocation: "/byDistanceFromPoint",
            getByEmptyingDate: "/byEmptyingDate",
            updateLocation: "/locationById",
            updateEmptyingDate: "/emptyingDateById",
            deleteById: "/",
            add: "/",
        }
    },
    redisClientSetting: {
        url: "redis://:@localhost:6379",
        expireAtQuery: { EX: 300 }
    }, schemas: {
        deleteByIdSchema: {
            'httpRequest': {
                'method': 'delete',
                'path': '/api/',
                'queryStringParameters': [
                    {
                        'name': 'id',
                        'values': ['a']
                    }
                ],
            },
            'httpResponse': {
                'statusCode': 200
            }
        },
        getByEmptyingDate: {
            'httpRequest': {
                'method': 'get',
                'path': '/api/byEmptyingDate',
                'queryStringParameters': [
                    {
                        'name': 'emptyingDate',
                        'values': ['2015-01-01T12:10:30Z']
                    }
                ],
            },
            'httpResponse': {
                'statusCode': 200,
                'body': {
                    "type": "JSON",
                    "json":
                        [{
                            "id": "yaniv",
                            "color": "xxxx",
                            "type": "xxxx",
                            "geoLocation": { "lat": 41.12, "lon": -71.34 },
                            "emptyingDate": "2015-01-01T12:10:30Z"
                        },
                        {
                            "id": "yaniv",
                            "color": "xxxx",
                            "type": "xxxx",
                            "geoLocation": { "lat": 41.12, "lon": -71.34 },
                            "emptyingDate": "2015-01-01T12:10:30Z"
                        }]
                }
            }
        },
        getLocationByDistance: {
            'httpRequest': {
                'method': 'get',
                'path': '/api/locationByDistance',
                'queryStringParameters': [
                    {
                        'name': 'distance',
                        'values': ['10km']
                    }, {
                        'name': 'geoLocation',
                        'values': ['{"lat":66.12,"lon":-78.34}']
                    }
                ],
            },
            'httpResponse': {
                'statusCode': 200,
                'body': {
                    "type": "JSON",
                    "json": [{
                        "id": "yaniv",
                        "color": "xxxx",
                        "type": "xxxx",
                        "geoLocation": { "lat": 41.12, "lon": -71.34 },
                        "emptyingDate": "2015-01-01T12:10:30Z"
                    },
                    {
                        "id": "yaniv",
                        "color": "xxxx",
                        "type": "xxxx",
                        "geoLocation": { "lat": 41.12, "lon": -71.34 },
                        "emptyingDate": "2015-01-01T12:10:30Z"
                    }]
                }
            }
        },
        updateEmptyingDateById: {
            'httpRequest': {
                'method': 'post',
                'path': '/api/emptyingDateById',
                'body': {
                    "type": "JSON",
                    "json": {
                        "id": "yaniv",
                        "emptyingDate": "2020-01-01T12:10:30Z"

                    },
                    "matchType": "STRICT"
                }
            },
            'httpResponse': {
                'statusCode': 200,

            }
        },
        updateLocationById: {
            'httpRequest': {
                'method': 'post',
                'path': '/api/locationById',
                'body': {
                    "type": "JSON",
                    "json": {
                        "id": "yaniv",
                        "geoLocation": { 'lat': 66.12, 'lon': -78.34 }
                    },
                    "matchType": "STRICT"
                }
            },
            'httpResponse': {
                'statusCode': 200,

            }
        },
        addNewTrashBin: {
            'httpRequest': {
                'method': 'put',
                'path': '/api/',
                'body': {
                    "type": "JSON",
                    "json": {
                        "id": "yaniv",
                        "color": "xxxx",
                        "type": "xxxx",
                        "geoLocation": { "lat": 41.12, "lon": -71.34 },
                        "emptyingDate": "2015-01-01T12:10:30Z"
                    },
                    "matchType": "STRICT"
                }
            },
            'httpResponse': {
                'statusCode': 200,

            }
        }
    }
}