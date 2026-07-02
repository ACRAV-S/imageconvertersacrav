import type { Metadata } from "next";
import QrGeneratorShell from "@/components/tools/qr/QrGeneratorShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Email QR Generator",
  description: "Create a QR code that opens a pre-filled email. Includes recipient, subject, and body. Free and private.",
};

export default function EmailQrPage() {
  return (
    <ToolErrorBoundary>
      <QrGeneratorShell
      title="Email QR Generator"
      description="Generate a QR code that opens the user's email app with a pre-composed message. Include the recipient, subject, and body."
      fields={[
        { key: "email", label: "Email Address", type: "email", required: true },
        { key: "subject", label: "Subject" },
        { key: "body", label: "Body" },
      ]}
      formatType="email"
      faqs={[
        {
          question: "How does the email QR code work?",
          answer: "When scanned, the QR code opens a mailto: link that launches the device's email app with the recipient, subject, and body pre-filled.",
        },
        {
          question: "Will it work on all devices?",
          answer: "The mailto: format is supported on all major platforms (iOS, Android, Windows, macOS). The default email app will open automatically.",
        },
        {
          question: "Can I include HTML in the body?",
          answer: "The body is plain text. Most email apps will display it correctly, but HTML formatting is not supported in mailto: links.",
        },
        {
          question: "Is my data uploaded?",
          answer: "Never. Everything runs in your browser. Your data never leaves your device.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
