import type { Metadata } from "next";
import QrGeneratorShell from "@/components/tools/qr/QrGeneratorShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "WhatsApp QR Generator",
  description: "Create a QR code that opens a WhatsApp chat with a pre-filled message. Free and private.",
};

export default function WhatsAppQrPage() {
  return (
    <ToolErrorBoundary>
      <QrGeneratorShell
      title="WhatsApp QR Generator"
      description="Generate a QR code that opens a WhatsApp chat with a specific phone number and pre-filled message."
      fields={[
        { key: "phone", label: "Phone Number (with country code)", required: true },
        { key: "message", label: "Pre-filled Message" },
      ]}
      formatType="whatsapp"
      faqs={[
        {
          question: "How does the WhatsApp QR code work?",
          answer: "When scanned, the QR code opens a wa.me link that launches WhatsApp with the specified contact and a pre-filled message.",
        },
        {
          question: "What phone number format should I use?",
          answer: "Use the full number with country code (e.g., 15551234567 for US). The tool strips non-digit characters automatically.",
        },
        {
          question: "Will it work if WhatsApp is not installed?",
          answer: "The wa.me link will open WhatsApp Web in a browser if the app is not installed, or prompt installation on mobile devices.",
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
