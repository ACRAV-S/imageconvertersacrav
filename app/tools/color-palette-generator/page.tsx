import type { Metadata } from "next";
import ColorPaletteTool from "@/components/tools/color/ColorPaletteTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Color Palette Generator - Create Color Schemes Online | ImageConvertersACRAV",
  description: "Generate harmonious color palettes from any seed color. Get monochrome, complementary, analogous, and triadic schemes.",
  openGraph: { title: "Color Palette Generator - Free Online Color Scheme Creator", description: "Generate color palettes from any seed color. Monochrome, complementary, analogous, and triadic schemes." },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <ColorPaletteTool
      title="Color Palette Generator"
      description="Generate harmonious color palettes from any seed color. Get monochrome, complementary, analogous, and triadic schemes."
      faqs={[
        { question: "What palette types are generated?", answer: "Four palette types: Monochrome (variations of one hue), Complementary (colors opposite on the color wheel), Analogous (adjacent colors), and Triadic (evenly spaced colors)." },
        { question: "How are the colors generated?", answer: "Colors are generated algorithmically by manipulating HSL values. Monochrome varies lightness, complementary shifts hue by 180 degrees, analogous shifts hue by small increments, and triadic spaces hues by 120 degrees." },
        { question: "Can I use these palettes commercially?", answer: "Yes. The generated colors are produced algorithmically and have no copyright restrictions. You can use them in any project." },
        { question: "Is this tool free and secure?", answer: "Yes. All palette generation is client-side and private." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
