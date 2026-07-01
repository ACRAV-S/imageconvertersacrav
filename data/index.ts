import type { Tool, ToolCategoryMeta } from "@/types/tool";
import { imageTools } from "./image-tools";
import { pdfTools } from "./pdf-tools";
import { qrTools } from "./qr-tools";
import { textTools } from "./text-tools";
import { developerTools } from "./developer-tools";
import { colorTools } from "./color-tools";

export const tools: Tool[] = [
  ...imageTools,
  ...pdfTools,
  ...qrTools,
  ...textTools,
  ...developerTools,
  ...colorTools,
];

export const categories: ToolCategoryMeta[] = [
  {
    id: "color",
    title: "Color & CSS Tools",
    description: "Convert colors, generate CSS effects, and create beautiful design tokens.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "text",
    title: "Text Tools",
    description: "Count, convert, generate, and analyze text with powerful browser-based utilities.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "image",
    title: "Image Tools",
    description: "Convert, compress, resize, and transform images in your browser.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "pdf",
    title: "PDF Tools",
    description: "Merge, split, compress, and convert PDFs instantly.",
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: "qr",
    title: "QR & Barcode Tools",
    description: "Generate and scan QR codes and barcodes instantly.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "text-code",
    title: "Text & Code",
    description: "Format, minify, and validate JSON, HTML, CSS, and more.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "developer",
    title: "Developer Tools",
    description: "Encoders, decoders, hashers, and network utilities.",
    gradient: "from-purple-500 to-pink-500",
  },
];

export function getToolsByCategory(category: Tool["category"]): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return tools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.keywords.some((kw) => kw.toLowerCase().includes(q)) ||
      tool.category.toLowerCase().includes(q)
  );
}

export function getPopularTools(count = 6): Tool[] {
  return tools.slice(0, count);
}
