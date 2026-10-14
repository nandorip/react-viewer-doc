const UTIF = require('utif2');
const fs = require('fs');
const path = require('path');

const samplesDir = path.join(__dirname, '..', 'example', 'samples');
if (!fs.existsSync(samplesDir)) {
  fs.mkdirSync(samplesDir, { recursive: true });
}

function createPatternPage(w, h, baseR, baseG, baseB) {
  const data = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const isGrid = (x % 30 === 0) || (y % 30 === 0) || (x < 6) || (x > w - 6) || (y < 6) || (y > h - 6);
      if (isGrid) {
        data[idx] = Math.min(255, baseR + 60);
        data[idx + 1] = Math.min(255, baseG + 60);
        data[idx + 2] = Math.min(255, baseB + 60);
      } else {
        data[idx] = baseR;
        data[idx + 1] = baseG;
        data[idx + 2] = baseB;
      }
      data[idx + 3] = 255;
    }
  }
  return { w, h, data };
}

// 3 pages: 1 = Amber/Gold, 2 = Emerald/Green, 3 = Indigo/Blue
const p1 = createPatternPage(300, 200, 217, 119, 6);
const p2 = createPatternPage(300, 200, 16, 185, 129);
const p3 = createPatternPage(300, 200, 99, 102, 241);

const offsetP1 = 3000;
const ifd1 = {
  t256: [p1.w], t257: [p1.h], t258: [8, 8, 8, 8], t259: [1], t262: [2],
  t273: [offsetP1], t277: [4], t278: [p1.h], t279: [p1.w * p1.h * 4],
  t282: [[72, 1]], t283: [[72, 1]], t284: [1], t296: [1]
};

const offsetP2 = offsetP1 + p1.w * p1.h * 4;
const ifd2 = {
  t256: [p2.w], t257: [p2.h], t258: [8, 8, 8, 8], t259: [1], t262: [2],
  t273: [offsetP2], t277: [4], t278: [p2.h], t279: [p2.w * p2.h * 4],
  t282: [[72, 1]], t283: [[72, 1]], t284: [1], t296: [1]
};

const offsetP3 = offsetP2 + p2.w * p2.h * 4;
const ifd3 = {
  t256: [p3.w], t257: [p3.h], t258: [8, 8, 8, 8], t259: [1], t262: [2],
  t273: [offsetP3], t277: [4], t278: [p3.h], t279: [p3.w * p3.h * 4],
  t282: [[72, 1]], t283: [[72, 1]], t284: [1], t296: [1]
};

const headerBuf = Buffer.from(UTIF.encode([ifd1, ifd2, ifd3]));
const totalSize = offsetP3 + p3.w * p3.h * 4;
const fileBuf = Buffer.alloc(totalSize);

headerBuf.copy(fileBuf, 0);
Buffer.from(p1.data.buffer).copy(fileBuf, offsetP1);
Buffer.from(p2.data.buffer).copy(fileBuf, offsetP2);
Buffer.from(p3.data.buffer).copy(fileBuf, offsetP3);

const tiffPath = path.join(samplesDir, 'multipage.tiff');
fs.writeFileSync(tiffPath, fileBuf);
console.log('Created:', tiffPath, `(${fileBuf.length} bytes, 3 pages)`);

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#0f172a" rx="16"/>
  <circle cx="300" cy="200" r="110" fill="url(#grad)" opacity="0.85"/>
  <rect x="180" y="130" width="240" height="140" rx="12" fill="#ffffff" opacity="0.95"/>
  <text x="300" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#1e293b">react-viewer-doc</text>
  <text x="300" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="14" text-anchor="middle" fill="#64748b">SVG Vector Sample</text>
</svg>
`;

const svgPath = path.join(samplesDir, 'vector.svg');
fs.writeFileSync(svgPath, svgContent);
console.log('Created:', svgPath);
