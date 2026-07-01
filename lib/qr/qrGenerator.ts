const GF_EXP = new Array(512).fill(0);
const GF_LOG = new Array(256).fill(0);

(function initGF() {
  let v = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = v;
    GF_LOG[v] = i;
    v = (v * 2) ^ (v >= 128 ? 0x11d : 0);
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
})();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function gfPow(n: number, k: number): number {
  return GF_EXP[(GF_LOG[n] * k) % 255];
}

function rsEncode(data: number[], eccCount: number): number[] {
  let gen: number[] = [1];
  for (let i = 0; i < eccCount; i++) {
    const term = [1, gfPow(2, i)];
    const result: number[] = [];
    for (let j = 0; j < gen.length + 1; j++) result[j] = 0;
    for (let j = 0; j < gen.length; j++) {
      result[j] ^= gen[j];
      result[j + 1] ^= gfMul(gen[j], term[1]);
    }
    gen = result;
  }
  const padded = [...data, ...new Array(eccCount).fill(0)];
  for (let i = 0; i < data.length; i++) {
    if (padded[i] !== 0) {
      const lead = GF_LOG[padded[i]];
      for (let j = 0; j < gen.length; j++) {
        padded[i + j] ^= gfMul(gen[j], GF_EXP[lead]);
      }
    }
  }
  return padded.slice(data.length);
}

const VERSION_PARAMS: Record<number, { total: number; data: number; ecc: number; blocks: number; cap: number }> = {
  1: { total: 26, data: 16, ecc: 10, blocks: 1, cap: 14 },
  2: { total: 44, data: 28, ecc: 16, blocks: 1, cap: 26 },
  3: { total: 70, data: 44, ecc: 26, blocks: 1, cap: 42 },
  4: { total: 100, data: 64, ecc: 36, blocks: 2, cap: 62 },
  5: { total: 134, data: 86, ecc: 48, blocks: 2, cap: 84 },
  6: { total: 172, data: 108, ecc: 64, blocks: 4, cap: 106 },
};

function selectVersion(dataBits: number): number {
  for (let v = 1; v <= 6; v++) {
    if (VERSION_PARAMS[v].cap * 8 >= dataBits) return v;
  }
  return 6;
}

function getSize(v: number): number {
  return 17 + v * 4;
}

function isFinder(m: boolean[][], r: number, c: number): boolean {
  const s = getSize(m.length);
  return (r < 9 && c < 9) || (r < 9 && c >= s - 8) || (r >= s - 8 && c < 9);
}

function placeFinder(m: boolean[][], row: number, col: number): void {
  for (let r = -1; r <= 7; r++) {
    for (let c = -1; c <= 7; c++) {
      if (row + r < 0 || row + r >= m.length || col + c < 0 || col + c >= m.length) continue;
      const outer = r === -1 || r === 7 || c === -1 || c === 7;
      const inner = (r >= 2 && r <= 4) && (c >= 2 && c <= 4) && (r <= 4 && c <= 4);
      const midH = (r === 0 || r === 6) && c >= 0 && c <= 6;
      const midV = (c === 0 || c === 6) && r >= 0 && r <= 6;
      const sep = (r === -1 || r === 7 || c === -1 || c === 7);
      if (outer || inner || midH || midV || sep) {
        m[row + r][col + c] = true;
      }
    }
  }
}

function placeTiming(m: boolean[][]): void {
  const s = m.length;
  for (let i = 8; i < s - 8; i++) {
    m[6][i] = i % 2 === 0;
    m[i][6] = i % 2 === 0;
  }
}

function placeDarkModule(m: boolean[][]): void {
  m[m.length - 8][8] = true;
}

function placeFormatInfo(m: boolean[][], mask: number): void {
  const s = m.length;
  const eccBits = 0b10; // M
  const data = (eccBits << 3) | mask;
  let bch = data << 10;
  const genPoly = 0b10100110111;
  for (let i = 14; i >= 10; i--) {
    if ((bch >> i) & 1) bch ^= genPoly << (i - 10);
  }
  const codeword = ((data << 10) | bch) ^ 0b101010000010010;
  for (let i = 0; i <= 5; i++) m[8][i] = ((codeword >> (14 - i)) & 1) === 1;
  m[8][7] = ((codeword >> 8) & 1) === 1;
  m[8][8] = ((codeword >> 7) & 1) === 1;
  m[7][8] = ((codeword >> 6) & 1) === 1;
  for (let i = 9; i <= 14; i++) m[8][i] = ((codeword >> (14 - i)) & 1) === 1;
  for (let i = 0; i <= 7; i++) m[s - 1 - i][8] = ((codeword >> i) & 1) === 1;
  m[s - 8][8] = ((codeword >> 8) & 1) === 1;
  for (let i = 0; i <= 5; i++) m[8][s - 1 - i] = ((codeword >> i) & 1) === 1;
}

