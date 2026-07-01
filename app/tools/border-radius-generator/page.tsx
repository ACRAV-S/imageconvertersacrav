import type { Metadata } from "next";
import CssGeneratorShell from "@/components/tools/color/CssGeneratorShell";

export const metadata: Metadata = {
  title: "Border Radius Generator - Create Rounded Corners Online | ImageConvertersACRAV",
  description: "Generate custom border-radius CSS with per-corner control. Create rounded corners for any element.",
  openGraph: { title: "Border Radius Generator - Free Online CSS Rounded Corners Tool", description: "Create custom border-radius CSS with individual corner control and live preview." },
};

export default function Page() {
  return (
    <CssGeneratorShell
      title="Border Radius Generator"
      description="Generate custom border-radius CSS with per-corner control. Create rounded corners for any element."
      mode="border-radius"
      faqs={[
        { question: "What is border-radius?", answer: "Border-radius is a CSS property that rounds the corners of an element. You can set different values for each corner to create various shapes." },
        { question: "How do individual corner values work?", answer: "The four values correspond to top-left, top-right, bottom-right, and bottom-left corners in clockwise order. When all values are equal, the output uses shorthand syntax." },
        { question: "What units are supported?", answer: "You can use px (pixels) for fixed sizes or % (percentage) for relative sizing. Percentage is relative to the element's dimensions." },
        { question: "Is this tool free and secure?", answer: "Yes. All processing is client-side and private." },
      ]}
    />
  );
}
