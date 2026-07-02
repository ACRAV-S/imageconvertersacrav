import type { Metadata } from "next";
import HashGeneratorTool from "@/components/tools/dev/HashGeneratorTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Hash Generator (SHA-256)",
  description: "Generate SHA-256 hashes from text online using the Web Crypto API. Secure, fast, and private — all in your browser.",
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <HashGeneratorTool
      title="Hash Generator (SHA-256)"
      description="Generate SHA-256 hashes from any text input using the browser's built-in Web Crypto API. SHA-256 is a cryptographic hash function that produces a 64-character hex string."
      faqs={[
        { question: "What is SHA-256?", answer: "SHA-256 is a cryptographic hash function that produces a 256-bit (64 character) hash value. It's part of the SHA-2 family and is widely used in security applications." },
        { question: "Is SHA-256 reversible?", answer: "No, SHA-256 is a one-way hash function. You cannot recover the original input from the hash. This is by design for security purposes." },
        { question: "Is my data sent to a server?", answer: "Never. The hashing is done entirely in your browser using the Web Crypto API. Your input never leaves your device." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
