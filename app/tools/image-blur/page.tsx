import type { Metadata } from "next";
import FilterToolShell from "@/components/tools/FilterToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Image Blur — Blur Images Online with Adjustable Radius",
  description: "Blur images online with adjustable radius. Perfect for backgrounds, censoring, or creative effects. Free and private — all in your browser.",
  keywords: ["image blur", "blur image", "gaussian blur", "blur background", "photo blur"],
  openGraph: {
    title: "Image Blur — Blur Images Online with Adjustable Radius",
    description: "Blur images online with adjustable radius. Perfect for backgrounds, censoring, or creative effects. Free and private.",
  },
};

export default function ImageBlurPage() {
  return (
    <ToolErrorBoundary>
      <FilterToolShell
      title="Image Blur"
      description="Apply a blur effect to your image. Use the slider to control the blur radius — subtle softening or heavy blur. All processing happens in your browser."
      filterType="blur"
      params={[
        { key: "radius", label: "Blur Radius", min: 0, max: 20, step: 0.5, default: 3 },
      ]}
      faqs={[
        {
          question: "What type of blur is used?",
          answer: "This tool uses Gaussian blur via the Canvas API. It creates a smooth, natural-looking blur effect.",
        },
        {
          question: "What blur radius should I use?",
          answer: "For subtle background blurring, try 2-5px. For censoring text or faces, use 8-15px. For extreme artistic blur, use 15-20px.",
        },
        {
          question: "Does blur affect image dimensions?",
          answer: "No, the image dimensions stay the same. Only the visual appearance changes.",
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
