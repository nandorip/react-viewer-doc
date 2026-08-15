import * as esbuild from 'esbuild';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outdir = join(root, 'example', 'dist');
const production = process.argv.includes('--production');
const workerSource = join(root, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');

if (!existsSync(workerSource)) {
  console.error('pdfjs-dist worker not found. Run npm install first.');
  process.exit(1);
}

mkdirSync(outdir, { recursive: true });
copyFileSync(join(root, 'example', 'index.html'), join(outdir, 'index.html'));
copyFileSync(workerSource, join(outdir, 'pdf.worker.min.mjs'));

const cssInjectPlugin = {
  name: 'css-inject',
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const css = await import('node:fs/promises').then((fs) => fs.readFile(args.path, 'utf8'));
      return {
        contents: `
          if (typeof document !== 'undefined') {
            const style = document.createElement('style');
            style.textContent = ${JSON.stringify(css)};
            document.head.appendChild(style);
          }
        `,
        loader: 'js',
      };
    });
  },
};

const options = {
  entryPoints: [join(root, 'example', 'index.js')],
  bundle: true,
  outfile: join(outdir, 'bundle.js'),
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
  alias: {
    'react-viewer-doc': join(root, 'src', 'index.ts'),
  },
  plugins: [cssInjectPlugin],
  minify: production,
  sourcemap: !production,
  logLevel: 'info',
};

if (production) {
  await esbuild.build(options);
} else {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  const { host, port } = await ctx.serve({
    servedir: outdir,
    host: '127.0.0.1',
    port: 3001,
  });
  console.log(`Demo: http://${host}:${port}`);
}
