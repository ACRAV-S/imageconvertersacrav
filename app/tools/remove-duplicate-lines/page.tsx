import type { Metadata } from "next";
import TextToolShell from "@/components/tools/text/TextToolShell";

export const metadata: Metadata = {
  title: "Remove Duplicate Lines - Deduplicate Text Online | ImageConvertersACRAV",
  description:
    "Remove duplicate lines from text while preserving the original order of unique lines. Free online duplicate line remover.",
  openGraph: {
    title: "Remove Duplicate Lines - Free Online Text Deduplication Tool",
    description:
      "Clean up your text by removing duplicate lines. Preserves the original order of first occurrence for each unique line.",
  },
};

export default function Page() {
  return (
    <TextToolShell
      title="Remove Duplicate Lines"
      description="Remove duplicate lines from text while preserving the original order of unique lines."
      mode="remove-duplicates"
      faqs={[
        {
          question: "How does duplicate line removal work?",
          answer: "The tool processes your text line by line, keeping track of each unique line content. When a duplicate line is found, it is skipped. The original order of first occurrence is preserved for all unique lines.",
        },
        {
          question: "Does it consider leading/trailing spaces when comparing lines?",
          answer: "Yes, line comparison is done after trimming whitespace. Lines that differ only in whitespace are considered duplicates of the first trimmed version.",
        },
        {
          question: "When would I use this tool?",
          answer: "This tool is useful when cleaning up lists, removing duplicate entries from CSV data, deduplicating log files, or cleaning up copied text that has repeated lines.",
        },
        {
          question: "Is my data private?",
          answer: "Yes. All processing is done locally in your browser. Your text never leaves your device.",
        },
      ]}
    />
  );
}
