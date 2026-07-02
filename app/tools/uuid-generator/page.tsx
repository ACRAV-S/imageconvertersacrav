import type { Metadata } from "next";
import UuidGeneratorTool from "@/components/tools/dev/UuidGeneratorTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "UUID Generator",
  description: "Generate random UUIDs v4 online. Create one or multiple unique identifiers for databases, APIs, and more. Free and private.",
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <UuidGeneratorTool
      title="UUID Generator"
      description="Generate cryptographically secure random UUIDs (v4) using your browser's crypto API. Generate one or multiple at once."
      faqs={[
        { question: "What is a UUID?", answer: "A UUID (Universally Unique Identifier) is a 128-bit identifier formatted as 36 characters. UUID v4 is randomly generated and has an extremely low probability of collision." },
        { question: "How many UUIDs can I generate?", answer: "You can generate up to 100 UUIDs at once. Each one is independently generated using crypto.randomUUID()." },
        { question: "Are the UUIDs truly random?", answer: "Yes, they are generated using the Web Crypto API which provides cryptographically secure random number generation." },
        { question: "Is my data sent to a server?", answer: "Never. Everything runs in your browser." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
