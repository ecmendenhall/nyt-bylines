const dom = require("./../src/dom");

describe("dom", () => {

  it("appends byline text to the given element", () => {
    const fakeLink = document.createElement('a')
    dom.addByline(fakeLink, 'By Hot Saucerman');
    const p = fakeLink.querySelector('p')
    expect(p.innerText).toBe('By Hot Saucerman');
  });

});
