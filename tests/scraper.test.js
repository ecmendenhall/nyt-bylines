const scraper = require("./../src/scraper");

const scriptTag = `
<script>

  (function() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('POST', 'https://samizdat-graphql.nytimes.com/graphql/v2', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('nyt-app-type', 'project-vi');
    xhr.setRequestHeader('nyt-app-version', '0.0.3');
    xhr.setRequestHeader('nyt-token',   'fake-token');
    xhr.send('{"operationName":"UserQuery","variables":{},"query":"   query UserQuery {     user {       __typename       profile {         displayName       }       userInfo {         regiId         entitlements         demographics {           emailSubscriptions           wat           bundleSubscriptions {             bundle             inGrace             promotion             source           }         }       }     }   } "}');
    window.userInfoXhrObject = xhr;
  })();

</script>
`;

describe("scraper", () => {
  it("extracts nyt-token from document source", () => {
    expect(scraper.extractHeaders(scriptTag)["nyt-token"]).toBe("fake-token");
  });

  it("extracts nyt-app-version from document source", () => {
    expect(scraper.extractHeaders(scriptTag)["nyt-app-version"]).toBe("0.0.3");
  });

  it("extracts nyt-app-type from document source", () => {
    expect(scraper.extractHeaders(scriptTag)["nyt-app-type"]).toBe(
      "project-vi"
    );
  });

  it("extracts links from document", () => {
    document.body.innerHTML = `
          <div>
            <a href="https://www.nyyimes.com/2018/01/01/article.html">
              <p>Some article</p>
            </a>
          </div>
        `;
    expect(scraper.extractLinks().length).toBe(1);
  });

  it("extracts relative links", () => {
    document.body.innerHTML = `
          <div>
            <a href="/2019/01/01/article.html">
              <p>Some article</p>
            </a>
          </div>
        `;
    expect(scraper.extractLinks().length).toBe(1);
  });

  it("ignores opinion URLs", () => {
    document.body.innerHTML = `
          <div>
            <a href="/2019/01/01/opinion/article.html">
              <p>Some article</p>
            </a>
          </div>
        `;
    expect(scraper.extractLinks().length).toBe(0);
  });

  it("ignores links with nested figures", () => {
    document.body.innerHTML = `
          <div>
            <a href="/2019/01/01/article.html">
              <div>
                <figure></figure>
              </div>
            </a>
          </div>
        `;
    expect(scraper.extractLinks().length).toBe(0);
  });
});
