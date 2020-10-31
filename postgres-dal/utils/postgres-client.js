class PostgresClient {
    constructor(pgClient, postgresConnnectionSettings) {
        this._client = new pgClient(postgresConnnectionSettings)
        this._client.connect()

    }

    exacute = async (query, values) => {
        try {
            return await this._client.query(query, values);
        } catch (err) {
            throw err
        }
    }
}

module.exports = PostgresClient;