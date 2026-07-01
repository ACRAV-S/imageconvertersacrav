import type { Metadata } from "next";
import PdfUnavailableTool from "@/components/tools/pdf/PdfUnavailableTool";

export const metadata: Metadata = {
  title: "PDF Merge",
  description: "Combine multiple PDF files into a single document online. Free, fast, and private — all in your browser.",
};

export default function PdfMergePage() {
  return (
    <PdfUnavailableTool
      title="PDF Merge"
      description="Combine multiple PDF files into a single document."
      operation="merge PDF files"
      reason="PDF files use cross-reference tables and indirect objects that must be merged at the object level, not by simply concatenating files. Browser APIs provide no access to PDF object structures, and JavaScript cannot reconstruct valid cross-reference tables from concatenated raw PDF data."
      api="pdf-lib (createPdf, embedPdf, copyPages)"
      faqs={[
        {
          question: "Why can't PDFs be merged in the browser?",
          answer: "PDF is a complex binary format with internal cross-reference tables, object streams, and compression. Merging requires parsing each PDF's internal structure, renumbering objects, and rebuilding the cross-reference table — which browser APIs cannot do. A library like pdf-lib handles this entirely client-side but needs to be added to the project.",
        },
        {
          question: "How would PDF merge work with a library?",
          answer: "A library like pdf-lib can read multiple PDF files, copy pages from each into a new document, and save the result — all in the browser with no server uploads.",
        },
        {
          question: "Is my data safe?",
          answer: "This tool runs entirely in your browser. No files are uploaded anywhere. Once a PDF library is integrated, the merge operation will also be fully client-side.",
        },
        {
          question: "Are there alternative ways to merge PDFs?",
          answer: "Many desktop applications like Adobe Acrobat, Preview (macOS), and free tools like PDFsam can merge PDFs offline.",
        },
      ]}
    />
  );
}
