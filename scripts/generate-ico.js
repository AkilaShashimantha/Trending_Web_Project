const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + len);
  return chunk;
}

function createPng(width, height, getPixel) {
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      const pxOffset = rowOffset + 1 + x * 4;
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }
  const compressed = zlib.deflateSync(rawData);

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdr = makeChunk('IHDR', ihdrData);
  const idat = makeChunk('IDAT', compressed);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function createIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(numImages, 4);

  let offset = 6 + numImages * 16;
  const directoryEntries = [];

  for (const { width, height, data } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    directoryEntries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...directoryEntries, ...pngBuffers.map(p => p.data)]);
}

// Generate pixel for TaxEstimator Online TE icon
// Spruce: [15, 56, 44]
// Emerald: [16, 185, 129]
// Amber: [245, 158, 11]
function renderPixel(x, y, w, h, solidBackground = false) {
  // Normalize coordinates to 0..1
  const nx = (x + 0.5) / w;
  const ny = (y + 0.5) / h;

  // Squircle rounded corners (only for transparent-capable icons, not Apple touch icons)
  if (!solidBackground) {
    const cx = Math.abs(nx - 0.5) * 2;
    const cy = Math.abs(ny - 0.5) * 2;
    // Corner radius roughly 0.22 of size
    if (cx > 0.6 && cy > 0.6) {
      const cornerDist = Math.hypot(cx - 0.6, cy - 0.6);
      if (cornerDist > 0.4) {
        return [0, 0, 0, 0]; // Transparent outside
      }
    }
  }

  // Base background: Spruce gradient
  let r = 15 + Math.round((1 - ny) * 8);
  let g = 56 + Math.round((1 - ny) * 16);
  let b = 44 + Math.round((1 - ny) * 12);
  let a = 255;

  // Brand accent dot at top right (nx around 0.82, ny around 0.2)
  const sparkDist = Math.hypot(nx - 0.82, ny - 0.2);
  if (sparkDist < 0.08) {
    return [245, 158, 11, 255]; // Amber spark
  }
  if (sparkDist < 0.13) {
    return [52, 211, 153, 255]; // Emerald glow
  }

  // Letter T (Emerald) in left half: nx in [0.16, 0.46], ny in [0.30, 0.70]
  const inTTop = nx >= 0.16 && nx <= 0.46 && ny >= 0.30 && ny <= 0.40;
  const inTStem = nx >= 0.26 && nx <= 0.36 && ny >= 0.30 && ny <= 0.70;
  if (inTTop || inTStem) {
    return [16, 185, 129, 255]; // EmeraldTactile 500
  }

  // Letter E (Amber) in right half: nx in [0.54, 0.82], ny in [0.30, 0.70]
  const inEStem = nx >= 0.54 && nx <= 0.64 && ny >= 0.30 && ny <= 0.70;
  const inETop = nx >= 0.54 && nx <= 0.82 && ny >= 0.30 && ny <= 0.40;
  const inEMid = nx >= 0.54 && nx <= 0.78 && ny >= 0.46 && ny <= 0.54;
  const inEBottom = nx >= 0.54 && nx <= 0.82 && ny >= 0.60 && ny <= 0.70;
  if (inEStem || inETop || inEMid || inEBottom) {
    return [245, 158, 11, 255]; // AmberWarm 500
  }

  // Subtle bottom rule line at ny around 0.80
  if (Math.abs(ny - 0.80) < 0.03 && nx >= 0.15 && nx <= 0.85) {
    return [5, 150, 105, 180];
  }

  return [r, g, b, a];
}

const renderPixelTransparent = (x, y, w, h) => renderPixel(x, y, w, h, false);
const renderPixelSolid = (x, y, w, h) => renderPixel(x, y, w, h, true);

const p16 = createPng(16, 16, renderPixelTransparent);
const p32 = createPng(32, 32, renderPixelTransparent);
const p48 = createPng(48, 48, renderPixelTransparent);

const icoBuffer = createIco([
  { width: 16, height: 16, data: p16 },
  { width: 32, height: 32, data: p32 },
  { width: 48, height: 48, data: p48 }
]);

const publicIcoPath = path.join(__dirname, '..', 'public', 'favicon.ico');
const appIcoPath = path.join(__dirname, '..', 'src', 'app', 'favicon.ico');

fs.writeFileSync(publicIcoPath, icoBuffer);
fs.writeFileSync(appIcoPath, icoBuffer);

// Apple Touch Icon (180x180, iOS requires solid background without transparent corners)
const appleIcon = createPng(180, 180, renderPixelSolid);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'apple-touch-icon.png'), appleIcon);
fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'apple-icon.png'), appleIcon);

// Android / PWA Icons (192x192, 512x512)
const p192 = createPng(192, 192, renderPixelTransparent);
const p512 = createPng(512, 512, renderPixelTransparent);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon-192.png'), p192);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon-512.png'), p512);

console.log('Successfully written favicon.ico, apple-touch-icon.png (180x180), icon-192.png, and icon-512.png');

