# Guia de Publicação no npm (`react-viewer-doc`)

O pacote oficial distribuído no registro público é [`react-viewer-doc`](https://www.npmjs.com/package/react-viewer-doc).

O projeto possui fluxo automatizado com **GitHub Actions + Provenance (OIDC)** e também suporte a **publicação local assistida por script**.

---

## 1. Pré-requisitos e Permissões

- **Conta no npm** com permissão de mantenedor/proprietário no pacote `react-viewer-doc`.
- **2FA (Two-Factor Authentication)** ativo na conta npm.
- **Configuração recomendada (Trusted Publisher / OIDC)**:
  - No npm: acesse as configurações do pacote `react-viewer-doc` > **Publishing Access** > **Trusted Publishers**.
  - Adicione o repositório GitHub:
    - **Owner**: `nandorip`
    - **Repository**: `react-viewer-doc`
    - **Workflow**: `release.yml`
  - Essa configuração dispensa tokens estáticos e gera atestado de proveniência (`--provenance`) assinado criptograficamente.
- **Alternativa via Secret**: caso o Trusted Publisher não esteja ativo, configure a secret `NPM_TOKEN` no repositório GitHub (Settings > Secrets and variables > Actions) com um token granular do npm com permissão de publicação.

---

## 2. Preparação do Release (Passo a Passo)

Antes de disparar qualquer publicação:

1. **Atualizar a versão**:
   Atualize o campo `"version"` em [`package.json`](package.json) e sincronize o `package-lock.json`:
   ```bash
   npm version patch   # Para correções de bugs (ex: 0.6.1 -> 0.6.2)
   # ou
   npm version minor   # Para novas funcionalidades compatíveis (ex: 0.6.1 -> 0.7.0)
   # ou
   npm version major   # Para breaking changes (ex: 0.6.1 -> 1.0.0)
   ```
2. **Atualizar o histórico de mudanças**:
   Edite o [`CHANGELOG.md`](CHANGELOG.md) detalhando as correções e novas implementações sob o cabeçalho da versão correspondente.
3. **Verificação de qualidade local**:
   Execute os testes e conferência do empacotamento:
   ```bash
   npm test
   npm run build:lib
   npm run check:package
   npm pack --dry-run
   ```
4. **Commit e Push**:
   ```bash
   git add package.json package-lock.json CHANGELOG.md
   git commit -m "chore(release): vX.Y.Z"
   git push origin main
   ```

---

## 3. Publicando (Métodos Disponíveis)

### Método A: Via GitHub Actions (Recomendado)

O workflow [`.github/workflows/release.yml`](.github/workflows/release.yml) executa os testes em ambiente limpo, compila CJS e ESM, valida o pacote e publica com `--provenance`.

#### Opção 1: Por Git Tag
Crie e envie uma tag correspondente à versão no `package.json`:
```bash
git tag v0.6.2
git push origin v0.6.2
```
O workflow iniciará automaticamente.

#### Opção 2: Disparo Manual (Workflow Dispatch)
1. Vá até a aba **Actions** no repositório GitHub.
2. Selecione o workflow **Release & Publish to npm**.
3. Clique em **Run workflow**.
4. (Opcional) Informe a `tag` de distribuição npm desejada (`latest`, `beta`, `next`).

---

### Método B: Publicação Local (Linha de Comando)

Para publicar diretamente do terminal:

1. Certifique-se de estar logado no npm:
   ```bash
   npm whoami
   # Se não autenticado:
   npm login
   ```
2. Execute o script de publicação do projeto:
   ```bash
   npm run release
   ```
   > **Nota com 2FA**: Se a sua conta npm exigir código de autenticação no terminal, passe via argumento:
   > ```bash
   > npm run release -- --otp=123456
   > ```
   > O script [`scripts/release.cjs`](scripts/release.cjs) executa automaticamente os testes unitários, compila a biblioteca e valida a integridade do pacote antes de invocar o `npm publish`.

---

## 4. Pós-Publicação e Validação

1. Verifique se a nova versão foi publicada e propagada corretamente no registro npm:
   ```bash
   npm view react-viewer-doc version dist-tags --json
   ```
2. (Opcional) Teste a instalação em um projeto temporário:
   ```bash
   npx create-react-app test-install --template typescript
   cd test-install
   npm i react-viewer-doc
   ```
3. Se aplicável, publique a documentação/demo atualizada no GitHub Pages:
   ```bash
   npm run publish-demo
   ```

---

## 5. Se a publicação no GitHub Actions falhar

A tag `v0.6.1` já existe no GitHub. O workflow de 1º de novembro de 2026 passou nos testes e falhou só em `npm publish`. Reenviar a mesma tag não dispara o workflow de novo.

Para publicar `0.6.1` depois de corrigir o acesso no npm:

1. Confirme em **Trusted Publishers** do pacote que o workflow é exatamente `release.yml`, no repositório `nandorip/react-viewer-doc`.
2. Uma configuração nova de Trusted Publisher expira se a primeira publicação não for concluída em 2 dias. Se a configuração de novembro expirou, apague e crie outra antes de publicar.
3. Na aba **Actions**, execute **Release & Publish to npm** em `main` (`workflow_dispatch`). Esse caminho usa o workflow atual e não exige uma tag nova.
4. A publicação usa OIDC. O secret `NPM_TOKEN` só entra se estiver preenchido. Com Trusted Publisher, a proveniência é gerada automaticamente; o comando não passa `--provenance`.

Publicação local continua disponível com `npm run release -- --otp=CODIGO` na conta `wipmob`.
