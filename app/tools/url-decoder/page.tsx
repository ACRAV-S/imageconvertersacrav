import type { Metadata } from "next";
import CodeToolShell from "@/components/tools/dev/CodeToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "URL Decoder",
  description: "Decode percent-encoded URLs back to readable text online. Free, fast, and private.",
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <CodeToolShell
      title="URL Decoder"
      description="Convert percent-encoded URLs back to their original readable form. Perfect for debugging query parameters."
      mode="url-decode"
      placeholder="Paste encoded URL..."
      faqs={[
        { question: "What is percent encoding?", answer: "Percent encoding replaces unsafe ASCII characters with % followed by two hex digits. For example, a space becomes %20." },
        { question: "Is my data sent to a server?", answer: "Never. Everything runs in your browser." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
