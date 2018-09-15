const api = require('./api');
const scraper = require('./scraper');

const headers = scraper.extractHeaders(document.documentElement.innerHTML);
console.log(headers);
const client = new api.API(api.GRAPH_API_ENDPOINT, headers);

const tags = Array.from(document.querySelectorAll('a')).filter(i => i.href.match(/(https:\/\/www\.nytimes.com)?\/\d\d\d\d\/\d\d\/\d\d\/.*/));

for (let tag of tags) {
    console.log(tag);
    client.loadByline(tag.href).then((byline) => {
        console.log(byline);
        let p = document.createElement('p');
        p.innerText = byline;
        tag.appendChild(p);
    });
}