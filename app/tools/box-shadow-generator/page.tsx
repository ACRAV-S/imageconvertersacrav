import type { Metadata } from "next";
import CssGeneratorShell from "@/components/tools/color/CssGeneratorShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Box Shadow Generator - Create CSS Shadows Online | ImageConvertersACRAV",
  description: "Create beautiful box shadows with interactive controls. Customize offset, blur, spread, and color with live preview.",
  openGraph: { title: "Box Shadow Generator - Free Online CSS Shadow Creator", description: "Create and customize CSS box shadows with interactive sliders and live preview." },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <CssGeneratorShell
      title="Box Shadow Generator"
      description="Create beautiful box shadows with interactive controls. Customize offset, blur, spread, and color with live preview."
      mode="box-shadow"
      faqs={[
        { question: "What do the box shadow parameters mean?", answer: "Offset X/Y controls shadow position. Blur controls softness. Spread controls size. Color sets the shadow color. Inset makes the shadow appear inside the element." },
        { question: "How do I use the generated CSS?", answer: "Copy the CSS code and paste it into your stylesheet. The generated code is a complete box-shadow property value ready to use." },
        { question: "Can I create multiple shadows?", answer: "This generator creates a single box shadow. For multiple shadows, you can manually combine multiple values separated by commas in your CSS." },
        { question: "Is this tool free and secure?", answer: "Yes. All processing is client-side and private." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
