export interface WatermarkOptions {
  text: string;
  fontSize?: number;
  color?: string;
  opacity?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
}

export async function addWatermark(
  source: HTMLImageElement,
  options: WatermarkOptions
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const w = source.naturalWidth;
  const h = source.naturalHeight;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(source, 0, 0);

  const fontSize = options.fontSize ?? Math.max(16, Math.floor(w / 20));
  const opacity = options.opacity ?? 0.5;
  const position = options.position ?? "bottom-right";
  const color = options.color ?? "#ffffff";

  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.textBaseline = "middle";

  const textWidth = ctx.measureText(options.text).width;
  const padding = 20;

  let textX: number;
  let textY: number;
  switch (position) {
    case "top-left":
      textX = padding;
      textY = fontSize + padding;
      break;
    case "top-right":
      textX = w - textWidth - padding;
      textY = fontSize + padding;
      break;
    case "bottom-left":
      textX = padding;
      textY = h - padding;
      break;
    case "center":
      textX = (w - textWidth) / 2;
      textY = h / 2;
      break;
    case "bottom-right":
    default:
      textX = w - textWidth - padding;
      textY = h - padding;
      break;
  }

  ctx.fillText(options.text, textX, textY);
  ctx.globalAlpha = 1;

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to create blob"));
    }, "image/png");
  });
}
