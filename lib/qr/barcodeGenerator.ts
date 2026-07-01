const CODE128B_ENCODINGS: Record<number, number[]> = {
  0: [2, 1, 2, 2, 2, 2], 1: [2, 2, 2, 1, 2, 2],
  2: [2, 2, 2, 2, 2, 1], 3: [1, 2, 1, 2, 2, 3],
  4: [1, 2, 1, 3, 2, 2], 5: [1, 3, 1, 2, 2, 2],
  6: [1, 2, 2, 2, 1, 3], 7: [1, 2, 2, 3, 1, 2],
  8: [1, 3, 2, 2, 1, 2], 9: [2, 2, 1, 2, 1, 3],
  10: [2, 2, 1, 3, 1, 2], 11: [2, 3, 1, 2, 1, 2],
  12: [1, 1, 2, 2, 3, 2], 13: [1, 2, 2, 1, 3, 2],
  14: [1, 2, 2, 2, 3, 1], 15: [1, 1, 3, 2, 2, 2],
  16: [1, 2, 3, 1, 2, 2], 17: [1, 2, 3, 2, 2, 1],
  18: [2, 2, 3, 2, 1, 1], 19: [2, 2, 1, 1, 3, 2],
  20: [2, 2, 1, 2, 3, 1], 21: [2, 1, 3, 2, 1, 2],
  22: [2, 2, 3, 1, 1, 2], 23: [3, 1, 2, 1, 3, 1],
  24: [3, 1, 1, 2, 2, 2], 25: [3, 2, 1, 1, 2, 2],
  26: [3, 2, 1, 2, 2, 1], 27: [3, 1, 2, 2, 1, 2],
  28: [3, 2, 2, 1, 1, 2], 29: [3, 2, 2, 2, 1, 1],
  30: [2, 1, 2, 1, 2, 3], 31: [2, 1, 2, 3, 2, 1],
  32: [2, 3, 2, 1, 2, 1], 33: [1, 1, 1, 3, 2, 3],
  34: [1, 3, 1, 1, 2, 3], 35: [1, 3, 1, 3, 2, 1],
  36: [1, 1, 2, 3, 1, 3], 37: [1, 3, 2, 1, 1, 3],
  38: [1, 3, 2, 3, 1, 1], 39: [2, 1, 1, 3, 1, 3],
  40: [2, 3, 1, 1, 1, 3], 41: [2, 3, 1, 3, 1, 1],
  42: [1, 1, 2, 1, 3, 3], 43: [1, 1, 2, 3, 3, 1],
  44: [1, 3, 2, 1, 3, 1], 45: [1, 1, 3, 1, 2, 3],
  46: [1, 1, 3, 3, 2, 1], 47: [1, 3, 3, 1, 2, 1],
  48: [3, 1, 3, 1, 2, 1], 49: [2, 1, 1, 3, 3, 1],
  50: [2, 3, 1, 1, 3, 1], 51: [2, 1, 3, 1, 1, 3],
  52: [2, 1, 3, 3, 1, 1], 53: [2, 1, 3, 1, 3, 1],
  54: [3, 1, 1, 1, 2, 3], 55: [3, 1, 1, 3, 2, 1],
  56: [3, 3, 1, 1, 2, 1], 57: [3, 1, 2, 1, 1, 3],
  58: [3, 1, 2, 3, 1, 1], 59: [3, 3, 2, 1, 1, 1],
  60: [3, 1, 4, 1, 1, 1], 61: [2, 2, 1, 4, 1, 1],
  62: [4, 3, 1, 1, 1, 1], 63: [1, 1, 1, 2, 2, 4],
  64: [1, 1, 1, 4, 2, 2], 65: [1, 2, 1, 1, 2, 4],
  66: [1, 2, 1, 4, 2, 1], 67: [1, 4, 1, 1, 2, 2],
  68: [1, 4, 1, 2, 2, 1], 69: [1, 1, 2, 2, 1, 4],
  70: [1, 1, 2, 4, 1, 2], 71: [1, 2, 2, 1, 1, 4],
  72: [1, 2, 2, 4, 1, 1], 73: [1, 4, 2, 1, 1, 2],
  74: [1, 4, 2, 2, 1, 1], 75: [2, 4, 1, 2, 1, 1],
  76: [2, 2, 1, 1, 1, 4], 77: [4, 1, 3, 1, 1, 1],
  78: [2, 4, 1, 1, 1, 2], 79: [1, 3, 4, 1, 1, 1],
  80: [1, 1, 1, 2, 4, 2], 81: [1, 2, 1, 1, 4, 2],
  82: [1, 2, 1, 2, 4, 1], 83: [1, 1, 4, 2, 1, 2],
  84: [1, 2, 4, 1, 1, 2], 85: [1, 2, 4, 2, 1, 1],
  86: [4, 1, 1, 2, 1, 2], 87: [4, 2, 1, 1, 1, 2],
  88: [4, 2, 1, 2, 1, 1], 89: [2, 1, 2, 1, 4, 1],
  90: [2, 1, 4, 1, 2, 1], 91: [4, 1, 2, 1, 2, 1],
  92: [1, 1, 1, 1, 4, 3], 93: [1, 1, 1, 3, 4, 1],
  94: [1, 3, 1, 1, 4, 1], 95: [1, 1, 4, 1, 1, 3],
  96: [1, 1, 4, 3, 1, 1], 97: [4, 1, 1, 1, 1, 3],
  98: [4, 1, 1, 3, 1, 1], 99: [1, 1, 3, 1, 4, 1],
  100: [1, 1, 4, 1, 3, 1], 101: [3, 1, 1, 1, 4, 1],
  102: [4, 1, 1, 1, 3, 1], 103: [2, 1, 1, 1, 2, 1, 2, 1],
  104: [2, 1, 1, 1, 1, 2, 1, 2], 105: [2, 1, 1, 1, 2, 1, 1, 2],
};

