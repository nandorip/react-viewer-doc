const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

// Create package.json in dist/cjs
const cjsDir = path.join(distDir, 'cjs');
if (fs.existsSync(cjsDir)) {
  fs.writeFileSync(
    path.join(cjsDir, 'package.json'),
    JSON.stringify({ type: 'commonjs' }, null, 2)
  );
  console.log('Created dist/cjs/package.json');
}

// Create package.json in dist/esm
const esmDir = path.join(distDir, 'esm');
if (fs.existsSync(esmDir)) {
  fs.writeFileSync(
    path.join(esmDir, 'package.json'),
    JSON.stringify({ type: 'module' }, null, 2)
  );
  console.log('Created dist/esm/package.json');
}

// TypeScript preserves extensionless imports with Bundler resolution. Emit explicit
// file paths in both JS and declarations so ESM-aware tools can resolve them.
function fixEsmImports(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) fixEsmImports(file);
    else if (entry.name.endsWith('.js') || entry.name.endsWith('.d.ts')) {
      const source = fs.readFileSync(file, 'utf8');
      const output = source.replace(/(from\s+|import\s*)(['"])(\.[^'"]+)\2/g, (match, prefix, quote, specifier) => {
        const target = path.resolve(path.dirname(file), specifier);
        let resolved = specifier;
        if (fs.existsSync(target + '.js')) resolved += '.js';
        else if (fs.existsSync(path.join(target, 'index.js'))) resolved += '/index.js';
        return prefix + quote + resolved + quote;
      });
      if (source !== output) fs.writeFileSync(file, output);
    }
  }
}
if (fs.existsSync(esmDir)) fixEsmImports(esmDir);
