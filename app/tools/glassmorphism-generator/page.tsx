import type { Metadata } from "next";
import CssGeneratorShell from "@/components/tools/color/CssGeneratorShell";

export const metadata: Metadata = {
  title: "Glassmorphism Generator - Create Glass Effect Online | ImageConvertersACRAV",
  description: "Create glassmorphism effects with backdrop blur, transparency, and shadow controls. Copy ready CSS.",
  openGraph: { title: "Glassmorphism Generator - Free Online Glass Effect Creator", description: "Create frosted glass UI effects with backdrop blur, transparency, and shadow controls." },
};

export default function Page() {
  return (
    <CssGeneratorShell
      title="Glassmorphism Generator"
      description="Create glassmorphism effects with backdrop blur, transparency, and shadow controls. Copy ready CSS."
      mode="glassmorphism"
      faqs={[
        { question: "What is glassmorphism?", answer: "Glassmorphism is a UI design trend that creates a frosted glass effect using background transparency, backdrop blur, and subtle shadows. It gives elements a translucent, glass-like appearance." },
        { question: "Do I need to set a background for the parent?", answer: "Yes. Glassmorphism works best when there is a colorful or gradient background behind the glass element. The effect creates the illusion of seeing through to whatever is below." },
        { question: "Will the generated CSS work in all browsers?", answer: "Backdrop-filter is supported in all modern browsers including Chrome, Firefox, Safari, and Edge. We include -webkit-backdrop-filter for Safari compatibility." },
        { question: "Is this tool free and secure?", answer: "Yes. All generation is client-side and private." },
      ]}
    />
  );
}
