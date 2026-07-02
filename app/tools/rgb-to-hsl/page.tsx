import type { Metadata } from "next";
import ColorToolShell from "@/components/tools/color/ColorToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "RGB to HSL Converter - Convert RGB to HSL Online | ImageConvertersACRAV",
  description: "Convert RGB color values to HSL format. Understand color in terms of hue, saturation, and lightness.",
  openGraph: { title: "RGB to HSL Converter - Free Online Color Space Converter", description: "Convert RGB values to HSL format for intuitive color understanding." },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <ColorToolShell
      title="RGB to HSL Converter"
      description="Convert RGB color values to HSL format. Understand color in terms of hue, saturation, and lightness."
      mode="rgb-to-hsl"
      faqs={[
        { question: "How is HSL calculated from RGB?", answer: "HSL is calculated by normalizing RGB values, finding the max/min to determine lightness, calculating saturation from the range, and mapping hue based on which primary color dominates." },
        { question: "Is HSL better than RGB?", answer: "Neither is inherently better. HSL is more intuitive for humans to adjust, while RGB is how screens display colors. Many designers use HSL for color picking and RGB/HEX for implementation." },
        { question: "What do the HSL values represent?", answer: "Hue determines the base color (0=red, 120=green, 240=blue). Saturation controls color intensity (gray vs vivid). Lightness controls brightness (black to white)." },
        { question: "Is this tool free and secure?", answer: "Yes. All processing is client-side. No data is uploaded." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
