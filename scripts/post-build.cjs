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
