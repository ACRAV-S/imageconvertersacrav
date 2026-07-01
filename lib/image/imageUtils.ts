export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export const FORMATS = [
  { label: "PNG", value: "png", mime: "image/png", extension: ".png", desc: "Lossless, transparency" },
  { label: "JPG", value: "jpg", mime: "image/jpeg", extension: ".jpg", desc: "Small file size" },
  { label: "WebP", value: "webp", mime: "image/webp", extension: ".webp", desc: "Best compression" },
] as const;

export function getFormatConfig(format: string): (typeof FORMATS)[number] | undefined {
  return FORMATS.find((f) => f.value === format);
}
