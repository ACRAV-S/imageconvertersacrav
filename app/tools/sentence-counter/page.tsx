import type { Metadata } from "next";
import TextToolShell from "@/components/tools/text/TextToolShell";

export const metadata: Metadata = {
  title: "Sentence Counter - Count Sentences Online | ImageConvertersACRAV",
  description:
    "Count sentences and analyze sentence length distribution in any text document. Free online sentence counter tool.",
  openGraph: {
    title: "Sentence Counter - Free Online Sentence Analysis Tool",
    description:
      "Count the total number of sentences in your text. Find the shortest, longest, and average sentence length in words.",
  },
};

export default function Page() {
  return (
    <TextToolShell
      title="Sentence Counter"
      description="Count sentences and analyze sentence length distribution in any text document."
      mode="sentence-count"
      faqs={[
        {
          question: "How are sentences detected?",
          answer: "Sentences are detected by splitting text at punctuation marks (periods, exclamation points, and question marks). Each resulting segment is trimmed and counted as a sentence, with length measured in words.",
        },
        {
          question: "What does shortest and longest sentence mean?",
          answer: "The shortest sentence is the sentence with the fewest words, and the longest sentence has the most words. This helps you understand the variety and complexity of your writing style.",
        },
        {
          question: "Can I use this for improving my writing?",
          answer: "Yes. Analyzing sentence length distribution helps identify patterns - too many very short sentences can feel choppy, while very long sentences may be hard to read. Use it to balance your writing rhythm.",
        },
        {
          question: "Is my text private?",
          answer: "Yes. All processing happens client-side in your browser. Your text is never uploaded or stored on any server.",
        },
      ]}
    />
  );
}
