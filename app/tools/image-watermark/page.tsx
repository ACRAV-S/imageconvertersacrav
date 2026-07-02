import type { Metadata } from "next";
import WatermarkTool from "@/components/tools/WatermarkTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Image Watermark — Add Watermarks to Images Online",
  description: "Add text watermarks to your images online. Customize position, size, opacity, and color. Free and private — all in your browser.",
  keywords: ["image watermark", "add watermark", "photo watermark", "watermark tool", "protect images"],
  openGraph: {
    title: "Image Watermark — Add Watermarks to Images Online",
    description: "Add text watermarks to your images online. Customize position, size, opacity, and color. Free and private.",
  },
};

export default function ImageWatermarkPage() {
  return (
    <ToolErrorBoundary>
      <WatermarkTool
      title="Image Watermark"
      description="Add a custom text watermark to your image. Choose the position, font size, opacity, and color. All processing happens in your browser — nothing is uploaded."
      faqs={[
        {
          question: "What is a watermark?",
          answer: "A watermark is text overlaid on an image to protect copyright, brand content, or add attribution. This tool uses text watermarks.",
        },
        {
          question: "Can I change the watermark position?",
          answer: "Yes, choose from five positions: top-left, top-right, bottom-left, bottom-right, or center. You can also adjust the font size, opacity, and color.",
        },
        {
          question: "Can I use custom colors?",
          answer: "Yes, select from preset colors (white, black, red, green, blue, yellow) or use the color picker for any custom color.",
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
