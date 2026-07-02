import type { Metadata } from "next";
import ColorPickerTool from "@/components/tools/color/ColorPickerTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Color Picker - Pick Colors Online | ImageConvertersACRAV",
  description: "Pick colors visually and get instant HEX, RGB, and HSL values. Explore and copy color codes with one click.",
  openGraph: { title: "Color Picker - Free Online Color Picker Tool", description: "Pick any color and get instant HEX, RGB, and HSL values. Copy with one click." },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <ColorPickerTool
      title="Color Picker"
      description="Pick colors visually and get instant HEX, RGB, and HSL values. Explore and copy color codes with one click."
      faqs={[
        { question: "How does the color picker work?", answer: "The color picker uses the native HTML color input which provides a visual color selection interface. As you pick a color, the HEX, RGB, and HSL values update in real-time." },
        { question: "What color formats are supported?", answer: "The color picker displays color values in three formats: HEX (hexadecimal), RGB (Red, Green, Blue), and HSL (Hue, Saturation, Lightness). You can copy any format with one click." },
        { question: "Can I enter a specific color code?", answer: "Yes. You can type any valid HEX color code directly into the input field and the picker will update to show that color." },
        { question: "Is this tool free and secure?", answer: "Yes. All color processing is done locally in your browser. No data is sent to any server." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
