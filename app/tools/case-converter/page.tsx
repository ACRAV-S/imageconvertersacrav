import type { Metadata } from "next";
import TextToolShell from "@/components/tools/text/TextToolShell";

export const metadata: Metadata = {
  title: "Case Converter - Convert Text Case Online | ImageConvertersACRAV",
  description:
    "Convert text between lowercase, UPPERCASE, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case. Free online case converter.",
  openGraph: {
    title: "Case Converter - Free Online Text Case Converter Tool",
    description:
      "Convert any text to any case format. Supports 8 case types including camelCase, PascalCase, snake_case, and more.",
  },
};

export default function Page() {
  return (
    <TextToolShell
      title="Case Converter"
      description="Convert text between lowercase, UPPERCASE, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case."
      mode="case-convert"
      faqs={[
        {
          question: "What case formats are supported?",
          answer: "We support 8 case formats: lowercase (all text lowercase), UPPERCASE (all text uppercase), Title Case (first letter of each word capitalized), Sentence case (first letter of each sentence capitalized), camelCase (words joined, first word lowercase), PascalCase (words joined, all words capitalized), snake_case (words separated by underscores), and kebab-case (words separated by hyphens).",
        },
        {
          question: "What is the difference between camelCase and PascalCase?",
          answer: "In camelCase, the first word starts with a lowercase letter and subsequent words start with uppercase (e.g., 'helloWorld'). In PascalCase, every word starts with an uppercase letter (e.g., 'HelloWorld'). PascalCase is also known as UpperCamelCase.",
        },
        {
          question: "Does it preserve formatting like line breaks?",
          answer: "Yes, the case converter preserves your original line breaks and paragraph structure. Only the text case is modified, not the layout.",
        },
        {
          question: "Is this tool free and private?",
          answer: "Yes, completely free and private. All processing happens in your browser with no data sent to any server.",
        },
      ]}
    />
  );
}
