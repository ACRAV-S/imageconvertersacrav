import type { Metadata } from "next";
import QrGeneratorShell from "@/components/tools/qr/QrGeneratorShell";

export const metadata: Metadata = {
  title: "WiFi QR Generator",
  description: "Generate a QR code that shares WiFi credentials. Scan to connect without typing passwords. Free and private.",
};

export default function WifiQrPage() {
  return (
    <QrGeneratorShell
      title="WiFi QR Generator"
      description="Create a QR code that lets anyone connect to your WiFi network by scanning. Enter your network name (SSID), password, and security type."
      fields={[
        { key: "ssid", label: "Network Name (SSID)", required: true },
        { key: "password", label: "Password", type: "password" },
        { key: "encryption", label: "Security Type", placeholder: "WPA, WEP, or None" },
      ]}
      formatType="wifi"
      faqs={[
        {
          question: "How does a WiFi QR code work?",
          answer: "When scanned with a phone camera, the QR code triggers the WiFi connection screen with the network name and password pre-filled.",
        },
        {
          question: "Which security types are supported?",
          answer: "WPA (most common for modern routers), WEP (older routers), or None (open networks). Enter the type exactly as configured on your router.",
        },
        {
          question: "Is it safe to share my WiFi password via QR?",
          answer: "The password is embedded in the QR code. Only share the QR code with people you trust, just as you would share the password directly.",
        },
        {
          question: "Is my data uploaded?",
          answer: "Never. Everything runs in your browser. Your WiFi credentials never leave your device.",
        },
      ]}
    />
  );
}
