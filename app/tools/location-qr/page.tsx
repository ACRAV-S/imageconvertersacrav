import type { Metadata } from "next";
import QrGeneratorShell from "@/components/tools/qr/QrGeneratorShell";

export const metadata: Metadata = {
  title: "Location QR Generator",
  description: "Create a QR code that opens a map location. Share GPS coordinates with anyone. Free and private.",
};

export default function LocationQrPage() {
  return (
    <QrGeneratorShell
      title="Location QR Generator"
      description="Generate a QR code that opens a maps app at a specific GPS coordinate. Enter latitude and longitude to create a shareable location QR."
      fields={[
        { key: "lat", label: "Latitude", placeholder: "48.8566", required: true },
        { key: "lon", label: "Longitude", placeholder: "2.3522", required: true },
      ]}
      formatType="location"
      faqs={[
        {
          question: "How does the location QR code work?",
          answer: "When scanned, the QR code opens a geo: URI that launches the device's maps application at the specified coordinates.",
        },
        {
          question: "How do I find coordinates?",
          answer: "Open Google Maps, right-click a location, and select the coordinates. Or search for a place and find coordinates in the URL. Enter them in decimal format (e.g., 48.8566, 2.3522).",
        },
        {
          question: "Will it work on all devices?",
          answer: "iOS, Android, and desktop browsers all support geo: URIs, though the exact app that opens (Apple Maps, Google Maps, etc.) varies by device.",
        },
        {
          question: "Is my data uploaded?",
          answer: "Never. Everything runs in your browser. Your data never leaves your device.",
        },
      ]}
    />
  );
}
