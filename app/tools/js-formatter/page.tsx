import type { Metadata } from "next";
import CodeToolShell from "@/components/tools/dev/CodeToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "JavaScript Formatter",
  description: "Format and indent JavaScript code online. Keep your scripts clean, readable, and consistently styled. Free and private.",
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <CodeToolShell
      title="JavaScript Formatter"
      description="Format your JavaScript code with proper indentation. Handles braces, brackets, semicolons, and string literals."
      mode="js-format"
      faqs={[
        { question: "How does JS formatting work?", answer: "The formatter tracks brace and bracket depth, adding appropriate indentation. String literals are preserved without modification." },
        { question: "Is my data sent to a server?", answer: "Never. Everything runs in your browser. Your code never leaves your device." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
