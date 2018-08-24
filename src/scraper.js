const makeRegex = (headerName) => {
    const regexString = `xhr\\.setRequestHeader\\('${ headerName }',\\s+\\'(.*)\\'\\);`;
    return new RegExp(regexString);
}

const extractHeader = (text, headerName) => {
    [_match, headerValue] = text.match(makeRegex(headerName));
    return headerValue;
}

const extractHeaders = (text) => {
    return ['nyt-token', 'nyt-app-version', 'nyt-app-type'].reduce((acc, header) => {
        acc[header] = extractHeader(text, header);
        return acc;
    }, {});
}

module.exports = {
    extractHeaders: extractHeaders
}