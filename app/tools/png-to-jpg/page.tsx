import type { Metadata } from "next";
import ImageToolShell from "@/components/tools/ImageToolShell";

export const metadata: Metadata = {
  title: "PNG to JPG Converter",
  description: "Convert PNG images to JPG format to reduce file size. Free, fast, and private — all in your browser.",
};

export default function PngToJpgPage() {
  return (
    <ImageToolShell
      title="PNG to JPG"
      description="Convert your PNG images to JPG format for smaller file sizes and broader compatibility. Perfect for photographs and web images where transparency is not needed. All processing runs in your browser."
      acceptedFormats={["image/png"]}
      targetFormat="jpg"
      faqs={[
        {
          question: "Why convert PNG to JPG?",
          answer: "JPG files are significantly smaller than PNG files, making them ideal for photographs, website images, and sharing. JPG uses lossy compression to reduce file size while maintaining good visual quality.",
        },
        {
          question: "Will I lose the transparent background?",
          answer: "Yes. JPG does not support transparency. Any transparent areas in your PNG will be filled with white. If you need transparency, keep the PNG format.",
        },
        {
          question: "Does quality setting affect the output?",
          answer: "Yes. Higher quality (90-100%) produces better-looking images with larger files. Lower quality (30-70%) creates smaller files with some visible compression artifacts.",
        },
        {
          question: "Is my image uploaded to a server?",
          answer: "Never. Everything runs client-side in your browser using the HTML Canvas API. Your files never leave your device.",
        },
      ]}
    />
  );
}
