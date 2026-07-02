import type { Metadata } from "next";
import PdfSplitTool from "@/components/tools/pdf/PdfSplitTool";
import { SITE_URL } from "@/lib/constants/site";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Split PDF",
  description:
    "Split a PDF into multiple files by page range or extract every page individually. Free, fast, and private — all in your browser.",
  alternates: { canonical: `${SITE_URL}/tools/split-pdf` },
  openGraph: {
    title: "Split PDF Online Free | ImageConvertersACRAV",
    description:
      "Split large PDF files into smaller documents. Extract specific page ranges. All processing happens in your browser — no uploads needed.",
    url: `${SITE_URL}/tools/split-pdf`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF Online Free | ImageConvertersACRAV",
    description:
      "Split large PDF files into smaller documents. Extract specific page ranges. All processing happens in your browser — no uploads needed.",
  },
};

export default function SplitPdfPage() {
  return (
    <ToolErrorBoundary>
      <PdfSplitTool
      title="Split PDF"
      description="Split a PDF into multiple files by extracting every page individually or selecting specific page ranges. Each page becomes its own PDF file. All processing happens in your browser — nothing is uploaded."
      faqs={[
        {
          question: "How does PDF splitting work?",
          answer: "The tool uses pdf-lib to load the PDF, copy selected pages into new documents, and save each as a separate PDF. Everything is processed client-side.",
        },
        {
          question: "What page ranges can I use?",
          answer: "You can use formats like 1-3, 5, 7-9 to extract specific pages into a single PDF, or choose to extract every page as its own file.",
        },
        {
          question: "Is my data safe?",
          answer: "Yes. All processing is done in your browser using client-side JavaScript. Your files never leave your device.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
