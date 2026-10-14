const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const pkgPath = path.join(rootDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

console.log(`Checking package: ${pkg.name}@${pkg.version}`);

let errors = [];

function checkFileExists(relPath, label) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing ${label || 'file'}: ${relPath}`);
    return false;
  }
  return true;
}

// 1. Check root files defined in package.json
for (const file of pkg.files || []) {
  checkFileExists(file, 'package.json "files" entry');
}

// 2. Check main, module, types
checkFileExists(pkg.main, 'main');
checkFileExists(pkg.module, 'module');
checkFileExists(pkg.types, 'types');

// 3. Check exports map
if (pkg.exports && pkg.exports['.']) {
  const exp = pkg.exports['.'];
  if (exp.types) checkFileExists(exp.types, 'exports["."].types');
  if (exp.import) checkFileExists(exp.import, 'exports["."].import');
  if (exp.require) checkFileExists(exp.require, 'exports["."].require');
  if (exp.default) checkFileExists(exp.default, 'exports["."].default');
} else {
  errors.push('Missing exports["."] in package.json');
}

// 4. Check dist/cjs and dist/esm package.json
const cjsPkg = path.join(rootDir, 'dist', 'cjs', 'package.json');
if (fs.existsSync(cjsPkg)) {
  const data = JSON.parse(fs.readFileSync(cjsPkg, 'utf8'));
  if (data.type !== 'commonjs') {
    errors.push(`Expected dist/cjs/package.json to have type: "commonjs", found "${data.type}"`);
  }
} else {
  errors.push('Missing dist/cjs/package.json');
}

const esmPkg = path.join(rootDir, 'dist', 'esm', 'package.json');
if (fs.existsSync(esmPkg)) {
  const data = JSON.parse(fs.readFileSync(esmPkg, 'utf8'));
  if (data.type !== 'module') {
    errors.push(`Expected dist/esm/package.json to have type: "module", found "${data.type}"`);
  }
} else {
  errors.push('Missing dist/esm/package.json');
}

// 5. Check 'use client' in ESM entry
const esmEntry = path.join(rootDir, 'dist', 'esm', 'index.js');
if (fs.existsSync(esmEntry)) {
  const content = fs.readFileSync(esmEntry, 'utf8');
  if (!content.includes("'use client'")) {
    errors.push("dist/esm/index.js is missing 'use client' directive");
  }
}

// 6. Check that all relative imports in dist/esm resolve to actual files
function verifyEsmDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      verifyEsmDirectory(full);
    } else if (entry.name.endsWith('.js') || entry.name.endsWith('.d.ts')) {
      const source = fs.readFileSync(full, 'utf8');
      const importRegex = /(?:from\s+|import\s*)(['"])(\.[^'"]+)\1/g;
      let match;
      while ((match = importRegex.exec(source)) !== null) {
        const specifier = match[2];
        const target = path.resolve(path.dirname(full), specifier);
        if (!fs.existsSync(target)) {
          errors.push(`Broken import in ${path.relative(rootDir, full)}: "${specifier}" target not found at ${path.relative(rootDir, target)}`);
        }
      }
    }
  }
}
verifyEsmDirectory(path.join(rootDir, 'dist', 'esm'));

// 7. Verify exported symbols in declarations
const requiredSymbols = [
  'ReactViewerDoc',
  'ReactDocumentViewer',
  'ViewerCanvas',
  'useViewerCore',
  'DEFAULT_PDF_WORKER_SRC',
  'PDFJS_VERSION',
];

for (const dts of ['dist/cjs/index.d.ts', 'dist/esm/index.d.ts']) {
  const full = path.join(rootDir, dts);
  if (fs.existsSync(full)) {
    const text = fs.readFileSync(full, 'utf8');
    for (const sym of requiredSymbols) {
      if (!text.includes(sym)) {
        errors.push(`Missing symbol "${sym}" in ${dts}`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error('\nPackage validation failed with errors:');
  errors.forEach(err => console.error(`  - ${err}`));
  process.exit(1);
}

console.log('✓ All package checks passed successfully!');
