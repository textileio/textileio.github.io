# Publication security review

Reviewed November 2, 2026, before changing this repository from private to public
and renaming it from `textile.io` to `textileio.github.io`.

## Scope and results

- Reviewed all six branches and the available pull-request refs in a full mirror.
  The mirror contains 108 reachable commits. Gitleaks 8.30.1 examined 96 commits
  using `--all --full-history` with inline allow comments ignored.
- Investigated all eight Gitleaks matches. Two occurrences in
  `.textile/config.yml` are a public bucket identifier. The other six are
  browser-visible Segment analytics keys and diagnostic identifiers in the two
  historical product bundles. No server credential was identified in these
  matches. A secret scan cannot establish that every possible secret is absent.
- GitHub reported no Actions runs, Actions artifacts, repository Actions secrets,
  webhooks, deploy keys, releases, or current issues or pull requests. The mirror
  retains historical pull-request refs. Seven legacy review comments were read;
  no credential or sensitive business information was identified in them.
- The published site consists of static HTML, CSS, JavaScript, fonts, and images.
  The `products` source directories and npm dependencies are not part of the
  `gh-pages` publication.

## Changes made for publication

- Disabled and removed the legacy deployment workflow, which installed old npm
  dependencies, used Node.js 14, and deployed through outdated third-party
  actions and retired Textile infrastructure.
- Removed the homepage's remote Fathom and legacy analytics script loaders.
- Removed the forced redirect to `www.textile.io`, removed the old `CNAME`, and
  updated homepage navigation and metadata for the organization Pages address.
- Added hosting regression tests that exercise the inline scripts to check that
  the homepage stays at the Pages address and loads scripts from its own origin.
- Added `.nojekyll` to the publication branch so GitHub serves its static assets
  directly, including the `.well-known` directory.

## Remaining limitations

`npm audit --package-lock-only --ignore-scripts --json` reported 109 vulnerable
packages in the historical build dependency tree: 10 critical, 58 high,
36 moderate, and 5 low. These dependencies were not installed or executed for
publication. They remain in the retained source and lockfiles; this review does
not claim that the legacy npm build is secure or operational.

The existing build and lint scripts were not run. They require the retired tool
chain, and the lint scripts suppress errors. Publication uses the existing static
artifact instead. Its homepage regression tests and local HTML/CSS asset checks
were run separately. Historical product forms and analytics bundles remain as
source history and are not deployed by the current Pages configuration.

This review covers readiness to publish this repository and its static homepage.
It is not a penetration test or a review of the former backend services or their
current domain ownership.

Bucket identifier reference:
https://github.com/textileio/go-buckets#creating-a-bucket
