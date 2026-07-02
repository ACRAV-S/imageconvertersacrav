import type { Metadata } from "next";
import TextToolShell from "@/components/tools/text/TextToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Paragraph Counter - Count Paragraphs Online | ImageConvertersACRAV",
  description:
    "Count paragraphs, detect empty lines, and analyze paragraph length in your text. Free online paragraph counter.",
  openGraph: {
    title: "Paragraph Counter - Free Online Paragraph Analysis Tool",
    description:
      "Count the total number of paragraphs in your text, detect empty lines, and calculate average paragraph length in characters.",
  },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <TextToolShell
      title="Paragraph Counter"
      description="Count paragraphs, detect empty lines, and analyze paragraph length in your text."
      mode="paragraph-count"
      faqs={[
        {
          question: "How are paragraphs counted?",
          answer: "Paragraphs are detected by double line breaks (one or more empty lines between text blocks). Each block of text separated by blank lines counts as one paragraph. Single line breaks within a paragraph are not counted as paragraph separators.",
        },
        {
          question: "What are empty lines?",
          answer: "Empty lines are lines in your text that contain only whitespace or nothing at all. They are detected separately from content lines and reported as part of the paragraph analysis.",
        },
        {
          question: "Why would I need to count paragraphs?",
          answer: "Paragraph counting is useful for academic writing, content creation, SEO analysis, and ensuring proper text structure. Many writing guidelines specify minimum or maximum paragraph counts for different types of content.",
        },
        {
          question: "Is my text secure?",
          answer: "Yes. All analysis is done locally in your browser. Your text is never processed or stored on any external server.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
