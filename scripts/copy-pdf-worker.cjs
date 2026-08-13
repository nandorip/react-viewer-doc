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
if (!fs.existsSync(source)) {
  console.error('pdfjs-dist worker not found. Run npm install first.');
  process.exit(1);
}

const destinations = process.argv.slice(2);
if (destinations.length === 0) {
  destinations.push(path.join('example', 'public'));
}

for (const dest of destinations) {
  const targetDir = path.isAbsolute(dest) ? dest : path.join(__dirname, '..', dest);
  const target = path.join(targetDir, 'pdf.worker.min.mjs');
  fs.mkdirSync(targetDir, { recursive: true });
  fs.copyFileSync(source, target);
  console.log(`Copied PDF worker to ${path.relative(path.join(__dirname, '..'), target)}`);
}