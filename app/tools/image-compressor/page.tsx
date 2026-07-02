import type { Metadata } from "next";
import ImageCompressorTool from "@/components/tools/ImageCompressorTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Image Compressor — Reduce Image File Size Online",
  description: "Compress images to reduce file size without losing quality. Free, fast, and private — all in your browser. No uploads, no servers.",
  keywords: ["image compressor", "compress image", "reduce image size", "JPEG compressor", "PNG compressor"],
  openGraph: {
    title: "Image Compressor — Reduce Image File Size Online",
    description: "Compress images to reduce file size without losing quality. Free, fast, and private.",
  },
};

export default function ImageCompressorPage() {
  return (
    <ToolErrorBoundary>
      <ImageCompressorTool
      faqs={[
        {
          question: "How much can I compress an image?",
          answer: "Compression depends on the image content and quality setting. Typically, you can reduce file size by 50-80% with minimal visible quality loss. Photos compress more than graphics.",
        },
        {
          question: "What quality setting should I use?",
          answer: "For web use, 70-80% quality offers a good balance between file size and visual quality. For higher quality, use 90-95%. Below 50%, compression artifacts become noticeable.",
        },
        {
          question: "Does compression affect image dimensions?",
          answer: "No, the dimensions stay the same. Only the file size is reduced through compression algorithms.",
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
