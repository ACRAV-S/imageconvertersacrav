import type { Metadata } from "next";
import CodeToolShell from "@/components/tools/dev/CodeToolShell";

export const metadata: Metadata = {
  title: "JSON Formatter",
  description: "Format JSON data online with proper indentation. Free, fast, and private — all in your browser. Validate and beautify your JSON.",
};

export default function Page() {
  return (
    <CodeToolShell
      title="JSON Formatter"
      description="Format your JSON data with proper indentation and line breaks. Paste your JSON, click Transform, and get beautifully formatted output."
      mode="json-format"
      sample='{"name":"John","age":30,"city":"New York"}'
      faqs={[
        { question: "What does JSON formatting do?", answer: "JSON formatting adds indentation and line breaks to make your JSON data human-readable. It uses 2-space indentation for clean, consistent output." },
        { question: "Is my data sent to a server?", answer: "Never. Everything runs in your browser. Your JSON never leaves your device." },
        { question: "What if I get an error?", answer: "The tool will show a descriptive error message if your JSON is invalid, helping you find and fix syntax issues." },
      ]}
    />
  );
}
