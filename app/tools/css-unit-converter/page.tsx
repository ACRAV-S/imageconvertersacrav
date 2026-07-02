import type { Metadata } from "next";
import UnitConverterTool from "@/components/tools/color/UnitConverterTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "CSS Unit Converter - Convert px rem em Online | ImageConvertersACRAV",
  description: "Convert between px, rem, and em units. Includes configurable base font size and reference conversion table.",
  openGraph: { title: "CSS Unit Converter - Free Online px rem em Converter", description: "Convert between CSS units px, rem, and em with configurable base font size and reference table." },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <UnitConverterTool
      title="CSS Unit Converter"
      description="Convert between px, rem, and em units. Includes configurable base font size and reference conversion table."
      faqs={[
        { question: "What is the difference between rem and em?", answer: "rem (root em) is relative to the root element's font size (usually 16px in browsers). em is relative to the parent element's font size. This means rem is more predictable while em compounds with nesting." },
        { question: "Why use rem over px?", answer: "Using rem instead of px allows your layout to scale proportionally when users change their browser's default font size. This improves accessibility and makes responsive design easier." },
        { question: "What is the default base font size?", answer: "The default browser font size is 16px. You can adjust the base size in the converter to match your design system's root font size." },
        { question: "Is this tool free and secure?", answer: "Yes. All conversion happens client-side in your browser." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
