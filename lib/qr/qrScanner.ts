export async function scanQrFromFile(file: File): Promise<string[]> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const detector = new BarcodeDetector({ formats: ["qr_code"] });
  const results = await detector.detect(canvas);
  return results.map((r) => r.rawValue);
}

export function isBarcodeDetectorSupported(): boolean {
  return "BarcodeDetector" in globalThis;
}
