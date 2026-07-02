import type { Metadata } from "next";
import ImageToolShell from "@/components/tools/ImageToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "WebP to JPG Converter",
  description: "Convert WebP images to JPG format for universal compatibility. Free, fast, and private — all in your browser.",
};

export default function WebpToJpgPage() {
  return (
    <ToolErrorBoundary>
      <ImageToolShell
      title="WebP to JPG"
      description="Convert WebP images to the universally compatible JPG format. Perfect for sharing, uploading to platforms that don't support WebP, or editing in older software. All processing runs in your browser."
      acceptedFormats={["image/webp"]}
      targetFormat="jpg"
      faqs={[
        {
          question: "Why convert WebP to JPG?",
          answer: "JPG is the most widely supported image format. Converting WebP to JPG ensures compatibility with all devices, platforms, email clients, and legacy software that may not support WebP.",
        },
        {
          question: "Will I lose transparency?",
          answer: "Yes, JPG does not support transparency. If your WebP image has a transparent background, those areas will be filled with white. For transparency, convert to PNG instead.",
        },
        {
          question: "Does quality setting matter?",
          answer: "Yes. The quality slider controls the level of JPG compression. Higher values (90-100%) produce better quality but larger files. Lower values (30-70%) create smaller files with more compression artifacts.",
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
