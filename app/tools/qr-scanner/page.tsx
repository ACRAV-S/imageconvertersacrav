import type { Metadata } from "next";
import QrScannerTool from "@/components/tools/qr/QrScannerTool";

export const metadata: Metadata = {
  title: "QR Code Scanner",
  description: "Scan QR codes from images using your browser. Detect and decode QR codes instantly — free and private.",
};

export default function QrScannerPage() {
  return (
    <QrScannerTool
      title="QR Code Scanner"
      description="Upload a screenshot or image containing a QR code to decode it. Uses the browser's built-in BarcodeDetector API for fast, accurate scanning."
      faqs={[
        {
          question: "How does QR scanning work?",
          answer: "This tool uses the BarcodeDetector API, a built-in browser feature available in Chrome, Edge, and Opera. It detects QR codes in images and decodes the content instantly.",
        },
        {
          question: "Why doesn't it work in my browser?",
          answer: "The BarcodeDetector API is only available in Chromium-based browsers (Chrome, Edge, Opera). Firefox and Safari do not support this API yet.",
        },
        {
          question: "Is my image uploaded to a server?",
          answer: "Never. The image is processed entirely in your browser using the Canvas API. Your file never leaves your device.",
        },
      ]}
    />
  );
}
