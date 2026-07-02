import type { Metadata } from "next";
import CropTool from "@/components/tools/CropTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Image Cropper — Crop Images to Any Size Online",
  description: "Crop images to any size online. Remove unwanted areas and focus on what matters. Free, private, and runs in your browser.",
  keywords: ["image cropper", "crop image", "photo cropper", "crop tool", "free image cropper"],
  openGraph: {
    title: "Image Cropper — Crop Images to Any Size Online",
    description: "Crop images to any size online. Remove unwanted areas and focus on what matters. Free, private.",
  },
};

export default function ImageCropperPage() {
  return (
    <ToolErrorBoundary>
      <CropTool
      title="Image Cropper"
      description="Crop your images to any size. Adjust the crop area using the controls below. All processing happens in your browser."
      faqs={[
        {
          question: "What does cropping do?",
          answer: "Cropping removes outer areas of an image to improve framing, focus on a subject, or change the aspect ratio. The cropped area is discarded.",
        },
        {
          question: "Can I crop to exact dimensions?",
          answer: "Yes, you can enter exact pixel values for X offset, Y offset, width, and height. Check your original image dimensions to plan your crop.",
        },
        {
          question: "Is there a limit to how much I can crop?",
          answer: "The minimum crop size is 1x1 pixel. You can crop any rectangular area within the original image boundaries.",
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
