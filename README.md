# Textile website

This repository hosts the Textile organization site at https://textileio.github.io/.
GitHub Pages publishes the static files in the `gh-pages` branch, from its root.
There is no custom domain configured for this site.

The homepage restores the July 7, 2019 design from
[`f63c1fb`](https://github.com/textileio/textileio.github.io/commit/f63c1fb6825a1c46282a30b3a203e0e25ae590b3).
The restoration uses new commits, retaining all later repository history. Asset
paths and logo links work at the organization Pages root, the code-example tabs
run locally, and long code examples scroll within the page on smaller screens.

The `master` branch retains the historical source and the checked-in `dist` files.
When changing the homepage, keep `src/index.html`, `dist/index.html`, and the
published `gh-pages/index.html` in sync. Changes to `gh-pages` publish through
GitHub Pages without an npm installation or application build.

Run the hosting regression tests with Node.js 22 or later:

```bash
npm test
```

With Python Playwright and its Chromium browser installed, run the desktop and
mobile browser checks against the static artifact:

```bash
python3 tests/browser-smoke.py
```

Pass another static directory as the first argument and an optional screenshot
directory as the second argument to check the publication branch as well.

The legacy npm build and Textile Buckets deployment are retired. The old
deployment workflow was disabled and removed during the November 2, 2026
security review. The historical development dependencies have known
vulnerabilities and need modernization before the npm build can be used again.
See [SECURITY_REVIEW.md](SECURITY_REVIEW.md) for the review scope and limitations.
