import type { Metadata } from "next";
import FilterToolShell from "@/components/tools/FilterToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Image Sharpen — Sharpen Blurry Images Online",
  description: "Sharpen blurry or soft images online. Enhance details and make your photos crystal clear. Free and private — all in your browser.",
  keywords: ["image sharpen", "sharpen image", "unsharp mask", "photo sharpener", "enhance details"],
  openGraph: {
    title: "Image Sharpen — Sharpen Blurry Images Online",
    description: "Sharpen blurry or soft images online. Enhance details and make your photos crystal clear. Free and private.",
  },
};

export default function ImageSharpenPage() {
  return (
    <ToolErrorBoundary>
      <FilterToolShell
      title="Image Sharpen"
      description="Sharpen your image to enhance details and edges. Use the intensity slider to control the sharpening strength. All processing happens in your browser."
      filterType="sharpen"
      params={[
        { key: "intensity", label: "Sharpening Intensity", min: 0, max: 5, step: 0.1, default: 1 },
      ]}
      faqs={[
        {
          question: "How does image sharpening work?",
          answer: "Sharpening works by increasing the contrast between adjacent pixels, making edges and details more visible. This tool uses a convolution kernel for precise sharpening.",
        },
        {
          question: "What sharpening intensity should I use?",
          answer: "For subtle enhancement, try 0.5-1. For moderate sharpening, use 1-2. For strong sharpening, use 2-4. Values above 4 may create visible artifacts.",
        },
        {
          question: "Can I over-sharpen an image?",
          answer: "Yes, excessive sharpening creates visible halos around edges and introduces noise. Start with low values and increase gradually for the best results.",
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
