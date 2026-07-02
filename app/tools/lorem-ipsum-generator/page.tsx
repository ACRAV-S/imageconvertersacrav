import type { Metadata } from "next";
import TextGeneratorTool from "@/components/tools/text/TextGeneratorTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Generate Placeholder Text | ImageConvertersACRAV",
  description:
    "Generate placeholder text in words, sentences, or paragraphs. Perfect for design mockups and layouts. Free online lorem ipsum generator.",
  openGraph: {
    title: "Lorem Ipsum Generator - Free Online Placeholder Text Tool",
    description:
      "Generate lorem ipsum placeholder text in words, sentences, or paragraphs. Customize the amount of text generated.",
  },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <TextGeneratorTool
      title="Lorem Ipsum Generator"
      description="Generate placeholder text in words, sentences, or paragraphs. Perfect for design mockups and layouts."
      mode="lorem-ipsum"
      faqs={[
        {
          question: "What is Lorem Ipsum?",
          answer: "Lorem Ipsum is dummy text used in the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s. It is used to demonstrate the visual form of a document or typeface without relying on meaningful content.",
        },
        {
          question: "What generation modes are available?",
          answer: "You can generate text in three modes: Words (individual Lorem Ipsum words), Sentences (complete Lorem Ipsum sentences), and Paragraphs (multi-sentence Lorem Ipsum paragraphs with proper structure). Use the slider to control the amount of text.",
        },
        {
          question: "Why use placeholder text instead of real content?",
          answer: "Placeholder text allows designers and developers to focus on layout, typography, and visual design without being distracted by actual content. It helps clients visualize the final design before content is ready.",
        },
        {
          question: "Can I use this for commercial projects?",
          answer: "Yes, Lorem Ipsum text is public domain and can be freely used in any project, commercial or personal. It has no copyright restrictions.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
