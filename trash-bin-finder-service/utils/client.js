
class myClient {
    constructor(axios,axiosConfig) {
        this._client = axios.create({
            baseURL: axiosConfig.baseUrl,
            headers: axiosConfig.headers,
            timeout: axiosConfig.timeout
        })
    }
    get = async (urlEnding, params) => {
        try {
            return params ? await this._client.get(urlEnding, { params: params }) :
                await this._client.get(urlEnding);
        } catch (error) {
            throw error;
        }
    }

    put = async (urlEnding, body) => {
        try {
            return await this._client.put(urlEnding, body);;
        } catch (error) {
            throw error;
        }
    }

    post = async (urlEnding, body) => {
        try {
            return await this._client.post(urlEnding, body);;
        } catch (error) {
            throw error;
        }
    }

    delete = async (urlEnding, params) => {
        try {
            return await this._client.delete(urlEnding, { params: params });;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = myClient;