import type { Metadata } from "next";
import PdfUnavailableTool from "@/components/tools/pdf/PdfUnavailableTool";

export const metadata: Metadata = {
  title: "Reorder PDF Pages",
  description: "Rearrange PDF pages by drag and drop online. Organize your document in any order. Free and private.",
};

export default function ReorderPdfPagesPage() {
  return (
    <PdfUnavailableTool
      title="Reorder PDF Pages"
      description="Rearrange the pages of your PDF by moving them into any order you choose."
      operation="reorder pages in a PDF"
      reason="Reordering pages requires rebuilding the PDF page tree with pages in the new order, reassigning page numbers in internal references, and updating the cross-reference table. Browser APIs provide no way to manipulate PDF document structure."
      api="pdf-lib (PDFDocument.load, copyPages in desired order, save)"
      faqs={[
        {
          question: "Why can't pages be reordered natively?",
          answer: "The PDF page tree defines the order of pages. Changing the order requires reconstructing this tree and ensuring all internal references (table of contents, hyperlinks) still point to the correct content. Browser APIs have no access to these structures.",
        },
        {
          question: "How would reordering work with a library?",
          answer: "pdf-lib can load a PDF, copy pages into a new document in the desired order, and save the result — preserving all content and resources — entirely in the browser.",
        },
        {
          question: "Is my data safe?",
          answer: "This tool runs entirely in your browser. No files are uploaded anywhere. Once a PDF library is integrated, page reordering will also be fully client-side.",
        },
      ]}
    />
  );
}
