import type { Metadata } from "next";
import QrGeneratorShell from "@/components/tools/qr/QrGeneratorShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "vCard QR Generator",
  description: "Generate a QR code that saves contact details. Scan to add to your phonebook instantly. Free and private.",
};

export default function VCardQrPage() {
  return (
    <ToolErrorBoundary>
      <QrGeneratorShell
      title="vCard QR Generator"
      description="Create a QR code containing your contact information. When scanned, it offers to save the contact directly to the phone's address book."
      fields={[
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email", type: "email" },
        { key: "org", label: "Organization" },
        { key: "title", label: "Job Title" },
        { key: "url", label: "Website", type: "url" },
        { key: "address", label: "Address" },
      ]}
      formatType="vcard"
      faqs={[
        {
          question: "What is a vCard?",
          answer: "vCard is a standard file format for electronic business cards. QR codes can encode vCard data that phones recognize and import directly into contacts.",
        },
        {
          question: "Will it work on all phones?",
          answer: "Most modern smartphones (iPhone and Android) recognize vCard QR codes and offer to save the contact. The behavior depends on the QR scanner app used.",
        },
        {
          question: "What fields are included?",
          answer: "The vCard includes name, phone, email, organization, job title, website, and address. Only filled-in fields are added to the vCard.",
        },
        {
          question: "Is my data uploaded?",
          answer: "Never. Everything runs in your browser. Your contact information never leaves your device.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
