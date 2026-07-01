import type { Metadata } from "next";
import ImageCompressorTool from "@/components/tools/ImageCompressorTool";

export const metadata: Metadata = {
  title: "Image Compressor",
  description: "Compress images to reduce file size without losing quality. Free, fast, and private — all in your browser.",
};

export default function ImageCompressorPage() {
  return (
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
          answer: "No, the dimensions stay the same. Only the file size is reduced through compression algorithms. For very large images (over 4000px), the tool automatically resizes to keep performance fast.",
        },
        {
          question: "Is my image uploaded to a server?",
          answer: "Never. Everything runs client-side in your browser using the HTML Canvas API. Your files never leave your device.",
        },
      ]}
    />
  );
}
