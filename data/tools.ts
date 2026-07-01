import type { Tool, ToolCategoryMeta } from "@/types/tool";

export const tools: Tool[] = [
  {
    id: "image-converter",
    slug: "image-converter",
    title: "Image Converter",
    description: "Convert images between popular formats like JPG, PNG, WebP, AVIF, and more directly in your browser.",
    category: "image",
    icon: "🖼️",
    keywords: ["convert image", "image converter", "jpg converter", "png converter", "webp converter"],
  },
  {
    id: "jpg-to-png",
    slug: "jpg-to-png",
    title: "JPG to PNG",
    description: "Convert JPG images to PNG format with transparency support and lossless quality.",
    category: "image",
    icon: "↔️",
    keywords: ["jpg to png", "jpeg to png", "convert jpg", "image format"],
  },
  {
    id: "png-to-jpg",
    slug: "png-to-jpg",
    title: "PNG to JPG",
    description: "Convert PNG images to JPG format to reduce file size while maintaining visual quality.",
    category: "image",
    icon: "↔️",
    keywords: ["png to jpg", "png to jpeg", "convert png", "image compression"],
  },
  {
    id: "png-to-webp",
    slug: "png-to-webp",
    title: "PNG to WebP",
    description: "Convert PNG images to WebP format for superior compression and faster web loading.",
    category: "image",
    icon: "🌐",
    keywords: ["png to webp", "webp converter", "image compression", "next-gen format"],
  },
  {
    id: "webp-to-png",
    slug: "webp-to-png",
    title: "WebP to PNG",
    description: "Convert WebP images to PNG format with full transparency support and lossless quality.",
    category: "image",
    icon: "↔️",
    keywords: ["webp to png", "convert webp", "webp converter", "image format"],
  },
  {
    id: "jpg-to-webp",
    slug: "jpg-to-webp",
    title: "JPG to WebP",
    description: "Convert JPG images to WebP format for superior compression and faster page loads.",
    category: "image",
    icon: "🌐",
    keywords: ["jpg to webp", "jpeg to webp", "webp converter", "image compression"],
  },
  {
    id: "webp-to-jpg",
    slug: "webp-to-jpg",
    title: "WebP to JPG",
    description: "Convert WebP images to JPG format for maximum compatibility across devices and platforms.",
    category: "image",
    icon: "↔️",
    keywords: ["webp to jpg", "webp to jpeg", "convert webp", "image format"],
  },
  {
    id: "bmp-to-png",
    slug: "bmp-to-png",
    title: "BMP to PNG",
    description: "Convert BMP images to PNG format with compression and transparency support.",
    category: "image",
    icon: "↔️",
    keywords: ["bmp to png", "bitmap to png", "convert bmp", "image format"],
  },
  {
    id: "gif-to-png",
    slug: "gif-to-png",
    title: "GIF to PNG",
    description: "Convert GIF images to PNG format. Extract single frames as high-quality PNG images.",
    category: "image",
    icon: "↔️",
    keywords: ["gif to png", "convert gif", "gif converter", "image format"],
  },
  {
    id: "image-resizer",
    slug: "image-resizer",
    title: "Image Resizer",
    description: "Resize images to exact dimensions. Maintain aspect ratio or crop to fit. Download in any format.",
    category: "image",
    icon: "📐",
    keywords: ["resize image", "image resizer", "change image size", "image dimensions"],
  },
  {
    id: "image-compressor",
    slug: "image-compressor",
    title: "Image Compressor",
    description: "Compress images without sacrificing quality. Reduce file sizes for web performance.",
    category: "image",
    icon: "📦",
    keywords: ["compress image", "image compression", "reduce image size", "optimize image"],
  },
  {
    id: "image-cropper",
    slug: "image-cropper",
    title: "Image Cropper",
    description: "Crop images to any size. Remove unwanted areas and focus on what matters most.",
    category: "image",
    icon: "✂️",
    keywords: ["crop image", "image cropper", "trim image", "cut image"],
  },
  {
    id: "image-rotator",
    slug: "image-rotator",
    title: "Image Rotator",
    description: "Rotate images by any angle. Fix orientation or create artistic effects.",
    category: "image",
    icon: "🔄",
    keywords: ["rotate image", "image rotation", "turn image", "angle"],
  },
  {
    id: "image-flipper",
    slug: "image-flipper",
    title: "Image Flipper",
    description: "Flip images horizontally or vertically. Mirror your photos instantly.",
    category: "image",
    icon: "🪞",
    keywords: ["flip image", "mirror image", "horizontal flip", "vertical flip"],
  },
  {
    id: "image-watermark",
    slug: "image-watermark",
    title: "Image Watermark",
    description: "Add text watermarks to your images. Customize position, size, opacity, and color.",
    category: "image",
    icon: "💧",
    keywords: ["watermark image", "add watermark", "protect image", "text overlay"],
  },
  {
    id: "image-blur",
    slug: "image-blur",
    title: "Image Blur",
    description: "Blur images with adjustable radius. Perfect for backgrounds, censoring, or creative effects.",
    category: "image",
    icon: "🌫️",
    keywords: ["blur image", "gaussian blur", "blur background", "smooth image"],
  },
  {
    id: "brightness",
    slug: "brightness",
    title: "Brightness Adjuster",
    description: "Adjust image brightness with precision. Lighten underexposed photos or darken overexposed ones.",
    category: "image",
    icon: "☀️",
    keywords: ["brightness", "lighten image", "darken image", "exposure"],
  },
  {
    id: "contrast",
    slug: "contrast",
    title: "Contrast Adjuster",
    description: "Fine-tune image contrast. Make colors pop or create soft, muted looks.",
    category: "image",
    icon: "◐",
    keywords: ["contrast", "image contrast", "adjust contrast", "tone"],
  },
  {
    id: "saturation",
    slug: "saturation",
    title: "Saturation Adjuster",
    description: "Control color intensity. Boost colors for vibrant photos or desaturate for a muted look.",
    category: "image",
    icon: "🎨",
    keywords: ["saturation", "vibrance", "color intensity", "desaturate"],
  },
  {
    id: "grayscale",
    slug: "grayscale",
    title: "Grayscale Converter",
    description: "Convert images to black and white. Create timeless monochrome photos with one click.",
    category: "image",
    icon: "⚫",
    keywords: ["grayscale", "black and white", "monochrome", "desaturate"],
  },
  {
    id: "image-sharpen",
    slug: "image-sharpen",
    title: "Image Sharpen",
    description: "Sharpen blurry or soft images. Enhance details and make your photos crystal clear.",
    category: "image",
    icon: "✨",
    keywords: ["sharpen image", "image sharpener", "enhance details", "clarity"],
  },
  {
    id: "pdf-compressor",
    slug: "pdf-compressor",
    title: "PDF Compressor",
    description: "Reduce PDF file size while preserving quality. Perfect for email attachments and web uploads.",
    category: "pdf",
    icon: "📄",
    keywords: ["compress pdf", "pdf compression", "reduce pdf size", "smaller pdf"],
  },
  {
    id: "pdf-merge",
    slug: "pdf-merge",
    title: "PDF Merge",
    description: "Combine multiple PDF files into a single document. Reorder pages before merging.",
    category: "pdf",
    icon: "📑",
    keywords: ["merge pdf", "combine pdf", "join pdf", "pdf merger"],
  },
  {
    id: "qr-generator",
    slug: "qr-generator",
    title: "QR Generator",
    description: "Create custom QR codes for URLs, text, contacts, and more. Download as PNG or SVG.",
    category: "developer",
    icon: "📱",
    keywords: ["qr code", "qr generator", "create qr", "barcode generator"],
  },
  {
    id: "json-formatter",
    slug: "json-formatter",
    title: "JSON Formatter",
    description: "Format, validate, and beautify JSON data. Collapse, expand, and copy with one click.",
    category: "text-code",
    icon: "📋",
    keywords: ["json formatter", "json beautifier", "json validator", "format json"],
  },
  {
    id: "base64-encoder",
    slug: "base64-encoder",
    title: "Base64 Encoder",
    description: "Encode text or files to Base64 and decode Base64 back to readable content.",
    category: "developer",
    icon: "🔐",
    keywords: ["base64", "base64 encode", "base64 decode", "encode text"],
  },
];

export const categories: ToolCategoryMeta[] = [
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
