class RedisClient {
    constructor(rdClient,rdUtils,rdSettings) {

        rdClient.Command.setArgumentTransformer("set", function (args) {
            args = [...args].concat(rdUtils.convertObjectToArray(rdSettings.expireAtQuery));
            args[1] = JSON.stringify(args[1])
            return args;
        });
        rdClient.Command.setReplyTransformer("get", function (resultAsString) {
            return JSON.parse(resultAsString);
        });

        this._client = new rdClient(rdSettings.url);
    }

    set = async (key, value) => {
        try {
            return await this._client.set(key, value);
        } catch (err) {
            throw err
        }
    }

    get = async (key) => {
        try {
            return await this._client.get(key);
        } catch (err) {
            throw err
        }
    }
}
module.exports = RedisClient;