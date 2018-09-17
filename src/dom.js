const addByline = (element, byline) => {
  let p = document.createElement("p");
  p.innerText = byline;
  p.style = `
    color: rgb(153, 153, 153);
    font-size: 12px;
    font-family: "nyt-franklin", arial, helvetica, sans-serif;
    line-height: 12px;
    margin-top: 1em;
  `;
  p.className = 'byline';
  element.appendChild(p);
};

module.exports = {
  addByline: addByline
};
