import type { Metadata } from "next";
import ImageToolShell from "@/components/tools/ImageToolShell";

export const metadata: Metadata = {
  title: "WebP to PNG Converter",
  description: "Convert WebP images to PNG format with full transparency support. Free, fast, and private — all in your browser.",
};

export default function WebpToPngPage() {
  return (
    <ImageToolShell
      title="WebP to PNG"
      description="Convert WebP images to PNG format for maximum compatibility. PNG preserves all quality and transparency, making it ideal for editing, printing, and sharing. All processing runs in your browser."
      acceptedFormats={["image/webp"]}
      targetFormat="png"
      faqs={[
        {
          question: "Why convert WebP to PNG?",
          answer: "While WebP is great for the web, PNG offers broader compatibility with older software, image editors, and platforms that don't support WebP. PNG also uses lossless compression, preserving every pixel.",
        },
        {
          question: "Will the file be larger?",
          answer: "Yes, PNG files are generally larger than WebP files. This is because PNG uses lossless compression, while WebP can use lossy compression. The trade-off is full quality preservation.",
        },
        {
          question: "Is transparency preserved?",
          answer: "Yes. Both WebP and PNG support alpha transparency. When you convert from WebP to PNG, all transparency information is preserved.",
        },
        {
          question: "Is my image uploaded to a server?",
          answer: "Never. Everything runs client-side in your browser using the HTML Canvas API. Your files never leave your device.",
        },
      ]}
    />
  );
}
