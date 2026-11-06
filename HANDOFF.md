# Handoff for the next agent

Updated: 2026-11-06

## Current state

- Repository: `react-viewer-doc`, branch `main`.
- Package version in `package.json`: `0.6.1`.
- npm `latest` is still `0.6.0`. Version `0.6.1` has never been published.
- Git tag `v0.6.1` points at `2e43573` and is already on `origin`. The release workflow for that tag passed tests, build and `check:package`, then failed on `npm publish` (run 41364663354, 2026-11-02).
- `main` is one empty deploy commit ahead of that tag (`6505eb0`), plus any uncommitted release prep.
- `npm whoami` on this machine is `wipmob`.

## Release prep in this cycle

- Changelog for 0.6.1 now includes the PDF/TIFF size and header checks, error-boundary reset, PDF worker placeholder behavior, pan cursor and demo samples.
- Dependencies updated inside existing ranges: React 19.3.1, MUI 9.5.0, react-window 2.5.3, ts-jest 29.4.15.
- Release workflow publishes with OIDC and uses `NPM_TOKEN` only when the secret is non-empty. Actions `checkout` and `setup-node` are v7.
- Production `npm audit --omit=dev` is clean. Dev audit still reports moderate `minimatch` issues through Jest; `npm audit fix --force` would downgrade Jest to 25 and must not be used.

## Next action to publish

Do not push tag `v0.6.1` again. It already exists.

1. Commit the release prep on `main` and push.
2. On npm, confirm Trusted Publisher for workflow `release.yml`. Recreate it if the November configuration expired (first publish must succeed within 2 days).
3. Run **Release & Publish to npm** with `workflow_dispatch` on `main`, or locally: `npm run release -- --otp=CODIGO`.
4. Confirm with `npm view react-viewer-doc version dist-tags --json`.
