import type { Metadata } from "next";
import BarcodeGeneratorTool from "@/components/tools/qr/BarcodeGeneratorTool";

export const metadata: Metadata = {
  title: "Barcode Generator",
  description: "Generate Code 128 barcodes for any text online. Download as PNG for labels, packaging, and more. Free and private.",
};

export default function BarcodeGeneratorPage() {
  return (
    <BarcodeGeneratorTool
      title="Barcode Generator"
      description="Generate Code 128 barcodes from any text. Enter your content and get a printable barcode instantly. Download as PNG or copy the encoded text."
      faqs={[
        {
          question: "What is Code 128?",
          answer: "Code 128 is a high-density 1D barcode symbology that can encode all 128 ASCII characters. It is widely used in logistics, retail, and shipping.",
        },
        {
          question: "What characters are supported?",
          answer: "Code 128B supports all printable ASCII characters (codes 32-126). Non-printable characters are replaced with spaces.",
        },
        {
          question: "How is the barcode generated?",
          answer: "The barcode is drawn pixel by pixel using the Canvas API. Each character is encoded into bars and spaces following the Code 128 specification.",
        },
        {
          question: "Is my data uploaded?",
          answer: "Never. The barcode is generated entirely in your browser. Your data never leaves your device.",
        },
      ]}
    />
  );
}
