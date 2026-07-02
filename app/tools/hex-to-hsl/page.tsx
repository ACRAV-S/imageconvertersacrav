import type { Metadata } from "next";
import ColorToolShell from "@/components/tools/color/ColorToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "HEX to HSL Converter - Convert Hex to HSL Online | ImageConvertersACRAV",
  description: "Convert HEX color codes to HSL (Hue, Saturation, Lightness) values for intuitive color manipulation.",
  openGraph: { title: "HEX to HSL Converter - Free Online Color Converter", description: "Convert hex color codes to HSL values for easier color manipulation." },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <ColorToolShell
      title="HEX to HSL Converter"
      description="Convert HEX color codes to HSL values for intuitive color manipulation."
      mode="hex-to-hsl"
      faqs={[
        { question: "What is HSL?", answer: "HSL stands for Hue, Saturation, and Lightness. Hue is measured in degrees (0-360) on the color wheel. Saturation and Lightness are percentages (0-100%). HSL is often more intuitive than RGB for manual color adjustments." },
        { question: "Why use HSL over RGB?", answer: "HSL makes it easier to create color variations. To make a color lighter, increase lightness. To make it more vibrant, increase saturation. To shift the color, change the hue. These operations are complex with RGB." },
        { question: "What is the range of HSL values?", answer: "Hue: 0-360 degrees, Saturation: 0-100%, Lightness: 0-100%. A lightness of 0% is always black, 100% is always white." },
        { question: "Is this tool free and secure?", answer: "Yes. All conversion happens in your browser. Your data is never sent to any server." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
