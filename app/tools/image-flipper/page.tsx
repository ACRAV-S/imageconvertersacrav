import type { Metadata } from "next";
import FlipTool from "@/components/tools/FlipTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Image Flipper — Flip Images Horizontally or Vertically Online",
  description: "Flip images horizontally or vertically online. Mirror your photos instantly. Free, fast, and private — all in your browser.",
  keywords: ["image flipper", "flip image", "mirror image", "horizontal flip", "vertical flip"],
  openGraph: {
    title: "Image Flipper — Flip Images Horizontally or Vertically Online",
    description: "Flip images horizontally or vertically online. Mirror your photos instantly. Free, fast, and private.",
  },
};

export default function ImageFlipperPage() {
  return (
    <ToolErrorBoundary>
      <FlipTool
      title="Image Flipper"
      description="Flip your image horizontally or vertically. Perfect for correcting mirror images, creating reflections, or artistic effects. All processing happens in your browser."
      faqs={[
        {
          question: "What is the difference between horizontal and vertical flip?",
          answer: "Horizontal flip mirrors the image left-to-right (like a mirror reflection). Vertical flip turns it upside-down.",
        },
        {
          question: "Does flipping reduce image quality?",
          answer: "No, flipping is a lossless operation. The pixels are simply rearranged with no quality degradation.",
        },
        {
          question: "Can I flip multiple times?",
          answer: "Yes, you can flip the flipped result. Flipping horizontally twice returns the original image.",
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
