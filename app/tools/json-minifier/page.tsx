import type { Metadata } from "next";
import CodeToolShell from "@/components/tools/dev/CodeToolShell";

export const metadata: Metadata = {
  title: "JSON Minifier",
  description: "Minify JSON online by removing whitespace. Reduce JSON file size for faster transfer. Free and private.",
};

export default function Page() {
  return (
    <CodeToolShell
      title="JSON Minifier"
      description="Remove all unnecessary whitespace from your JSON to reduce its file size. Perfect for API payloads and data transfer."
      mode="json-minify"
      faqs={[
        { question: "How much can JSON be minified?", answer: "Minification typically reduces JSON size by 30-50% by removing indentation, line breaks, and extra spaces." },
        { question: "Is my data sent to a server?", answer: "Never. Everything runs in your browser." },
      ]}
    />
  );
}
