# Guia Simplificado de Publicação no npm

Este guia foi criado para tornar o processo de publicação do `react-viewer-doc` **rápido, direto e à prova de erros**, eliminando atritos com 2FA, OTP e permissões de conta.

---

## 1. Passo Inicial: Transferir ou Conceder Acesso a `nandorip`

O pacote `react-viewer-doc` foi originalmente criado pela conta `wipmob`. Para que o seu usuário **`nandorip`** possa publicar e gerenciar o pacote:

1. No seu navegador, certifique-se de estar conectado com a conta **`wipmob`**.
2. Acesse a página de controle de acesso do pacote:  
   👉 **[https://www.npmjs.com/package/react-viewer-doc/access](https://www.npmjs.com/package/react-viewer-doc/access)**
3. Em **Collaborators**, digite **`nandorip`** e clique em **Invite / Add**.
4. *(Opcional)* Se quiser que `nandorip` seja o único dono no futuro, você poderá remover o `wipmob` dessa mesma tela.

---

## 2. Método Recomendado: Publicação com 1 Clique via GitHub Actions

Este é o método mais simples e seguro. Uma vez configurado, você **nunca mais precisará de código OTP** e nem precisará usar o terminal para publicar.

### Configuração Única (Feita em 2 minutos):

1. **Gerar um Token de Automação no npm:**
   - No site do npm, conectado como **`nandorip`**:
   - Acesse: **[https://www.npmjs.com/settings/nandorip/tokens/create](https://www.npmjs.com/settings/nandorip/tokens/create)**
   - Selecione **Classic Token**.
   - Dê um nome (ex: `GitHub Actions Release`) e marque a opção **Automation** *(tokens de automação ignoram a exigência de 2FA/OTP)*.
   - Copie o token gerado (`npm_...`).

2. **Salvar o Token no Repositório do GitHub:**
   - Acesse seu repositório no GitHub: **[https://github.com/nandorip/react-viewer-doc/settings/secrets/actions](https://github.com/nandorip/react-viewer-doc/settings/secrets/actions)**
   - Clique em **New repository secret**.
   - Nome: `NPM_TOKEN`
   - Valor: Cole o token que você copiou no passo anterior.
   - Clique em **Add secret**.

### Como Publicar Qualquer Nova Versão:

Depois de salvar o segredo, você tem duas opções extremamente simples:

- **Pelo Navegador (Sem comandos):**
  1. Vá até a aba **[Actions](https://github.com/nandorip/react-viewer-doc/actions/workflows/release.yml)** no GitHub.
  2. Selecione **Release & Publish to npm**.
  3. Clique em **Run workflow** -> **Run workflow**.
  4. O GitHub executará os testes, o build e publicará no npm automaticamente!

- **Por Git Tag (Pelo terminal):**
  ```bash
  git tag v0.6.1
  git push origin v0.6.1
  ```
  *(O envio da tag dispara a publicação automática no npm).*

---

## 3. Método Alternativo: Publicação Local com o Script `release`

Se você preferir publicar diretamente pela sua máquina, criamos o comando `npm run release`:

```bash
npm run release
```

### O que este comando faz automaticamente:
1. Verifica se o repositório Git está limpo.
2. Executa a suíte de testes (`npm test`).
3. Compila a biblioteca em CommonJS (`dist/cjs`) e ESM (`dist/esm`).
4. Valida a integridade do pacote e todos os imports (`npm run check:package`).
5. Verifica se o usuário autenticado é o dono do pacote.
6. Publica no registro público e exibe a confirmação.

> **Se a sua conta exigir código de 2FA no terminal:**  
> Basta passar o código com `--otp`:
> ```bash
> npm run release -- --otp=SEU_CODIGO_DE_6_DIGITOS
> ```

---

## 4. Como Evitar Pedido de Código OTP no Terminal

Se você quiser rodar `npm publish` no seu computador sem que o npm peça código OTP:

1. Acesse: **[https://www.npmjs.com/settings/nandorip/tfa](https://www.npmjs.com/settings/nandorip/tfa)**
2. Em **2FA Mode**, altere de *"Authorization and writes"* para **"Authorization only"**.
3. Salve.
   *(Com essa configuração, o 2FA continuará protegendo o seu login, mas não bloqueará a publicação de pacotes).*

---

## 5. Verificação Pós-Publicação

Para conferir se uma versão foi publicada com sucesso e já está disponível globalmente:

```bash
npm view react-viewer-doc version dist-tags --json
```
