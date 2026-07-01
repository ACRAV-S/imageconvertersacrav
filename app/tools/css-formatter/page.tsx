import type { Metadata } from "next";
import CodeToolShell from "@/components/tools/dev/CodeToolShell";

export const metadata: Metadata = {
  title: "CSS Formatter",
  description: "Format and indent CSS code online. Organize your stylesheets with proper line breaks and spacing. Free and private.",
};

export default function Page() {
  return (
    <CodeToolShell
      title="CSS Formatter"
      description="Format your CSS code with proper indentation and line breaks. Transforms minified or messy CSS into a clean, readable stylesheet."
      mode="css-format"
      faqs={[
        { question: "How does CSS formatting work?", answer: "The formatter adds line breaks after opening braces, semicolons, and closing braces, with proper indentation based on nesting level." },
        { question: "Is my data sent to a server?", answer: "Never. Everything runs in your browser." },
      ]}
    />
  );
}
