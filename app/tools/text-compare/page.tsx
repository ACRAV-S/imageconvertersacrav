import type { Metadata } from "next";
import TextCompareTool from "@/components/tools/text/TextCompareTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Text Compare (Diff) - Compare Text Online | ImageConvertersACRAV",
  description:
    "Compare two texts side by side and see the differences highlighted. Find added and removed lines instantly. Free online text diff tool.",
  openGraph: {
    title: "Text Compare - Free Online Diff Tool",
    description:
      "Compare two texts side by side. See added lines highlighted in green and removed lines in red. Perfect for version comparison.",
  },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <TextCompareTool
      title="Text Compare (Diff)"
      description="Compare two texts side by side and see the differences highlighted. Find added and removed lines instantly."
      faqs={[
        {
          question: "How does the diff comparison work?",
          answer: "The tool compares two texts line by line. Lines that appear only in the original text are marked as removed (highlighted in red). Lines that appear only in the modified text are marked as added (highlighted in green). Unchanged lines are shown in neutral color.",
        },
        {
          question: "Is this a proper diff algorithm?",
          answer: "This is a line-by-line comparison that shows differences between corresponding lines. For more complex diffs with moved lines or nested changes, a dedicated diff library would be needed. This tool works best for straightforward text comparisons.",
        },
        {
          question: "When would I use this tool?",
          answer: "This tool is useful for comparing document versions, reviewing code changes, checking for differences in configuration files, verifying that text edits were applied correctly, or comparing any two versions of text content.",
        },
        {
          question: "Is my text private?",
          answer: "Yes. All comparison processing is done locally in your browser. Your text is never uploaded to any server.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
