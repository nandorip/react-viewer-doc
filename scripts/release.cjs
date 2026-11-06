const { execFileSync, execSync } = require('child_process');
const { readFileSync } = require('fs');
const { join } = require('path');

const root = join(__dirname, '..');
const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const version = manifest.version;

function run(command) {
  execSync(command, { cwd: root, stdio: 'inherit' });
}

function capture(command) {
  try {
    return execSync(command, {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
  } catch {
    return null;
  }
}

console.log(`\nIniciando preparação de release para ${manifest.name}@${version}\n`);

const currentUser = capture('npm whoami');
if (!currentUser) {
  console.error('Você não está autenticado no npm. Execute `npm login` antes de continuar.');
  process.exit(1);
}

console.log(`Usuário npm conectado: ${currentUser}`);
if (currentUser !== 'wipmob' && currentUser !== 'nandorip') {
  console.warn(`Aviso: o pacote pertence a wipmob. Seu usuário é ${currentUser}.`);
}

const publishedVersion = capture(`npm view ${manifest.name}@${version} version`);
if (publishedVersion === version) {
  console.error(`A versão ${version} já está publicada no npm. Atualize a versão no package.json primeiro.`);
  process.exit(1);
}

console.log('\nExecutando verificações (testes, build e pacote)...');
run('npm test -- --runInBand');
run('npm run build:lib');
run('npm run check:package');

const otpArg = process.argv.find((arg) => arg.startsWith('--otp=')) || '';
const otp = otpArg.slice('--otp='.length);
if (otpArg && !/^\d{6,8}$/.test(otp)) {
  console.error('OTP inválido: informe um código numérico de 6 a 8 dígitos.');
  process.exit(1);
}

const publishArgs = ['publish', '--access', 'public', ...(otpArg ? [`--otp=${otp}`] : [])];
const npmCli = process.env.npm_execpath;
if (!npmCli) {
  console.error('Execute este script com `npm run release`.');
  process.exit(1);
}

console.log(`\nExecutando: npm publish --access public${otpArg ? ' --otp=<oculto>' : ''}`);
try {
  execFileSync(process.execPath, [npmCli, ...publishArgs], { cwd: root, stdio: 'inherit' });
  console.log(`\n${manifest.name}@${version} publicado com sucesso no npm.`);
} catch {
  console.error('\nFalha na publicação. Se for erro de 2FA, use: npm run release -- --otp=123456');
  process.exit(1);
}

const tag = `v${version}`;
const existingTag = capture(`git tag -l ${tag}`);
if (!existingTag) {
  console.log(`\nCriando tag ${tag}...`);
  try {
    run(`git tag ${tag}`);
    run(`git push origin ${tag}`);
    console.log(`Tag ${tag} enviada para o GitHub.`);
  } catch {
    console.warn(`Não foi possível enviar a tag ${tag} automaticamente.`);
  }
}

console.log('\nProcesso de release concluído.\n');
