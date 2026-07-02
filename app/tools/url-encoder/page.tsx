import type { Metadata } from "next";
import CodeToolShell from "@/components/tools/dev/CodeToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "URL Encoder",
  description: "Encode text for use in URLs online. Escape special characters to create valid URL components. Free and private.",
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <CodeToolShell
      title="URL Encoder"
      description="Encode text so it can be safely used in URLs. Special characters are converted to percent-encoded format."
      mode="url-encode"
      faqs={[
        { question: "Why do URLs need encoding?", answer: "Certain characters have special meaning in URLs. Encoding replaces them with % followed by their hex code, ensuring the URL is parsed correctly." },
        { question: "Is my data sent to a server?", answer: "Never. Everything runs in your browser." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
