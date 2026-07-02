import type { Metadata } from "next";
import PdfMergeTool from "@/components/tools/pdf/PdfMergeTool";
import { SITE_URL } from "@/lib/constants/site";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Merge PDF",
  description:
    "Combine multiple PDF files into a single document online. Free, fast, and private — all in your browser with no uploads.",
  alternates: { canonical: `${SITE_URL}/tools/pdf-merge` },
  openGraph: {
    title: "Merge PDF Files Online Free | ImageConvertersACRAV",
    description:
      "Combine multiple PDF files into one document. Fast, private, and free — all processing happens in your browser.",
    url: `${SITE_URL}/tools/pdf-merge`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Files Online Free | ImageConvertersACRAV",
    description:
      "Combine multiple PDF files into one document. Fast, private, and free — all processing happens in your browser.",
  },
};

export default function PdfMergePage() {
  return (
    <ToolErrorBoundary>
      <PdfMergeTool
      title="Merge PDF"
      description="Combine multiple PDF files into a single document. Arrange files in the order you want, then merge them into one PDF. All processing happens in your browser — nothing is uploaded."
      faqs={[
        {
          question: "How does PDF merging work?",
          answer: "The tool uses pdf-lib, a client-side PDF library, to load each PDF, copy all pages into a new document, and save the result. Everything happens in your browser with no server uploads.",
        },
        {
          question: "How many PDFs can I merge?",
          answer: "There is no hard limit, but large files may require significant memory. For best results, merge up to 10 files at a time.",
        },
        {
          question: "Can I change the order of files?",
          answer: "Yes, use the up and down arrows to reorder files before merging. The pages will appear in the final PDF in the order shown.",
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
