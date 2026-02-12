const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const blocked = ['next.config.ts', 'next.config.mts', 'next.config.cts'];

for (const file of blocked) {
  const fullPath = path.join(root, file);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.warn(`[prebuild] Removed unsupported Next config file: ${file}`);
  }
}

const jsConfig = path.join(root, 'next.config.js');
if (!fs.existsSync(jsConfig)) {
  console.error('[prebuild] Missing next.config.js. Build requires next.config.js in this repo.');
  process.exit(1);
}

console.log('[prebuild] Next config check passed. Using next.config.js');
