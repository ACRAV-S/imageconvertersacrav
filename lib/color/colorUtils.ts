export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace(/^#/, "").trim();
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(clean)) return null;
  const full = clean.length === 3 ? clean.replace(/./g, "$&$&") : clean;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const [rn, gn, bn] = [r, g, b].map((c) => c / 255);
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const l = (max + min) / 2;

  if (delta === 0) return { h: 0, s: 0, l: Math.round(l * 100) };

  const s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  let h = 0;
  if (max === rn) h = ((gn - bn) / delta + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / delta + 2) / 6;
  else h = ((rn - gn) / delta + 4) / 6;

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const sN = s / 100;
  const lN = l / 100;
  const c = (1 - Math.abs(2 * lN - 1)) * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lN - c / 2;
  let [r, g, b] = [0, 0, 0];

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

export function hexToHslString(hex: string): string | null {
  const hsl = hexToHsl(hex);
  if (!hsl) return null;
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

export function rgbToHslString(r: number, g: number, b: number): string {
  const hsl = rgbToHsl(r, g, b);
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

export function getRelativeLuminance(hex: string): number | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function calculateContrastRatio(hex1: string, hex2: string): number | null {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  if (l1 === null || l2 === null) return null;
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export interface WcagResult {
  ratio: number;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
  rating: string;
}

export function getWcagResult(hex1: string, hex2: string): WcagResult | null {
  const ratio = calculateContrastRatio(hex1, hex2);
  if (ratio === null) return null;
  return {
    ratio: Math.round(ratio * 100) / 100,
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaaNormal: ratio >= 7,
    aaaLarge: ratio >= 4.5,
    rating:
      ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA Large" : "Fail",
  };
}

export function generatePalette(hex: string): { name: string; colors: string[] }[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  const baseHsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const schemes: { name: string; colors: string[] }[] = [];

  const mono: string[] = [];
  for (let i = 0; i < 5; i++) {
    const l = Math.max(5, Math.min(95, baseHsl.l + (i - 2) * 15));
    const c = hslToRgb(baseHsl.h, baseHsl.s, l);
    mono.push(rgbToHex(c.r, c.g, c.b));
  }
  schemes.push({ name: "Monochrome", colors: mono });

  const complement: string[] = [];
  for (let i = 0; i < 5; i++) {
    const h = (baseHsl.h + 30 + i * 60) % 360;
    const s = Math.max(20, Math.min(100, baseHsl.s + (i - 2) * 10));
    const l = Math.max(20, Math.min(80, baseHsl.l + (i - 2) * 8));
    const c = hslToRgb(h, s, l);
    complement.push(rgbToHex(c.r, c.g, c.b));
  }
  schemes.push({ name: "Complementary", colors: complement });

  const analogous: string[] = [];
  for (let i = 0; i < 5; i++) {
    const h = (baseHsl.h - 40 + i * 20 + 360) % 360;
    const c = hslToRgb(h, baseHsl.s, baseHsl.l);
    analogous.push(rgbToHex(c.r, c.g, c.b));
  }
  schemes.push({ name: "Analogous", colors: analogous });

  const triadic: string[] = [];
  for (let i = 0; i < 3; i++) {
    const h = (baseHsl.h + i * 120) % 360;
    const c = hslToRgb(h, baseHsl.s, baseHsl.l);
    triadic.push(rgbToHex(c.r, c.g, c.b));
  }
  schemes.push({ name: "Triadic", colors: triadic });

  return schemes;
}

export function generateGradientCss(
  type: "linear" | "radial" | "conic",
  stops: { color: string; position: number }[],
  angleOrShape: string
): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopStr = sorted.map((s) => `${s.color} ${s.position}%`).join(", ");
  if (type === "linear") return `linear-gradient(${angleOrShape}, ${stopStr})`;
  if (type === "radial") return `radial-gradient(${angleOrShape}, ${stopStr})`;
  return `conic-gradient(from ${angleOrShape}, ${stopStr})`;
}

export function generateBoxShadowCss(params: {
  inset: boolean;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
}): string {
  const inset = params.inset ? "inset " : "";
  return `${inset}${params.offsetX}px ${params.offsetY}px ${params.blur}px ${params.spread}px ${params.color}`;
}

export function generateBorderRadiusCss(params: {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  unit: "px" | "%";
}): string {
  const { topLeft, topRight, bottomRight, bottomLeft, unit } = params;
  if (topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft) {
    return `${topLeft}${unit}`;
  }
  return `${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit}`;
}

export function generateGlassmorphismCss(params: {
  backgroundOpacity: number;
  blur: number;
  saturation: number;
  borderOpacity: number;
  borderRadius: number;
  shadowBlur: number;
}): string {
  const { backgroundOpacity, blur, saturation, borderOpacity, borderRadius, shadowBlur } = params;
  return [
    `background: rgba(255, 255, 255, ${backgroundOpacity});`,
`backdrop-filter: blur(${blur}px) saturate(${saturation}%);`,
`-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);`,
    `border-radius: ${borderRadius}px;`,
    `border: 1px solid rgba(255, 255, 255, ${borderOpacity});`,
    `box-shadow: 0 ${Math.max(4, shadowBlur / 2)}px ${shadowBlur}px rgba(0, 0, 0, 0.1);`,
  ].join("\n");
}

export function generateNeumorphismCss(params: {
  baseColor: string;
  borderRadius: number;
  shadowBlur: number;
  distance: number;
  intensity: number;
  inset: boolean;
}): string {
  const rgba = hexToRgb(params.baseColor);
  if (!rgba) return "";
  const light = `rgba(255, 255, 255, ${params.intensity})`;
  const dark = `rgba(${Math.max(0, rgba.r - 100)}, ${Math.max(0, rgba.g - 100)}, ${Math.max(0, rgba.b - 100)}, ${params.intensity})`;
  const d = params.distance;
  const b = params.shadowBlur;
  if (params.inset) {
    return [
      `border-radius: ${params.borderRadius}px;`,
      `background: ${params.baseColor};`,
      `box-shadow: inset ${d}px ${d}px ${b}px ${dark}, inset ${-d}px ${-d}px ${b}px ${light};`,
    ].join("\n");
  }
  return [
    `border-radius: ${params.borderRadius}px;`,
    `background: ${params.baseColor};`,
    `box-shadow: ${d}px ${d}px ${b}px ${dark}, ${-d}px ${-d}px ${b}px ${light};`,
  ].join("\n");
}

export function generateClamp(
  minSize: number,
  maxSize: number,
  minViewport: number,
  maxViewport: number,
  unit: "px" | "rem"
): string {
  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const intercept = minSize - slope * minViewport;
  const slopePct = (slope * 100).toFixed(4);
  const interceptVal = intercept.toFixed(4);
  const minStr = `${minSize}${unit}`;
  const maxStr = `${maxSize}${unit}`;
  return `clamp(${minStr}, ${slopePct}vw + ${interceptVal}${unit}, ${maxStr})`;
}

export function convertPxToRem(px: number, base: number = 16): number {
  return px / base;
}

export function convertRemToPx(rem: number, base: number = 16): number {
  return rem * base;
}

export function convertPxToEm(px: number, base: number = 16): number {
  return px / base;
}

export function convertEmToPx(em: number, base: number = 16): number {
  return em * base;
}

export function isValidHex(hex: string): boolean {
  return /^#?[0-9a-fA-F]{3}$|^#?[0-9a-fA-F]{6}$/.test(hex.trim());
}

export function isValidRgb(r: number, g: number, b: number): boolean {
  return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
}