function applyMask(m: boolean[][], mask: number): void {
  const s = m.length;
  for (let r = 0; r < s; r++) {
    for (let c = 0; c < s; c++) {
      if (m[r][c] || isFinder(m, r, c)) continue;
      let invert = false;
      switch (mask) {
        case 0: invert = (r + c) % 2 === 0; break;
        case 1: invert = r % 2 === 0; break;
        case 2: invert = c % 3 === 0; break;
        case 3: invert = (r + c) % 3 === 0; break;
        case 4: invert = (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0; break;
        case 5: invert = (r * c) % 2 + (r * c) % 3 === 0; break;
        case 6: invert = ((r * c) % 2 + (r * c) % 3) % 2 === 0; break;
        case 7: invert = ((r + c) % 2 + (r * c) % 3) % 2 === 0; break;
      }
      if (invert) m[r][c] = !m[r][c];
    }
  }
}

function chooseMask(m: boolean[][], bits: boolean[][]): number {
  let best = 0;
  let bestScore = Infinity;
  const s = m.length;
  for (let mask = 0; mask < 8; mask++) {
    const test = bits.map((row) => [...row]);
    applyMask(test, mask);
    let score = 0;
    for (let r = 0; r < s; r++) {
      let run = 0;
      for (let c = 0; c < s; c++) {
        if (test[r][c]) run++; else { if (run >= 5) score += run; run = 0; }
      }
      if (run >= 5) score += run;
    }
    if (score < bestScore) { bestScore = score; best = mask; }
  }
  return best;
}

export function generateQrMatrix(text: string): { matrix: boolean[][]; version: number } {
  const bytes: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const cp = text.codePointAt(i)!;
    if (cp < 128) bytes.push(cp);
    else if (cp < 0x800) {
      bytes.push(0xc0 | (cp >> 6), 0x80 | (cp & 0x3f));
    } else {
      bytes.push(0xe0 | (cp >> 12), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f));
    }
  }

  const dataBits = 4 + 8 + bytes.length * 8;
  const version = selectVersion(dataBits);
  const params = VERSION_PARAMS[version];

  const modeBytes = [0b0100, bytes.length];
  const allData: number[] = [];
  for (const b of modeBytes) allData.push(b);
  for (const b of bytes) allData.push(b);
  while (allData.length < params.data) {
    if (allData.length < params.data) allData.push(0xec);
    if (allData.length < params.data) allData.push(0x11);
  }

  const blockSize = Math.floor(params.data / params.blocks);
  const eccBlocks: number[] = [];
  for (let b = 0; b < params.blocks; b++) {
    const start = b * blockSize;
    const block = allData.slice(start, start + blockSize);
    const ecc = rsEncode(block, params.ecc / params.blocks);
    eccBlocks.push(...ecc);
  }
  const interleaved: number[] = [];
  for (let i = 0; i < blockSize; i++) {
    for (let b = 0; b < params.blocks; b++) {
      interleaved.push(allData[b * blockSize + i]);
    }
  }
  interleaved.push(...eccBlocks);

  const bits: boolean[] = [];
  for (const v of interleaved) {
    for (let i = 7; i >= 0; i--) bits.push(((v >> i) & 1) === 1);
  }

  const s = getSize(version);
  const matrix: boolean[][] = Array.from({ length: s }, () => new Array(s).fill(false));

  placeFinder(matrix, 0, 0);
  placeFinder(matrix, 0, s - 8);
  placeFinder(matrix, s - 8, 0);
  placeTiming(matrix);
  placeDarkModule(matrix);

  let bitIdx = 0;
  let dir = -1;
  for (let col = s - 1; col > 0; col -= 2) {
    if (col === 6) col = 5;
    dir = -dir;
    for (let row = dir === 1 ? 0 : s - 1; row >= 0 && row < s; row += dir) {
      for (const dc of [col, col - 1]) {
        if (dc < 0 || dc >= s) continue;
        if (matrix[row][dc]) continue;
        if (isFinder(matrix, row, dc)) continue;
        if (row === 6) continue;
        if (bitIdx < bits.length) matrix[row][dc] = bits[bitIdx++];
      }
    }
  }

  const bestMask = chooseMask(matrix, matrix.map((r) => [...r]));
  applyMask(matrix, bestMask);
  placeFormatInfo(matrix, bestMask);

  return { matrix, version };
}

export function drawQrToCanvas(
  canvas: HTMLCanvasElement,
  matrix: boolean[][],
  size: number
): void {
  const s = matrix.length;
  const scale = Math.floor(size / (s + 8));
  const totalPx = s * scale;
  const offset = Math.floor((size - totalPx) / 2);
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#000000";
  for (let r = 0; r < s; r++) {
    for (let c = 0; c < s; c++) {
      if (matrix[r][c]) {
        ctx.fillRect(offset + c * scale, offset + r * scale, scale, scale);
      }
    }
  }
}

export async function qrToPngBlob(
  matrix: boolean[][],
  size: number
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  drawQrToCanvas(canvas, matrix, size);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to create PNG"));
    }, "image/png");
  });
}
