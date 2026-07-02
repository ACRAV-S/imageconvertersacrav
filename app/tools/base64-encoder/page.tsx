import type { Metadata } from "next";
import CodeToolShell from "@/components/tools/dev/CodeToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Base64 Encoder",
  description: "Encode text to Base64 online. Free, fast, and private — all in your browser. Perfect for data URIs and API requests.",
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <CodeToolShell
      title="Base64 Encoder"
      description="Encode any text to Base64 format. Useful for data URIs, API authentication, and binary data transmission."
      mode="base64-encode"
      faqs={[
        { question: "What is Base64 encoding?", answer: "Base64 encodes binary data into an ASCII string format using 64 characters. It's commonly used for embedding images in HTML/CSS and transmitting data in APIs." },
        { question: "Is my data sent to a server?", answer: "Never. Everything runs in your browser." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
