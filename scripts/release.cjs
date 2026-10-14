const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));

console.log(`\n========================================`);
console.log(`  Release Helper: ${pkg.name}@${pkg.version}`);
console.log(`========================================\n`);

function run(cmd, desc) {
  console.log(`▶ ${desc || cmd}...`);
  try {
    execSync(cmd, { cwd: rootDir, stdio: 'inherit' });
    console.log(`✓ ${desc || cmd} OK\n`);
  } catch (error) {
    console.error(`\n❌ Falha em: ${desc || cmd}`);
    process.exit(1);
  }
}

// 1. Check Git status
try {
  const status = execSync('git status --porcelain', { cwd: rootDir }).toString().trim();
  if (status) {
    console.warn(`⚠️  Atenção: existem arquivos não commitados no repositório:\n${status}\n`);
  } else {
    console.log(`✓ Repositório Git limpo.`);
  }
} catch {
  // git not available or outside repo
}

// 2. Run Tests, Build and Package Check
run('npm test -- --runInBand', 'Executando testes unitários');
run('npm run build:lib', 'Compilando biblioteca (CJS e ESM)');
run('npm run check:package', 'Validando estrutura e imports do pacote');

// 3. Check npm whoami
let currentUser = null;
try {
  currentUser = execSync('npm whoami', { cwd: rootDir }).toString().trim();
  console.log(`✓ Usuário autenticado no npm: "${currentUser}"`);
} catch {
  console.error(`\n❌ Você não está autenticado no npm.`);
  console.error(`   Execute primeiro: npm login\n`);
  process.exit(1);
}

// 4. Pass additional arguments (e.g. --otp=XXXXXX) to npm publish
const args = process.argv.slice(2).join(' ');
const publishCmd = `npm publish --access public ${args}`.trim();

console.log(`▶ Publicando pacote no registro do npm:`);
console.log(`  Comando: ${publishCmd}\n`);

try {
  execSync(publishCmd, { cwd: rootDir, stdio: 'inherit' });
  console.log(`\n🎉 Publicação da versão ${pkg.version} concluída com sucesso!`);
  try {
    execSync(`npm view ${pkg.name} version dist-tags --json`, { cwd: rootDir, stdio: 'inherit' });
  } catch {}
} catch (error) {
  console.error(`\n❌ Erro ao publicar no npm.`);
  console.error(`Dicas:`);
  console.error(`  1. Verifique se o usuário "${currentUser}" é proprietário ou colaborador do pacote.`);
  console.error(`  2. Se a sua conta exigir 2FA no terminal, use: npm run release -- --otp=SEU_CODIGO`);
  console.error(`  3. Ou consulte o arquivo PUBLISHING.md para publicar com 1 clique via GitHub Actions.\n`);
  process.exit(1);
}
