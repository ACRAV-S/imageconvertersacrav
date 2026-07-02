import type { Metadata } from "next";
import PdfExtractPagesTool from "@/components/tools/pdf/PdfExtractPagesTool";
import { SITE_URL } from "@/lib/constants/site";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Extract PDF Pages",
  description:
    "Extract selected pages from a PDF document online. Choose specific pages to save as a new PDF. Free, fast, and private — all in your browser.",
  alternates: { canonical: `${SITE_URL}/tools/extract-pdf-pages` },
  openGraph: {
    title: "Extract PDF Pages Online Free | ImageConvertersACRAV",
    description:
      "Select and extract specific pages from a PDF into a new document. All processing happens in your browser — no uploads needed.",
    url: `${SITE_URL}/tools/extract-pdf-pages`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Extract PDF Pages Online Free | ImageConvertersACRAV",
    description:
      "Select and extract specific pages from a PDF into a new document. All processing happens in your browser — no uploads needed.",
  },
};

export default function ExtractPdfPagesPage() {
  return (
    <ToolErrorBoundary>
      <PdfExtractPagesTool
      title="Extract PDF Pages"
      description="Select specific pages from your PDF and extract them into a new document using the visual page preview grid. All processing happens in your browser — nothing is uploaded."
      faqs={[
        {
          question: "How does page extraction work?",
          answer: "The tool uses pdf-lib to copy selected pages from the source PDF into a new document, preserving all content, fonts, and formatting.",
        },
        {
          question: "What's the difference between extract and split?",
          answer: "Extracting creates a single new PDF from only the pages you select. Splitting divides a PDF into multiple separate files.",
        },
        {
          question: "Is my data safe?",
          answer: "Absolutely. All processing is done in your browser using client-side JavaScript. Your files never leave your device.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
