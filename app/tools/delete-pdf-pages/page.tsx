import type { Metadata } from "next";
import PdfDeletePagesTool from "@/components/tools/pdf/PdfDeletePagesTool";
import { SITE_URL } from "@/lib/constants/site";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Delete PDF Pages",
  description:
    "Remove unwanted pages from PDF files online. Select pages to delete with visual previews. Free, fast, and private — all in your browser.",
  alternates: { canonical: `${SITE_URL}/tools/delete-pdf-pages` },
  openGraph: {
    title: "Delete PDF Pages Online Free | ImageConvertersACRAV",
    description:
      "Remove unwanted pages from your PDF documents. Select specific pages to delete with visual previews. All processing happens in your browser.",
    url: `${SITE_URL}/tools/delete-pdf-pages`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Delete PDF Pages Online Free | ImageConvertersACRAV",
    description:
      "Remove unwanted pages from your PDF documents. Select specific pages to delete with visual previews.",
  },
};

export default function DeletePdfPagesPage() {
  return (
    <ToolErrorBoundary>
      <PdfDeletePagesTool
      title="Delete PDF Pages"
      description="Remove unwanted pages from your PDF document. Select pages from the visual preview grid to delete. All processing happens in your browser — nothing is uploaded."
      faqs={[
        {
          question: "How does page deletion work?",
          answer: "The tool uses pdf-lib to remove selected pages from the PDF page tree. All internal references are updated, resulting in a valid PDF with only the remaining pages.",
        },
        {
          question: "Can I delete multiple pages at once?",
          answer: "Yes. Select all the pages you want to remove using the page preview grid, then click the delete button.",
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
