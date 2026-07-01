import type { Metadata } from "next";
import PdfUnavailableTool from "@/components/tools/pdf/PdfUnavailableTool";

export const metadata: Metadata = {
  title: "Extract PDF Pages",
  description: "Extract selected pages from a PDF document online. Save pages as a new PDF file. Free and private.",
};

export default function ExtractPdfPagesPage() {
  return (
    <PdfUnavailableTool
      title="Extract PDF Pages"
      description="Select and extract specific pages from a PDF to create a new document."
      operation="extract pages from a PDF"
      reason="Extracting pages is similar to splitting: the PDF must be parsed, selected pages copied to a new document along with their resources, and a new cross-reference table created. Browser APIs cannot parse PDF page structures."
      api="pdf-lib (PDFDocument.load, copyPages, addPage, save)"
      faqs={[
        {
          question: "What's the difference between extract and split?",
          answer: "Splitting divides a PDF into multiple files (e.g., one per page). Extracting creates a single new PDF from only the pages you select. Both require PDF parsing capabilities not available in browser APIs.",
        },
        {
          question: "How would extraction work with a library?",
          answer: "pdf-lib can load a PDF, select specific pages via copyPages(), add them to a new document, and save — all fully client-side.",
        },
        {
          question: "Is my data safe?",
          answer: "This tool runs entirely in your browser. No files are uploaded anywhere. Once a PDF library is integrated, page extraction will also be fully client-side.",
        },
      ]}
    />
  );
}
