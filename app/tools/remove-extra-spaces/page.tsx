import type { Metadata } from "next";
import TextToolShell from "@/components/tools/text/TextToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Remove Extra Spaces - Clean Text Online | ImageConvertersACRAV",
  description:
    "Remove extra spaces, tabs, and blank lines from text. Clean up messy formatting instantly. Free online text cleaner.",
  openGraph: {
    title: "Remove Extra Spaces - Free Online Text Cleaner Tool",
    description:
      "Clean up your text by removing extra spaces, tabs, and excessive blank lines. Improves text readability instantly.",
  },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <TextToolShell
      title="Remove Extra Spaces"
      description="Remove extra spaces, tabs, and blank lines from text. Clean up messy formatting instantly."
      mode="remove-spaces"
      faqs={[
        {
          question: "What does this tool clean up?",
          answer: "The tool removes multiple consecutive spaces (replaces them with a single space), removes tabs and replaces them with spaces, eliminates excessive blank lines (more than one consecutive empty line is reduced to one), and trims leading/trailing whitespace from each line.",
        },
        {
          question: "Will it remove all line breaks?",
          answer: "No, single line breaks are preserved. Only excessive blank lines (three or more consecutive newlines) are reduced to a maximum of two (one blank line between paragraphs).",
        },
        {
          question: "When would I use this tool?",
          answer: "This tool is useful when pasting text from PDFs, emails, or websites that often includes inconsistent spacing. It is also helpful for cleaning up code comments, preparing text for publishing, or normalizing whitespace before processing.",
        },
        {
          question: "Is this tool free and private?",
          answer: "Yes. Completely free with no data uploaded to any server. All processing happens locally in your browser.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
