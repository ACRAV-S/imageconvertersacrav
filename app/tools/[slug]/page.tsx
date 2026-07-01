import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/common/Container";
import { tools, getToolBySlug } from "@/data";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

const DEDICATED_PAGES = new Set([
  "image-converter", "jpg-to-png", "png-to-jpg", "png-to-webp",
  "webp-to-png", "jpg-to-webp", "webp-to-jpg", "bmp-to-png",
  "gif-to-png", "image-resizer", "image-compressor",
  "image-cropper", "image-rotator", "image-flipper", "image-watermark",
  "image-blur", "brightness", "contrast", "saturation",
  "grayscale", "image-sharpen",
  "pdf-merge", "split-pdf", "pdf-compressor", "rotate-pdf",
  "delete-pdf-pages", "extract-pdf-pages", "reorder-pdf-pages",
  "jpg-to-pdf", "pdf-to-jpg", "pdf-metadata",
  "qr-generator", "qr-scanner", "barcode-generator",
  "wifi-qr", "email-qr", "sms-qr", "whatsapp-qr",
  "vcard-qr", "location-qr", "event-qr",
  "json-formatter", "json-validator", "json-minifier", "json-beautifier",
  "html-formatter", "css-formatter", "js-formatter", "regex-tester",
  "base64-encoder", "base64-decoder", "url-encoder", "url-decoder",
  "jwt-decoder", "uuid-generator", "hash-generator",
  "word-counter", "character-counter", "sentence-counter", "paragraph-counter",
  "reading-time", "case-converter", "remove-duplicate-lines", "sort-lines",
  "reverse-text", "remove-extra-spaces", "slug-generator",
  "lorem-ipsum-generator", "random-string-generator", "unicode-converter", "text-compare",
  "hex-to-rgb", "rgb-to-hex", "hex-to-hsl", "rgb-to-hsl",
  "color-picker", "gradient-generator", "css-gradient-generator", "color-palette-generator",
  "color-contrast-checker", "box-shadow-generator", "border-radius-generator",
  "glassmorphism-generator", "neumorphism-generator", "clamp-generator", "css-unit-converter",
]);

export async function generateStaticParams() {
  return tools
    .filter((tool) => !DEDICATED_PAGES.has(tool.slug))
    .map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <Container className="py-12">
      <div className="mb-8">
        <Link
          href="/tools"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        >
          &larr; All Tools
        </Link>
      </div>

      <div className="max-w-3xl">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{tool.icon}</span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {tool.title}
            </h1>
            <p className="mt-1 text-sm capitalize text-zinc-500 dark:text-zinc-400">
              {tool.category.replace("-", " & ")}
            </p>
          </div>
        </div>

        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
          {tool.description}
        </p>
      </div>

      <div className="mt-12 rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-zinc-400 dark:text-zinc-500 text-sm">
          Tool functionality coming soon.
        </p>
      </div>
    </Container>
  );
}
