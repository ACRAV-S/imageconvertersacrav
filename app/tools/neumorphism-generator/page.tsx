import type { Metadata } from "next";
import CssGeneratorShell from "@/components/tools/color/CssGeneratorShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Neumorphism Generator - Create Soft UI Online | ImageConvertersACRAV",
  description: "Create neumorphic UI elements with soft shadows. Adjust base color, blur, distance, and intensity.",
  openGraph: { title: "Neumorphism Generator - Free Online Soft UI Creator", description: "Create neumorphic UI elements with customizable soft shadows and base color." },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <CssGeneratorShell
      title="Neumorphism Generator"
      description="Create neumorphic UI elements with soft shadows. Adjust base color, blur, distance, and intensity."
      mode="neumorphism"
      faqs={[
        { question: "What is neumorphism?", answer: "Neumorphism (or neomorphism) is a UI design style that creates soft, extruded shapes using dual shadows. A light shadow creates the highlight and a dark shadow creates the depth, giving a subtle 3D effect." },
        { question: "How does the inset option work?", answer: "Inset neumorphism makes the element appear pressed into the surface rather than raised above it. This is useful for buttons, input fields, and interactive elements." },
        { question: "What color works best for neumorphism?", answer: "Neumorphism works best with muted, medium-toned colors. Very dark or very light colors may not show the shadow effect clearly. Gray (#e0e0e0) is the classic choice." },
        { question: "Is this tool free and secure?", answer: "Yes. All generation is client-side and private." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
