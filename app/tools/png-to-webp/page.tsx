import type { Metadata } from "next";
import ImageToolShell from "@/components/tools/ImageToolShell";

export const metadata: Metadata = {
  title: "PNG to WebP Converter",
  description: "Convert PNG images to WebP format for superior compression and faster web loading. Free and private — all in your browser.",
};

export default function PngToWebpPage() {
  return (
    <ImageToolShell
      title="PNG to WebP"
      description="Convert your PNG images to WebP format — Google's modern image format that delivers superior compression. WebP files are 25-35% smaller than PNG files at the same quality, making your website faster."
      acceptedFormats={["image/png"]}
      targetFormat="webp"
      faqs={[
        {
          question: "What is WebP?",
          answer: "WebP is a modern image format developed by Google that provides superior lossy and lossless compression. WebP images are typically 25-35% smaller than PNGs with the same visual quality.",
        },
        {
          question: "Does WebP support transparency?",
          answer: "Yes! Unlike JPG, WebP supports alpha transparency (transparent backgrounds), making it an excellent replacement for both PNG and JPG in most cases.",
        },
        {
          question: "Is WebP supported everywhere?",
          answer: "WebP is supported by all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. Over 97% of web users can view WebP images.",
        },
        {
          question: "Is my image uploaded to a server?",
          answer: "Never. Everything runs client-side in your browser using the HTML Canvas API. Your files never leave your device.",
        },
      ]}
    />
  );
}
