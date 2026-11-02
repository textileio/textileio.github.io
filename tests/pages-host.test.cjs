const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

const files = process.env.PAGES_HTML_FILE
  ? [process.env.PAGES_HTML_FILE]
  : ['src/index.html', 'dist/index.html'];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];

  test(`${file} stays on the organization Pages URL`, () => {
    for (const url of ['https://textileio.github.io/', 'https://textileio.github.io/#features']) {
      const location = new URL(url);
      const document = { write() {} };
      for (const [, , code] of scripts) {
        if (code.trim()) vm.runInNewContext(code, { location, document, window: {} });
      }
      assert.equal(location.href, url);
    }
  });

  test(`${file} loads scripts only from the site itself`, () => {
    const location = new URL('https://textileio.github.io/');
    const markup = [html];
    const document = { write(value) { markup.push(value); } };
    for (const [, , code] of scripts) {
      if (code.trim()) vm.runInNewContext(code, { location, document, window: {} });
    }
    for (const content of markup) {
      for (const [, src] of content.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
        assert.equal(new URL(src, 'https://textileio.github.io/').origin, 'https://textileio.github.io');
      }
    }
  });
}
