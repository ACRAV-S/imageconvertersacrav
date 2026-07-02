import type { Metadata } from "next";
import TextToolShell from "@/components/tools/text/TextToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Character Counter - Count Characters Online | ImageConvertersACRAV",
  description:
    "Count characters with and without spaces, letters, digits, and special characters in your text. Free online character counter.",
  openGraph: {
    title: "Character Counter - Free Online Character Counting Tool",
    description:
      "Count every type of character in your text: total characters, characters without spaces, letters, digits, spaces, and special symbols.",
  },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <TextToolShell
      title="Character Counter"
      description="Count characters with and without spaces, letters, digits, and special characters in your text."
      mode="char-count"
      faqs={[
        {
          question: "What types of characters are counted?",
          answer: "The character counter breaks down your text into six categories: total characters (including spaces), characters without spaces, letters (a-z, A-Z), digits (0-9), spaces (including tabs and line breaks), and special characters (punctuation, symbols, and everything else).",
        },
        {
          question: "Why should I count characters without spaces?",
          answer: "Character count without spaces gives you the actual content size of your text. This is useful for word counts in essays, content writing limits, and text message character limits that exclude spaces.",
        },
        {
          question: "Does it count emojis and special Unicode characters?",
          answer: "Yes, the character counter works with all Unicode characters including emojis, accented letters, and symbols from any language. They are categorized as letters (if alphabetic) or special characters.",
        },
        {
          question: "Is the text processing secure?",
          answer: "Absolutely. All text processing is done entirely in your browser using JavaScript. Your text never leaves your device and is not stored anywhere.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
