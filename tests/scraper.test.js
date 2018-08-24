const scraper = require('./../src/scraper');

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

describe('scraper', () => {

    it('extracts nyt-token from document source', () => {
        expect(scraper.extractHeaders(scriptTag)['nyt-token']).toBe('fake-token');
    });

    it('extracts nyt-app-version from document source', () => {
        expect(scraper.extractHeaders(scriptTag)['nyt-app-version']).toBe('0.0.3');
    });

    it('extracts nyt-app-type from document source', () => {
        expect(scraper.extractHeaders(scriptTag)['nyt-app-type']).toBe('project-vi');
    });

});