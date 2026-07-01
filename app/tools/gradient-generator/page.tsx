import type { Metadata } from "next";
import GradientTool from "@/components/tools/color/GradientTool";

export const metadata: Metadata = {
  title: "Gradient Generator - Create CSS Gradients Online | ImageConvertersACRAV",
  description: "Create beautiful CSS gradients with customizable color stops, gradient types, and angles. Live preview included.",
  openGraph: { title: "Gradient Generator - Free Online CSS Gradient Creator", description: "Create beautiful CSS gradients with live preview. Supports linear, radial, and conic gradients." },
};

export default function Page() {
  return (
    <GradientTool
      title="Gradient Generator"
      description="Create beautiful CSS gradients with customizable color stops, gradient types, and angles. Live preview included."
      faqs={[
        { question: "What gradient types are supported?", answer: "We support three gradient types: Linear (straight line), Radial (circular from center), and Conic (around a center point). Each type has unique visual characteristics for different design needs." },
        { question: "How do color stops work?", answer: "Color stops define the colors in your gradient and where they transition. Each stop has a color and a position (0-100%). You can add up to 10 color stops and arrange them in any order." },
        { question: "What angle options are available for linear gradients?", answer: "You can enter any angle in degrees (e.g., 90deg for horizontal, 180deg for vertical, 45deg for diagonal). Common presets like 'to bottom', 'to right', 'to bottom right' also work." },
        { question: "Is this tool free and secure?", answer: "Yes. All gradient generation happens in your browser. No data is uploaded." },
      ]}
    />
  );
}
