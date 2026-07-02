import type { Metadata } from "next";
import TextToolShell from "@/components/tools/text/TextToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Sort Lines - Alphabetize Text Online | ImageConvertersACRAV",
  description:
    "Sort lines alphabetically in ascending or descending order. Quick and easy text organization tool.",
  openGraph: {
    title: "Sort Lines - Free Online Text Alphabetizer Tool",
    description:
      "Sort any text alphabetically in ascending (A-Z) or descending (Z-A) order. Perfect for organizing lists and data.",
  },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <TextToolShell
      title="Sort Lines"
      description="Sort lines alphabetically in ascending or descending order. Quick and easy text organization."
      mode="sort-lines"
      faqs={[
        {
          question: "How does line sorting work?",
          answer: "The tool splits your text by line breaks, then sorts the lines alphabetically using locale-aware string comparison. You can choose between ascending (A to Z) and descending (Z to A) order.",
        },
        {
          question: "Is the sorting case-sensitive?",
          answer: "The sorting uses standard JavaScript locale comparison, which is case-insensitive for most locales. This means 'apple' and 'Apple' will be sorted naturally regardless of case differences.",
        },
        {
          question: "When is descending sort useful?",
          answer: "Descending (Z-A) sort is useful for reverse-alphabetical lists, viewing the most recent entries first, or quickly finding items at the end of the alphabet.",
        },
        {
          question: "Is this tool free and private?",
          answer: "Yes. Free to use, no registration needed, and all processing happens locally in your browser.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
