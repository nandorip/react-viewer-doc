const fs = require('fs');
const path = require('path');

const targets = [
  path.join(__dirname, '..', 'dist'),
  path.join(__dirname, '..', 'example', 'dist'),
];

for (const target of targets) {
  fs.rmSync(target, { recursive: true, force: true });
}
