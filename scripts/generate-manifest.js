import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const framesDir = path.resolve(rootDir, 'Frames');
const outputDir = path.resolve(rootDir, 'src', 'data');

if (!fs.existsSync(framesDir)) {
  console.error('Frames directory not found at', framesDir);
  process.exit(1);
}

const files = fs.readdirSync(framesDir);
// Find files like frame_000001.png or frame_1.png
const frameFiles = files
  .filter(file => /^frame_\d+\.(png|jpg|jpeg|webp)$/i.test(file))
  .sort((a, b) => {
    const numA = parseInt(a.match(/^frame_(\d+)/i)[1], 10);
    const numB = parseInt(b.match(/^frame_(\d+)/i)[1], 10);
    return numA - numB;
  });

console.log(`Found ${frameFiles.length} frames in ${framesDir}`);
console.log(`First frame: ${frameFiles[0]}`);
console.log(`Last frame: ${frameFiles[frameFiles.length - 1]}`);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const manifestContent = `// Auto-generated frame manifest
// Automatically detects all frame assets preserving chronological order

export const FRAME_LIST = ${JSON.stringify(frameFiles, null, 2)};
export const FRAME_COUNT = ${frameFiles.length};
export const FRAME_PREFIX = '/Frames/';

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

const outputPath = path.resolve(outputDir, 'framesManifest.js');
fs.writeFileSync(outputPath, manifestContent, 'utf-8');
console.log(`Successfully generated manifest at ${outputPath}`);
