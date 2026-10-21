# Publicação no npm

O pacote público é `react-viewer-doc`. O fluxo de publicação está em `.github/workflows/release.yml` e exige acesso de mantenedor ao pacote no npm.

## Configuração recomendada: publicação confiável

Nas configurações do pacote no npm, adicione um **Trusted Publisher** do GitHub Actions com:

- Usuário ou organização: `nandorip`
- Repositório: `react-viewer-doc`
- Arquivo do workflow: `release.yml`
- Permissão para `npm publish`

O workflow já concede `id-token: write` e usa Node 24. Com essa configuração, o npm autentica a publicação via OIDC e gera a proveniência automaticamente. Confirme que a URL de `repository` em `package.json` corresponde ao repositório configurado. Se a publicação confiável ainda não estiver configurada, o workflow pode usar o segredo `NPM_TOKEN` como alternativa; use um token granular com permissão de publicação e as exigências de 2FA apropriadas da conta. Não desative a proteção de 2FA para publicar.

## Antes de publicar

1. Atualize `version` em `package.json` e `package-lock.json`. Uma combinação de nome e versão já publicada não pode ser reutilizada.
2. Registre as mudanças em `CHANGELOG.md` e faça commit.
3. Execute `npm ci`, `npm test`, `npm pack --dry-run` e `npm audit`.
4. Confira o tarball: `prepack` compila CJS e ESM e valida os imports. O `prepublishOnly` executa os testes.

## Publicação

Dispare **Release & Publish to npm** na aba Actions do GitHub, ou crie e envie uma tag `vX.Y.Z` que corresponda à versão em `package.json`. O workflow aceita uma dist-tag opcional na execução manual.

Para publicação local, `npm run release` também executa os testes, compila e valida o pacote antes de chamar `npm publish`; a conta npm precisa ter permissão de publicação e satisfazer o 2FA exigido pelo registro.

Após a publicação, confira `npm view react-viewer-doc version dist-tags --json`.

Referência: [publicação confiável do npm](https://docs.npmjs.com/trusted-publishers/).
