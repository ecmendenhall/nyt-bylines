const { API } = require("./api");
const scraper = require("./scraper");
const dom = require("./dom");

const headers = scraper.extractHeaders(document.documentElement.innerHTML);
const client = new API(headers);
const links = scraper.extractLinks();

for (let a of links) {
  client
    .loadByline(a.href)
    .then(byline => {
      dom.addByline(a, byline);
    })
    .catch(e => console.error(e));
}