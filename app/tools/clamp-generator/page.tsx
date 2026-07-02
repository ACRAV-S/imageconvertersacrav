import type { Metadata } from "next";
import ClampGeneratorTool from "@/components/tools/color/ClampGeneratorTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "CSS Clamp Generator - Generate Fluid Typography Online | ImageConvertersACRAV",
  description: "Generate fluid typography with CSS clamp(). Set min/max sizes and viewport ranges for responsive text.",
  openGraph: { title: "CSS Clamp Generator - Free Online Fluid Typography Tool", description: "Generate CSS clamp() values for fluid typography with customizable min/max sizes and viewport ranges." },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <ClampGeneratorTool
      title="CSS Clamp Generator"
      description="Generate fluid typography with CSS clamp(). Set min/max sizes and viewport ranges for responsive text."
      faqs={[
        { question: "What is CSS clamp()?", answer: "CSS clamp() is a CSS function that allows you to set a value that is fluid between a minimum and maximum. It takes three parameters: minimum value, preferred value, and maximum value." },
        { question: "How does fluid typography work?", answer: "Fluid typography scales text size smoothly between viewport breakpoints. The clamp() function calculates the ideal size based on viewport width, ensuring readability on all screen sizes." },
        { question: "What viewport values should I use?", answer: "Common breakpoints: 375px (mobile), 768px (tablet), 1200px (desktop), 1920px (large desktop). The min viewport should be the smallest screen you support and max viewport the largest." },
        { question: "Is this tool free and secure?", answer: "Yes. All calculations are client-side and private." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
