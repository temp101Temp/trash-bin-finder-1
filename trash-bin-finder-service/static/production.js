module.exports = {
    redisClientSettings: {
        url: "redis://:@host.docker.internal:6379",
    },
    clientSettings: {
        baseSettings: {
            baseUrl: "http://host.docker.internal:8000/api"
        }
    }
}