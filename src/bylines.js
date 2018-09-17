const { API } = require("./api");
const scraper = require("./scraper");
const dom = require("./dom");

const headers = scraper.extractHeaders(document.documentElement.innerHTML);
const client = new API(headers);
var seen = new Set();

const addBylines = () => {
  let links = scraper.extractLinks();
  for (let a of links) {
    if (!seen.has(a)) {
      seen.add(a);
      client
        .loadByline(a.href)
        .then(byline => {
          dom.addByline(a, byline);
        })
        .catch(e => console.log(e));
    }
  }
};

addBylines();
setInterval(addBylines, 500);