import type { Metadata } from "next";
import ColorToolShell from "@/components/tools/color/ColorToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "HEX to RGB Converter - Convert Hex Colors Online | ImageConvertersACRAV",
  description: "Convert HEX color codes to RGB values instantly. Supports 3-digit and 6-digit hex formats. Free online color converter.",
  openGraph: { title: "HEX to RGB Converter - Free Online Color Converter", description: "Convert hex color codes to RGB values instantly with live preview." },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <ColorToolShell
      title="HEX to RGB Converter"
      description="Convert HEX color codes to RGB values instantly. Supports 3-digit and 6-digit hex formats."
      mode="hex-to-rgb"
      faqs={[
        { question: "What is HEX color format?", answer: "HEX is a color format that uses a hexadecimal value to represent colors. It consists of a hash (#) followed by six characters (0-9 and A-F), where the first two represent red, the middle two green, and the last two blue." },
        { question: "What is the RGB color format?", answer: "RGB stands for Red, Green, Blue. It represents colors using three numbers ranging from 0 to 255, each indicating the intensity of its respective color channel." },
        { question: "Can I convert HEX with opacity?", answer: "This converter handles standard 6-digit (#RRGGBB) and shorthand 3-digit (#RGB) hex formats. For hex with alpha (#RRGGBBAA), currently only the first 6 digits are converted." },
        { question: "Is this tool free and secure?", answer: "Yes. All color conversions happen locally in your browser. No data is sent to any server." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
