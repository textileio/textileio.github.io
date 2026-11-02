# Textile website

This repository hosts the Textile organization site at https://textileio.github.io/.
GitHub Pages publishes the static files in the `gh-pages` branch, from its root.
There is no custom domain configured for this site.

The `master` branch retains the historical source and the checked-in `dist` files.
When changing the homepage, keep `src/index.html`, `dist/index.html`, and the
published `gh-pages/index.html` in sync. Changes to `gh-pages` publish through
GitHub Pages without an npm installation or application build.

Run the hosting regression tests with Node.js 22 or later:

```bash
npm test
```

The legacy npm build and Textile Buckets deployment are retired. The old
deployment workflow was disabled and removed during the November 2, 2026
security review. The historical development dependencies have known
vulnerabilities and need modernization before the npm build can be used again.
See [SECURITY_REVIEW.md](SECURITY_REVIEW.md) for the review scope and limitations.
