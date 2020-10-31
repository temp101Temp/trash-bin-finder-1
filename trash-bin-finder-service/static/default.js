module.exports = {
    clientSettings: {
        baseSettings: {
            baseUrl: "http://localhost:8000/api",
            headers: { "Content-Type": "application/json" },
            timeout: 100000
        },
        urlEnding: {
            getByLocation: "/byDistanceFromPoint",
            getReportEmptyingDate: "/byEmptyingDateRange",
            getByEmptyingDate: "/byEmptyingDate",
            getById: "/emptyingDateById",
            updateLocation: "/locationById",
            updateEmptyingDate: "/emptyingDateById",
            deleteById: "/",
            add: "/",
        }
    },
    redisClientSettings: {
        url: "redis://:@localhost:6379",
        expireAtQuery: { EX: 10 }
    },
    swaggerOption:{
        swaggerDefinition: {
            info: {
                version: "1.0.0",
                title: "poc Proj",
                description: "info",
                contact: {
                    name: "Oriel"
                }
            }
        },
        //change to relativ path
        apis: ["./api/*"]
    },
    servicePort: 3000
}