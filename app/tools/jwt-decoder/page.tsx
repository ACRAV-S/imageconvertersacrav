import type { Metadata } from "next";
import CodeToolShell from "@/components/tools/dev/CodeToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "JWT Decoder",
  description: "Decode JWT tokens online to inspect header and payload. View claims in a readable format. Free and private.",
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <CodeToolShell
      title="JWT Decoder"
      description="Decode JSON Web Tokens to view the header, payload, and signature. The header and payload are Base64-decoded and formatted as JSON for easy reading."
      mode="jwt-decode"
      faqs={[
        { question: "What is a JWT?", answer: "A JSON Web Token (JWT) is a compact, URL-safe token format used for authentication and information exchange. It consists of three parts: header, payload, and signature." },
        { question: "Can I verify the signature?", answer: "This tool decodes the JWT for inspection but does not verify the signature. Signature verification requires the secret key which this tool never has access to." },
        { question: "Is my token sent to a server?", answer: "Never. Everything runs in your browser. Your token never leaves your device." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
