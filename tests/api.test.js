const api = require("./../src/api");

describe("api", () => {
  const articleUrl =
    "https://www.nytimes.com/2018/08/24/us/politics/cia-russia-midterm-elections.html";

  beforeEach(() => {
    global.fetch = jest.fn(() => {
      return new Promise((resolve, reject) => resolve({
        json: () => {
          return new Promise((resolve, _reject) => {
            resolve({
              data: {
                article: {
                  bylines: [{ renderedRepresentation: "By Sharon LaFraniere" }]
                }
              }
            });
          });
        }
      }));
    });
    this.client = new api.API("https://graphql.example.com", {
      "some-token": "foobar"
    });
  });

  const callArgs = [
    "https://graphql.example.com",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "some-token": "foobar" },
      body: JSON.stringify({
        operationName: "BylineQuery",
        variables: {},
        query: `query BylineQuery { article(id: \"${articleUrl}\") { bylines { renderedRepresentation }}}`
      })
    }
  ];

  it("loads byline from the graph API", () => {
    this.client.loadByline(articleUrl);
    expect(fetch).toHaveBeenCalledWith(...callArgs);
  });

  it("loads byline from the graph API", () => {
    return this.client.loadByline(articleUrl).then(byline => {
      expect(byline).toBe("By Sharon LaFraniere");
    });
  });
});
