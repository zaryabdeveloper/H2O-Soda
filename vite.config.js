import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Helper to auto-generate framesManifest
function ensureFramesManifest() {
  const rootDir = resolve(import.meta.dirname);
  const framesDir = resolve(rootDir, 'Frames');
  const outputDir = resolve(rootDir, 'src', 'data');
  if (fs.existsSync(framesDir)) {
    const files = fs.readdirSync(framesDir);
    const frameFiles = files
      .filter(file => /^frame_\d+\.(png|jpg|jpeg|webp)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.match(/^frame_(\d+)/i)[1], 10);
        const numB = parseInt(b.match(/^frame_(\d+)/i)[1], 10);
        return numA - numB;
      });

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const manifestContent = `// Auto-generated frame manifest
export const FRAME_LIST = ${JSON.stringify(frameFiles, null, 2)};
export const FRAME_COUNT = ${frameFiles.length};
const _rawBase = import.meta.env.BASE_URL || './';
const _cleanBase = _rawBase.endsWith('/') ? _rawBase : _rawBase + '/';
export const FRAME_PREFIX = \`\${_cleanBase}Frames/\`;

export function getFrameUrl(index) {
  const safeIndex = Math.max(0, Math.min(index, FRAME_COUNT - 1));
  return \`\${FRAME_PREFIX}\${FRAME_LIST[safeIndex]}\`;
}

export default {
  frames: FRAME_LIST,
  count: FRAME_COUNT,
  prefix: FRAME_PREFIX,
  getFrameUrl
};
`;
    fs.writeFileSync(resolve(outputDir, 'framesManifest.js'), manifestContent, 'utf-8');
  }
}

ensureFramesManifest();

function framesPlugin() {
  return {
    name: 'frames-middleware-and-copy',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = decodeURIComponent(req.url || '');
        if (url.includes('/Frames/') || url.includes('/frames/')) {
          const fileName = url.split('/').pop()?.split('?')[0];
          const filePath = resolve(import.meta.dirname, 'Frames', fileName || '');
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });
    },
    closeBundle() {
      const distFrames = resolve(import.meta.dirname, 'dist', 'Frames');
      const srcFrames = resolve(import.meta.dirname, 'Frames');
      if (fs.existsSync(srcFrames)) {
        if (!fs.existsSync(distFrames)) {
          fs.mkdirSync(distFrames, { recursive: true });
        }
        const files = fs.readdirSync(srcFrames);
        for (const file of files) {
          fs.copyFileSync(resolve(srcFrames, file), resolve(distFrames, file));
        }
        console.log(`Copied ${files.length} frames to dist/Frames`);
      }
    }
  };
}

export default defineConfig({
  base: './', // CRITICAL for GitHub Pages subfolder hosting
  root: '.',
  publicDir: 'public',
  plugins: [framesPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: false,
    host: true,
  },
});
