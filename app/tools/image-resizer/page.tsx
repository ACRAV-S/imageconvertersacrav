import type { Metadata } from "next";
import ImageResizerTool from "@/components/tools/ImageResizerTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Image Resizer — Resize Images to Exact Dimensions Online",
  description: "Resize images to exact dimensions online. Free, fast, and private — all in your browser. Supports PNG, JPG, and WebP output.",
  keywords: ["image resizer", "resize image", "image dimensions", "photo resizer", "free image resizer"],
  openGraph: {
    title: "Image Resizer — Resize Images to Exact Dimensions Online",
    description: "Resize images to exact dimensions online. Free, fast, and private.",
  },
};

export default function ImageResizerPage() {
  return (
    <ToolErrorBoundary>
      <ImageResizerTool
      faqs={[
        {
          question: "Can I resize to any dimension?",
          answer: "Yes, you can set any width and height in pixels. The aspect ratio lock helps maintain the original proportions. Uncheck it to set independent width and height.",
        },
        {
          question: "Will resizing reduce quality?",
          answer: "Resizing to smaller dimensions may slightly reduce sharpness, but the visual quality remains high. For best results, resize down rather than up — enlarging images can make them look blurry.",
        },
        {
          question: "What output formats are supported?",
          answer: "You can download your resized image as PNG, JPG, or WebP. PNG is best for graphics and transparency, JPG for photographs, and WebP for web use.",
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
