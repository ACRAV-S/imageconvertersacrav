import type { Metadata } from "next";
import RotateTool from "@/components/tools/RotateTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Image Rotator — Rotate Images at Any Angle Online",
  description: "Rotate images by any angle online. Fix orientation or create artistic effects. Free, fast, and private — all in your browser.",
  keywords: ["image rotator", "rotate image", "rotate photo", "image orientation", "free image rotator"],
  openGraph: {
    title: "Image Rotator — Rotate Images at Any Angle Online",
    description: "Rotate images by any angle online. Fix orientation or create artistic effects. Free, fast, and private.",
  },
};

export default function ImageRotatorPage() {
  return (
    <ToolErrorBoundary>
      <RotateTool
      title="Image Rotator"
      description="Rotate your image by any angle. Choose from preset angles (90°, 180°, 270°) or enter a custom angle. All processing happens in your browser."
      faqs={[
        {
          question: "What happens when I rotate an image?",
          answer: "The canvas is rotated and the image is drawn onto the new canvas. The output dimensions adjust to fit the rotated image (e.g., a 90° rotation swaps width and height).",
        },
        {
          question: "Can I rotate by a custom angle?",
          answer: "Yes, enter any angle in the Custom Angle field (e.g., 45, 15, 270). The image will be rotated by exactly that many degrees clockwise.",
        },
        {
          question: "Will rotation reduce quality?",
          answer: "Rotating by 90°, 180°, or 270° causes no quality loss. Custom angles may introduce slight pixel interpolation artifacts, but the result is still high quality.",
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
