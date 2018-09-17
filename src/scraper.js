const makeRegex = headerName => {
  const regexString = `xhr\\.setRequestHeader\\('${headerName}',\\s+\\'(.*)\\'\\);`;
  return new RegExp(regexString);
};

const extractHeader = (text, headerName) => {
  [_match, headerValue] = text.match(makeRegex(headerName));
  return headerValue;
};

const extractHeaders = text => {
  return ["nyt-token", "nyt-app-version", "nyt-app-type"].reduce(
    (acc, header) => {
      acc[header] = extractHeader(text, header);
      return acc;
    },
    {}
  );
};

const extractLinks = () => {
  return Array.from(document.querySelectorAll("a"))
    .filter(a =>
      a.href.match(/(https:\/\/www\.nytimes.com)?\/\d\d\d\d\/\d\d\/\d\d\/.*/)
    )
    .filter(a => !a.href.match(/\/opinion\//))
    .filter(a => !a.querySelector("figure"))
    .filter(a => !a.querySelector("p.byline"));
};

module.exports = {
  extractHeaders: extractHeaders,
  extractLinks: extractLinks
};
