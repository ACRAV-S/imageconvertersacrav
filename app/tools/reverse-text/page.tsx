import type { Metadata } from "next";
import TextToolShell from "@/components/tools/text/TextToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Reverse Text - Reverse Text Online | ImageConvertersACRAV",
  description:
    "Reverse text by characters, words, or lines. Generate mirrored text in multiple ways. Free online text reverser tool.",
  openGraph: {
    title: "Reverse Text - Free Online Text Reverser Tool",
    description:
      "Reverse any text by characters, words, or lines. Three modes of text reversal for different use cases.",
  },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <TextToolShell
      title="Reverse Text"
      description="Reverse text by characters, words, or lines. Generate mirrored text in multiple ways."
      mode="reverse-text"
      faqs={[
        {
          question: "What are the three reverse modes?",
          answer: "Characters reverses the entire text character by character (e.g., 'hello' becomes 'olleh'). Words reverses the order of words while keeping each word intact (e.g., 'hello world' becomes 'world hello'). Lines reverses the order of lines while keeping each line intact.",
        },
        {
          question: "When would I use character reversal?",
          answer: "Character reversal is useful for creating puzzles, mirror text effects, or simple text transformations. It reverses every character including spaces and punctuation.",
        },
        {
          question: "When would I use word reversal?",
          answer: "Word reversal is useful for creating stylistic text variations or for certain types of word puzzles. It reverses the sequence of words but keeps the spelling of each word unchanged.",
        },
        {
          question: "Is my text secure?",
          answer: "Yes. All text processing is done locally in your browser. Your text is never uploaded or stored anywhere.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
