import type { Metadata } from "next";
import CodeToolShell from "@/components/tools/dev/CodeToolShell";

export const metadata: Metadata = {
  title: "JSON Validator",
  description: "Validate JSON data online and get detailed error messages. Free and private — all in your browser.",
};

export default function Page() {
  return (
    <CodeToolShell
      title="JSON Validator"
      description="Check if your JSON is syntactically correct. Get detailed error messages with line numbers to quickly find and fix issues."
      mode="json-validate"
      faqs={[
        { question: "What does JSON validation check?", answer: "It parses your JSON and reports whether it's valid or invalid. If invalid, it shows the specific error message from the JSON parser." },
        { question: "Is my data sent to a server?", answer: "Never. Everything runs in your browser." },
      ]}
    />
  );
}
