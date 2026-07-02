import type { Metadata } from "next";
import ImageToolShell from "@/components/tools/ImageToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "JPG to PNG Converter",
  description: "Convert JPG images to PNG format with transparency support and lossless quality. Free, fast, and private — all in your browser.",
};

export default function JpgToPngPage() {
  return (
    <ToolErrorBoundary>
      <ImageToolShell
      title="JPG to PNG"
      description="Convert your JPG images to PNG format with full transparency support and lossless quality. Ideal for graphics, logos, and images that need a transparent background. All processing runs in your browser — nothing is uploaded."
      acceptedFormats={["image/jpeg"]}
      targetFormat="png"
      faqs={[
        {
          question: "Why convert JPG to PNG?",
          answer: "PNG supports transparency and lossless compression, making it ideal for logos, icons, screenshots, and graphics with sharp edges. Unlike JPG, PNG preserves every pixel exactly.",
        },
        {
          question: "Will I lose quality?",
          answer: "No. PNG uses lossless compression, so your image quality stays identical. The file may be larger than the original JPG, but every pixel is preserved.",
        },
        {
          question: "Is my image uploaded to a server?",
          answer: "Never. Everything runs client-side in your browser using the HTML Canvas API. Your files never leave your device.",
        },
        {
          question: "What's the maximum file size?",
          answer: "There is no strict limit, but very large images may take longer to process. For best results, keep images under 50MB.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
