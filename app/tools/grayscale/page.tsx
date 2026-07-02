import type { Metadata } from "next";
import FilterToolShell from "@/components/tools/FilterToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Grayscale Converter",
  description: "Convert images to black and white online. Create timeless monochrome photos with one click. Free and private — all in your browser.",
};

export default function GrayscalePage() {
  return (
    <ToolErrorBoundary>
      <FilterToolShell
      title="Grayscale Converter"
      description="Convert your color image to black and white. Uses the luminosity method for natural-looking grayscale that preserves detail and contrast. All processing happens in your browser."
      filterType="grayscale"
      params={[]}
      faqs={[
        {
          question: "How is the grayscale conversion calculated?",
          answer: "This tool uses the luminosity method: Gray = 0.299 × Red + 0.587 × Green + 0.114 × Blue. This produces a natural-looking grayscale that matches human perception.",
        },
        {
          question: "Does grayscale conversion reduce file size?",
          answer: "The output is a PNG file. Because grayscale images have less color data, PNG compression may reduce file size, but the effect varies by image content.",
        },
        {
          question: "Can I convert back to color?",
          answer: "No, once converted to grayscale, the color information is permanently removed. Upload the original image again if you need a color version.",
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
