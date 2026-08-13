# Contributing

Thanks for considering a contribution.

## Development

```bash
npm install
npm test -- --runInBand
npm run build:lib
npm start
```

Open `http://localhost:3001` for the demo app.

## Pull Requests

- Keep changes focused and include tests for behavior changes.
- Run tests and the library build before opening a PR.
- Update the README when changing public props, installation steps, or supported behavior.

## Release Checks

Before publishing, run:

```bash
npm test -- --runInBand
npm run build:lib
npm run build:demo
npm pack --dry-run
```

Update `package.json` / `package-lock.json`, [CHANGELOG.md](./CHANGELOG.md), and the demo version badge. Then:

```bash
git tag vX.Y.Z
npm publish --access public
```

Push `main` and the tag. CI runs tests and the library build. The demo is deployed to GitHub Pages from `example/dist` on pushes to `main`.
