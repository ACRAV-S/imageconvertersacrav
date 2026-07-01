import type { Metadata } from "next";
import CodeToolShell from "@/components/tools/dev/CodeToolShell";

export const metadata: Metadata = {
  title: "Base64 Decoder",
  description: "Decode Base64 encoded text back to readable format online. Free, fast, and private — all in your browser.",
};

export default function Page() {
  return (
    <CodeToolShell
      title="Base64 Decoder"
      description="Decode Base64 encoded text back to its original readable format. Supports standard Base64 strings."
      mode="base64-decode"
      placeholder="Paste Base64 to decode..."
      faqs={[
        { question: "What Base64 formats are supported?", answer: "Standard Base64 encoding/decoding is supported. If the input is not valid Base64, you'll get a clear error message." },
        { question: "Is my data sent to a server?", answer: "Never. Everything runs in your browser." },
      ]}
    />
  );
}
