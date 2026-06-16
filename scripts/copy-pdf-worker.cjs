const fs = require('fs');
const path = require('path');

const source = path.join(
  __dirname,
  '..',
  'node_modules',
  'pdfjs-dist',
  'build',
  'pdf.worker.min.mjs',
);
const targetDir = path.join(__dirname, '..', 'example', 'public');
const target = path.join(targetDir, 'pdf.worker.min.mjs');

if (!fs.existsSync(source)) {
  console.error('pdfjs-dist worker not found. Run npm install first.');
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });
fs.copyFileSync(source, target);
console.log('Copied PDF worker to example/public/pdf.worker.min.mjs');