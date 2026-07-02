import type { Metadata } from "next";
import RegexTesterTool from "@/components/tools/dev/RegexTesterTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Regex Tester",
  description: "Test regular expressions against text online. Match, capture groups, and debug patterns in real time. Free and private.",
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <RegexTesterTool
      title="Regex Tester"
      description="Test your regular expressions against sample text. Enter a pattern, flags, and test text to see all matches with their positions and captured groups."
      faqs={[
        { question: "What regex syntax is supported?", answer: "The tool uses JavaScript's RegExp engine, which supports all standard regex features including groups, lookaheads, backreferences, and quantifiers." },
        { question: "What do the flags mean?", answer: "g = global (find all matches), m = multiline (^ and $ match line boundaries), i = case insensitive, s = dotall (. matches newlines), u = unicode." },
        { question: "Is my data sent to a server?", answer: "Never. Everything runs in your browser." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