const START_B = 104;
const STOP = 106; // special: +2 stop pattern

export function generateCode128Barcode(text: string): {
  bars: boolean[];
  text: string;
} {
  const values: number[] = [START_B];
  for (let i = 0; i < text.length; i++) {
    const cp = text.charCodeAt(i);
    if (cp >= 32 && cp <= 126) {
      values.push(cp - 32);
    } else {
      values.push(0); // replace unsupported with space
    }
  }

  let checksum = values[0];
  for (let i = 1; i < values.length; i++) {
    checksum += values[i] * i;
  }
  checksum %= 103;
  values.push(checksum);

  const bars: boolean[] = [];
  for (const v of values) {
    const enc = CODE128B_ENCODINGS[v];
    if (!enc) continue;
    for (const module of enc) {
      for (let i = 0; i < module; i++) {
        bars.push(bars.length % 2 === 0);
      }
    }
  }
  // Stop pattern (four bars + one light + one dark)
  const stopPattern = [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1];
  for (const module of stopPattern) {
    for (let i = 0; i < module; i++) {
      bars.push(bars.length % 2 === 0);
    }
  }

  return { bars, text };
}

export function drawBarcodeToCanvas(
  canvas: HTMLCanvasElement,
  bars: boolean[],
  width: number,
  height: number
): void {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const moduleWidth = Math.floor((width - 20) / bars.length);
  const actualWidth = moduleWidth * bars.length;
  const offset = Math.floor((width - actualWidth) / 2);

  ctx.fillStyle = "#000000";
  for (let i = 0; i < bars.length; i++) {
    if (bars[i]) {
      ctx.fillRect(offset + i * moduleWidth, 10, moduleWidth, height - 20);
    }
  }
}

export async function barcodeToPngBlob(
  bars: boolean[],
  width: number,
  height: number
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  drawBarcodeToCanvas(canvas, bars, width, height);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to create PNG"));
    }, "image/png");
  });
}
