import type { Metadata } from "next";
import ImageToolShell from "@/components/tools/ImageToolShell";

export const metadata: Metadata = {
  title: "JPG to WebP Converter",
  description: "Convert JPG images to WebP format for better compression and faster loading. Free and private — all in your browser.",
};

export default function JpgToWebpPage() {
  return (
    <ImageToolShell
      title="JPG to WebP"
      description="Convert your JPG images to WebP format and reduce file size by up to 30% without visible quality loss. WebP is the modern standard for web images, supported by all major browsers."
      acceptedFormats={["image/jpeg"]}
      targetFormat="webp"
      faqs={[
        {
          question: "Why switch from JPG to WebP?",
          answer: "WebP provides 25-35% better compression than JPG at the same quality. This means faster page loads, less bandwidth usage, and a better experience for your visitors.",
        },
        {
          question: "Will the quality be the same?",
          answer: "At the same quality setting, WebP will look identical to JPG but with a smaller file size. You can also increase the quality of WebP while still keeping the file smaller than the original JPG.",
        },
        {
          question: "Which browsers support WebP?",
          answer: "WebP is supported in Chrome, Firefox, Safari 14+, Edge, Opera, and all modern browsers. Over 97% of global web users can view WebP images.",
        },
        {
          question: "Is my image uploaded to a server?",
          answer: "Never. Everything runs client-side in your browser using the HTML Canvas API. Your files never leave your device.",
        },
      ]}
    />
  );
}
