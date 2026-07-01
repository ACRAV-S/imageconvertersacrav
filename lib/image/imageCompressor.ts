export function compressImage(
  source: HTMLImageElement | ImageBitmap,
  quality: number,
  maxDimension: number = 4096
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    let targetWidth = source.width;
    let targetHeight = source.height;

    if (targetWidth > maxDimension || targetHeight > maxDimension) {
      const ratio = Math.min(maxDimension / targetWidth, maxDimension / targetHeight);
      targetWidth = Math.round(targetWidth * ratio);
      targetHeight = Math.round(targetHeight * ratio);
    }

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    ctx.drawImage(source, 0, 0, targetWidth, targetHeight);

    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Compression failed"));
      },
      "image/jpeg",
      quality
    );
  });
}
