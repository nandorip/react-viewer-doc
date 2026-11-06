# Handoff for the next agent

Updated: 2026-11-06

## Current state

- Repository: `react-viewer-doc`, branch `main`.
- Package version in `package.json`: `0.6.1`.
- npm `latest` is still `0.6.0`. Version `0.6.1` has never been published.
- Git tag `v0.6.1` points at `2e43573`, which is behind `main`. Do not push that tag again. Publish with `workflow_dispatch` on `main`, or move the tag only when `main` is the commit that should be `0.6.1`.
- The release run for that tag (41364663354, 2026-11-02) passed tests and failed on `npm publish`.
- `npm whoami` on this machine is `wipmob`.

## Release workflow

- `.github/workflows/release.yml` publishes with OIDC only. It does not set `registry-url` or `NODE_AUTH_TOKEN`, so an empty or expired `NPM_TOKEN` cannot replace the trusted publisher.
- Provenance is automatic for a public OIDC publish. The command does not pass `--provenance`.
- Actions `checkout` and `setup-node` are v7.
- The npm Trusted Publisher must name the workflow file `release.yml` in `nandorip/react-viewer-doc`. A new publisher expires if the first publish does not succeed within 2 days.

## Verification already done on the dependency refresh

- Tests, `build:lib`, `check:package`, `npm pack --dry-run`, and the demo build passed locally.
- CI and Deploy demo succeeded on `61307bf`.
- Production `npm audit --omit=dev` is clean. Do not run `npm audit fix --force`; it downgrades Jest to 25.

## Next action to publish

1. Push the OIDC workflow fix to `main`.
2. On npm, recreate the Trusted Publisher for `release.yml` if the November configuration expired.
3. Run **Release & Publish to npm** with `workflow_dispatch` on `main`, or locally: `npm run release -- --otp=CODIGO`.
4. Confirm with `npm view react-viewer-doc version dist-tags --json`.
