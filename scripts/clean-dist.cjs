const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
  console.log('dist/ cleaned');
} else {
  console.log('dist/ already empty');
}