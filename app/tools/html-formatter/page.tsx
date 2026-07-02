import type { Metadata } from "next";
import CodeToolShell from "@/components/tools/dev/CodeToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "HTML Formatter",
  description: "Format and indent HTML code online. Make your markup clean, readable, and well-structured. Free and private.",
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <CodeToolShell
      title="HTML Formatter"
      description="Format your HTML code with proper indentation. Handles nested tags, self-closing elements, and comments."
      mode="html-format"
      faqs={[
        { question: "How does HTML formatting work?", answer: "The formatter parses your HTML by tracking opening and closing tags, adding appropriate indentation at each level. Self-closing tags and void elements are handled correctly." },
        { question: "Is my data sent to a server?", answer: "Never. Everything runs in your browser." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
