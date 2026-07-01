export interface ResizeOptions {
  width?: number;
  height?: number;
  maintainAspectRatio?: boolean;
  format?: string;
  quality?: number;
}

export function resizeImage(
  source: HTMLImageElement | ImageBitmap,
  options: ResizeOptions
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const {
      width,
      height,
      maintainAspectRatio = true,
      format = "image/png",
      quality = 0.92,
    } = options;

    let targetWidth: number;
    let targetHeight: number;

    if (maintainAspectRatio) {
      const ratio = source.width / source.height;
      if (width && !height) {
        targetWidth = width;
        targetHeight = Math.round(width / ratio);
      } else if (height && !width) {
        targetHeight = height;
        targetWidth = Math.round(height * ratio);
      } else if (width && height) {
        const scale = Math.min(width / source.width, height / source.height);
        targetWidth = Math.round(source.width * scale);
        targetHeight = Math.round(source.height * scale);
      } else {
        targetWidth = source.width;
        targetHeight = source.height;
      }
    } else {
      targetWidth = width ?? source.width;
      targetHeight = height ?? source.height;
    }

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    if (format === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(source, 0, 0, targetWidth, targetHeight);

    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Resize failed"));
      },
      format,
      quality
    );
  });
}
