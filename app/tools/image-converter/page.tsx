import type { Metadata } from "next";
import ImageToolShell from "@/components/tools/ImageToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Image Converter — Convert PNG, JPG, WebP Online",
  description: "Convert images between PNG, JPG, and WebP formats instantly. Free, fast, and private — all processing happens in your browser. No uploads, no servers.",
  keywords: ["image converter", "PNG to JPG", "JPG to PNG", "WebP converter", "free image converter"],
  openGraph: {
    title: "Image Converter — Convert PNG, JPG, WebP Online",
    description: "Convert images between PNG, JPG, and WebP formats instantly. Free, fast, and private.",
  },
};

const FORMATS = ["image/png", "image/jpeg", "image/webp"];

export default function ImageConverterPage() {
  return (
    <ToolErrorBoundary>
      <ImageToolShell
      title="Image Converter"
      description="Convert images between PNG, JPG, and WebP formats instantly. All processing runs in your browser — nothing is uploaded to any server."
      acceptedFormats={FORMATS}
      targetFormat="png"
      targetFormats={["png", "jpg", "webp"]}
      faqs={[
        {
          question: "Which image formats are supported?",
          answer: "You can convert between PNG, JPG, and WebP. PNG supports transparency and is best for graphics. JPG is ideal for photographs. WebP offers excellent compression for web use.",
        },
        {
          question: "Does converting between formats reduce quality?",
          answer: "Converting from a lossless format (PNG) to a lossy format (JPG or WebP) reduces quality. Converting between lossy formats (JPG to WebP) may cause generational quality loss. PNG to PNG conversion is lossless.",
        },
        {
          question: "What quality setting should I use?",
          answer: "For web use, 80-95% quality offers excellent results. For archival purposes, use PNG. For the best compression-to-quality ratio, try WebP at 80% quality.",
        },
        {
          question: "Is my image uploaded to a server?",
          answer: "Never. Everything runs client-side in your browser using the HTML Canvas API. Your files never leave your device.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
