import type { Metadata } from "next";
import QrGeneratorShell from "@/components/tools/qr/QrGeneratorShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "SMS QR Generator",
  description: "Generate a QR code that opens a pre-filled SMS message with recipient phone number. Free and private.",
};

export default function SmsQrPage() {
  return (
    <ToolErrorBoundary>
      <QrGeneratorShell
      title="SMS QR Generator"
      description="Create a QR code that opens the device's messaging app with a pre-filled phone number and message."
      fields={[
        { key: "number", label: "Phone Number", required: true },
        { key: "message", label: "Message" },
      ]}
      formatType="sms"
      faqs={[
        {
          question: "How does the SMS QR code work?",
          answer: "When scanned, the QR code triggers an sms: link that opens the messaging app with the number and message pre-filled.",
        },
        {
          question: "Will it work on tablets?",
          answer: "Devices without cellular capability may not support SMS. The QR code will still contain the encoded data, but an SMS app must be installed.",
        },
        {
          question: "What phone number format should I use?",
          answer: "Use the full number with country code (e.g., +1234567890) for best compatibility across different regions.",
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
