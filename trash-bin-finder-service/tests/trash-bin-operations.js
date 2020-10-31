//#region  env var init
// you can install these vars from the command line and discard this code
process.env.NODE_CONFIG_DIR = "./static/tests";

// when you have a production config file
//process.env.NODE_ENV= "production"
//#endregion
const mockServer = require("mockserver-node");
const mockServerClient = require("mockserver-client").mockServerClient;
const Client = require("../utils/client")
const config = require("config")

const client = new Client(config.clientSettings.baseSettings);
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("api", () => {
    beforeAll(function (done) {
        // start the server
        const { port, host } = extarctPortAndHost(config.clientSettings.baseSettings.baseUrl);
        mockServer.start_mockserver({
            serverPort: port,
            error: true
        });

        for (schema in config.schemas) {
            Initrequests(host, port, config.schemas[schema]);
        }

        setTimeout(() => {
            done();
        }, 4000);
    });
    it("addTrashBin", async () => {

        let newtrashBin = {
            id: "yaniv",
            color: "xxxx",
            type: "xxxx",
            geoLocation: { "lat": 41.12, "lon": -71.34 },
            emptyingDate: "2015-01-01T12:10:30Z"
        }
        let result = await client.post("/", newtrashBin)
        expect(result.status).toEqual(200)

    })

    it("updatEemptyingDateById", async () => {
        let data = {
            id: "yaniv",
            emptyingDate: "2020-01-01T12:10:30Z"
        }
        let result = await client.put("/emptyingDateById", data)
        expect(result.status).toEqual(200)

    })

    it("updatLocationById", async () => {
        let data = {
            id: "yaniv",
            geoLocation: {
                lat: 66.12,
                lon: -78.34
            }
        }
        let result = await client.put("/locationById", data)
        expect(result.status).toEqual(200)

    })

    it("delete", async () => {
        let id = 'a';
        let result = await client.delete("/", { id })
        expect(result.status).toEqual(200)
    })

    it("getByEmptyingDate", async () => {
        let emptyingDate = '2015-01-01T12:10:30Z';
        let expectedResult = [{
            id: "yaniv",
            color: "xxxx",
            type: "xxxx",
            geoLocation: { "lat": 41.12, "lon": -71.34 },
            emptyingDate: "2015-01-01T12:10:30Z"
        },
        {
            id: "yaniv",
            color: "xxxx",
            type: "xxxx",
            geoLocation: { "lat": 41.12, "lon": -71.34 },
            emptyingDate: "2015-01-01T12:10:30Z"
        }]
        let result = await client.get("/byEmptyingDate", { emptyingDate })
        expect(result.data).toEqual(expectedResult)
    })

    it("getLocationByDistance", async () => {
        let params = {
            distance: "10km",
            geoLocation: { lat: 66.12, lon: -78.34 }
        }
        let expectedResult = [{
            id: "yaniv",
            color: "xxxx",
            type: "xxxx",
            geoLocation: { "lat": 41.12, "lon": -71.34 },
            emptyingDate: "2015-01-01T12:10:30Z"
        },
        {
            id: "yaniv",
            color: "xxxx",
            type: "xxxx",
            geoLocation: { "lat": 41.12, "lon": -71.34 },
            emptyingDate: "2015-01-01T12:10:30Z"
        }]
        let result = await client.get("/locationByDistance", params)
        expect(result.data).toEqual(expectedResult)
    })
})

 extarctPortAndHost =(url) =>{
    let data = url.split('/')[2].split(':')
    return { host: data[0], port: data[1] }
}
 Initrequests = (host, port, schema)=> {
    mockServerClient(host, port).mockAnyResponse(schema)
}

