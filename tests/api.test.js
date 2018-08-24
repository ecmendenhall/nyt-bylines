const api = require('./../src/api');

describe('api', () => {

    const articleUrl = 'https://www.nytimes.com/2018/08/24/us/politics/cia-russia-midterm-elections.html';

    beforeEach(() => {
        global.fetch = jest.fn();
        this.client = new api.API('https://graphql.example.com', {'some-token': 'foobar'});
    });

    const callArgs = [
        'https://graphql.example.com',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'some-token': 'foobar'},
            body: JSON.stringify({
                operationName: 'BylineQuery',
                variables: {},
                query: `query BylineQuery { article(id: '${ articleUrl }') { bylines { renderedRepresentation }}}`
            })
        }
    ]

    it('loads byline from the graph API', () => {
        this.client.loadByline(articleUrl);
        expect(fetch).toHaveBeenCalledWith(...callArgs);
    });

});