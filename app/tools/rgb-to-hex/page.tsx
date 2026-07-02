import type { Metadata } from "next";
import ColorToolShell from "@/components/tools/color/ColorToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "RGB to HEX Converter - Convert RGB Colors Online | ImageConvertersACRAV",
  description: "Convert RGB color values to HEX codes instantly. Supports individual R, G, B channel input. Free online color converter.",
  openGraph: { title: "RGB to HEX Converter - Free Online Color Converter", description: "Convert RGB values to hex color codes instantly with live preview." },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <ColorToolShell
      title="RGB to HEX Converter"
      description="Convert RGB color values to HEX codes instantly. Supports individual R, G, B channel input."
      mode="rgb-to-hex"
      faqs={[
        { question: "How does RGB to HEX conversion work?", answer: "Each RGB channel value (0-255) is converted to a two-digit hexadecimal number. The three pairs are then concatenated with a hash prefix to form the HEX color code (#RRGGBB)." },
        { question: "What is the valid range for RGB values?", answer: "Each RGB channel must be between 0 and 255. Values outside this range are automatically clamped to the nearest valid value." },
        { question: "Why use HEX instead of RGB?", answer: "HEX codes are more compact (6 characters vs up to 12 for RGB) and are the standard format for web development. Many design tools and CSS frameworks use HEX as the primary color format." },
        { question: "Is this tool free and secure?", answer: "Yes. All conversion happens locally in your browser. No data is sent anywhere." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
