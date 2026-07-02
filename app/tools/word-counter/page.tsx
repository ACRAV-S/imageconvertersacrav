import type { Metadata } from "next";
import TextToolShell from "@/components/tools/text/TextToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Word Counter - Count Words Online | ImageConvertersACRAV",
  description:
    "Count words, unique words, characters, sentences, paragraphs, and reading time in any text instantly. Free online word counter tool.",
  openGraph: {
    title: "Word Counter - Free Online Text Analysis Tool",
    description:
      "Analyze your text with our free word counter. Get word count, character count, sentence count, paragraph count, and reading time estimates.",
  },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <TextToolShell
      title="Word Counter"
      description="Count words, unique words, characters, sentences, paragraphs, and reading time in any text instantly."
      mode="word-count"
      faqs={[
        {
          question: "How does the word counter work?",
          answer: "The word counter splits your text by whitespace and counts the resulting words. It also identifies unique words (case-insensitive), counts characters with and without spaces, detects sentences by punctuation marks, and calculates paragraphs by double line breaks.",
        },
        {
          question: "What is the difference between characters with and without spaces?",
          answer: "Characters with spaces counts every character including spaces, tabs, and line breaks. Characters without spaces excludes all whitespace, giving you the actual letter, digit, and symbol count.",
        },
        {
          question: "How is reading time calculated?",
          answer: "Reading time is calculated at 238 words per minute (average reading speed). Speaking time is calculated at 183 words per minute (average speaking speed). Both are rounded up to the nearest minute.",
        },
        {
          question: "Is my text stored or uploaded anywhere?",
          answer: "No. All text processing happens entirely in your browser. Your text is never sent to any server or stored anywhere. It is completely private and secure.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
