import type { Metadata } from "next";
import GradientTool from "@/components/tools/color/GradientTool";

export const metadata: Metadata = {
  title: "CSS Gradient Generator - Generate Gradient CSS Online | ImageConvertersACRAV",
  description: "Generate CSS gradient code with visual preview. Copy ready-to-use linear, radial, and conic gradient CSS.",
  openGraph: { title: "CSS Gradient Generator - Free Online CSS Gradient Code Tool", description: "Generate and copy CSS gradient code with live visual preview." },
};

export default function Page() {
  return (
    <GradientTool
      title="CSS Gradient Generator"
      description="Generate CSS gradient code with visual preview. Copy ready-to-use linear, radial, and conic gradient CSS."
      emphasizeCss
      faqs={[
        { question: "What CSS gradient code is generated?", answer: "The generator produces standard CSS gradient functions including linear-gradient(), radial-gradient(), and conic-gradient() with proper syntax for all modern browsers." },
        { question: "How do I use the generated code?", answer: "Click 'Copy CSS' to copy the gradient code to your clipboard. Then paste it into your CSS file as the value of the 'background' or 'background-image' property." },
        { question: "Does the code work in all browsers?", answer: "CSS gradients are supported in all modern browsers (Chrome, Firefox, Safari, Edge). The code we generate follows standard W3C syntax for maximum compatibility." },
        { question: "Is this tool free and secure?", answer: "Yes. All generation happens client-side. No data is sent to any server." },
      ]}
    />
  );
}
