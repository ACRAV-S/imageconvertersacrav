import type { Metadata } from "next";
import PdfUnavailableTool from "@/components/tools/pdf/PdfUnavailableTool";

export const metadata: Metadata = {
  title: "Delete PDF Pages",
  description: "Remove unwanted pages from PDF files online. Delete specific pages or ranges with ease. Free and private.",
};

export default function DeletePdfPagesPage() {
  return (
    <PdfUnavailableTool
      title="Delete PDF Pages"
      description="Remove unwanted pages from your PDF document."
      operation="delete pages from a PDF"
      reason="Deleting pages requires modifying the PDF page tree, removing page objects, updating the cross-reference table, and optionally cleaning up orphaned resources. Browser APIs provide no PDF parsing or structure modification capabilities."
      api="pdf-lib (PDFDocument.load, removePage, save)"
      faqs={[
        {
          question: "Why can't pages be deleted natively?",
          answer: "A PDF's page tree is a hierarchical structure. Removing a page involves updating parent references, potentially removing resource references, and rebuilding the document structure. Without a PDF parser, this is impossible from JavaScript.",
        },
        {
          question: "How would deletion work with a library?",
          answer: "pdf-lib provides removePage() which handles all the internal bookkeeping — updating the page tree, cleaning up references, and saving a valid PDF — all client-side.",
        },
        {
          question: "Is my data safe?",
          answer: "This tool runs entirely in your browser. No files are uploaded anywhere. Once a PDF library is integrated, page deletion will also be fully client-side.",
        },
      ]}
    />
  );
}
