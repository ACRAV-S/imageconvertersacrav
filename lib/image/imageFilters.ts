function clamp(value: number, min = 0, max = 255): number {
  return Math.min(max, Math.max(min, value));
}

async function toBlob(
  canvas: HTMLCanvasElement,
  format = "image/png",
  quality = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to create blob"));
      },
      format,
      quality
    );
  });
}

export async function adjustBrightness(
  source: HTMLImageElement,
  value: number
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = source.naturalWidth;
  canvas.height = source.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(source, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const v = (value / 100) * 255;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(data[i] + v);
    data[i + 1] = clamp(data[i + 1] + v);
    data[i + 2] = clamp(data[i + 2] + v);
  }
  ctx.putImageData(imageData, 0, 0);
  return toBlob(canvas);
}

export async function adjustContrast(
  source: HTMLImageElement,
  value: number
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = source.naturalWidth;
  canvas.height = source.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(source, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const factor = (259 * (value + 255)) / (255 * (259 - value));
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(factor * (data[i] - 128) + 128);
    data[i + 1] = clamp(factor * (data[i + 1] - 128) + 128);
    data[i + 2] = clamp(factor * (data[i + 2] - 128) + 128);
  }
  ctx.putImageData(imageData, 0, 0);
  return toBlob(canvas);
}

export async function adjustSaturation(
  source: HTMLImageElement,
  value: number
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = source.naturalWidth;
  canvas.height = source.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(source, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const factor = value / 100;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] / 255;
    const g = data[i + 1] / 255;
    const b = data[i + 2] / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let s = l < 0.5
      ? (max - min) / (max + min || 1)
      : (max - min) / (2 - max - min || 1);

    s = Math.min(1, Math.max(0, s + factor));

    const hue = max === min ? 0
      : max === r ? ((g - b) / (max - min || 1)) % 6
      : max === g ? 2 + (b - r) / (max - min || 1)
      : 4 + (r - g) / (max - min || 1);

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const h = ((hue + 6) % 6);
    const x = c * (1 - Math.abs((h % 2) - 1));
    const m = l - c / 2;

    let r1 = m, g1 = m, b1 = m;
    if (c > 0) {
      if (h < 1) { r1 = m + c; g1 = m + x; }
      else if (h < 2) { r1 = m + x; g1 = m + c; }
      else if (h < 3) { g1 = m + c; b1 = m + x; }
      else if (h < 4) { g1 = m + x; b1 = m + c; }
      else if (h < 5) { r1 = m + x; b1 = m + c; }
      else { r1 = m + c; b1 = m + x; }
    }

    data[i] = clamp(r1 * 255);
    data[i + 1] = clamp(g1 * 255);
    data[i + 2] = clamp(b1 * 255);
  }
  ctx.putImageData(imageData, 0, 0);
  return toBlob(canvas);
}

export async function convertToGrayscale(
  source: HTMLImageElement
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = source.naturalWidth;
  canvas.height = source.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(source, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = clamp(gray);
    data[i + 1] = clamp(gray);
    data[i + 2] = clamp(gray);
  }
  ctx.putImageData(imageData, 0, 0);
  return toBlob(canvas);
}

export async function applyBlur(
  source: HTMLImageElement,
  radius: number
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = source.naturalWidth;
  canvas.height = source.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.filter = `blur(${radius}px)`;
  ctx.drawImage(source, 0, 0);
  return toBlob(canvas);
}

export async function applySharpen(
  source: HTMLImageElement,
  intensity: number
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = source.naturalWidth;
  canvas.height = source.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(source, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;
  const output = new Uint8ClampedArray(data);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let r = 0, g = 0, b = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = ((y + ky) * width + (x + kx)) * 4;
          const k = ky === 0 && kx === 0 ? 1 + 4 * intensity : -intensity;
          r += data[idx] * k;
          g += data[idx + 1] * k;
          b += data[idx + 2] * k;
        }
      }
      const idx = (y * width + x) * 4;
      output[idx] = clamp(r);
      output[idx + 1] = clamp(g);
      output[idx + 2] = clamp(b);
    }
  }

  imageData.data.set(output);
  ctx.putImageData(imageData, 0, 0);
  return toBlob(canvas);
}
