import type { Metadata } from "next";
import CodeToolShell from "@/components/tools/dev/CodeToolShell";

export const metadata: Metadata = {
  title: "JSON Beautifier",
  description: "Beautify messy JSON online with proper indentation. Free, fast, and private — all in your browser.",
};

export default function Page() {
  return (
    <CodeToolShell
      title="JSON Beautifier"
      description="Take ugly, minified, or poorly formatted JSON and make it beautiful with proper indentation and line breaks."
      mode="json-beautify"
      faqs={[
        { question: "What's the difference between format and beautify?", answer: "Both produce the same result — properly indented JSON. The terms are used interchangeably in this context." },
        { question: "Is my data sent to a server?", answer: "Never. Everything runs in your browser." },
      ]}
    />
  );
}
