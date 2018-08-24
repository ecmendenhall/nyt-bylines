const GRAPH_API_ENDPOINT = 'https://samizdat-graphql.nytimes.com/graphql/v2';

class API {

    constructor(graphAPIEndpoint=GRAPH_API_ENDPOINT, extraHeaders={}) {
        this.graphAPIEndpoint = graphAPIEndpoint;
        this.extraHeaders = extraHeaders;
    }

    loadByline(articleUrl) {
        const defaultHeaders = {
            'Content-Type': 'application/json'
        }
        const headers = Object.assign({}, defaultHeaders, this.extraHeaders)
        const body = {
            operationName: 'BylineQuery',
            variables: {},
            query: `query BylineQuery { article(id: '${ articleUrl }') { bylines { renderedRepresentation }}}`
        };
        return fetch(this.graphAPIEndpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });
    }

}

module.exports = {
    API: API
}