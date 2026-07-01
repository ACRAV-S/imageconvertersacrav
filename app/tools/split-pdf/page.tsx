import type { Metadata } from "next";
import PdfUnavailableTool from "@/components/tools/pdf/PdfUnavailableTool";

export const metadata: Metadata = {
  title: "Split PDF",
  description: "Split large PDF files into smaller documents online. Extract specific page ranges. Free and private.",
};

export default function SplitPdfPage() {
  return (
    <PdfUnavailableTool
      title="Split PDF"
      description="Split a PDF into multiple files by page range or extract every page as a separate PDF."
      operation="split a PDF into separate files"
      reason="Splitting a PDF requires reading its internal page tree object, extracting page objects and their associated resources (fonts, images), and creating new documents with independent cross-reference tables. Browser APIs provide no PDF parsing capabilities."
      api="pdf-lib (PDFDocument.load, copyPages, save)"
      faqs={[
        {
          question: "Why can't PDFs be split natively?",
          answer: "PDF pages share resources like fonts, images, and color spaces. When splitting, each new file must contain only the resources used by its pages. Without a PDF parser, there is no way to determine which resources each page references.",
        },
        {
          question: "How would splitting work with a library?",
          answer: "pdf-lib can load a PDF, copy specific pages to new documents, and automatically handle resource deduplication — all client-side.",
        },
        {
          question: "Is my data safe?",
          answer: "This tool runs entirely in your browser. No files are uploaded anywhere. Once a PDF library is integrated, the split operation will also be fully client-side.",
        },
        {
          question: "What page ranges can I split?",
          answer: "Once implemented, you'll be able to split by custom ranges (e.g., pages 1-5, 6-10) or extract every page individually.",
        },
      ]}
    />
  );
}
