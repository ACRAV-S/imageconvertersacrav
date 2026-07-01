import type { Metadata } from "next";
import PdfUnavailableTool from "@/components/tools/pdf/PdfUnavailableTool";

export const metadata: Metadata = {
  title: "PDF Compressor",
  description: "Reduce PDF file size while preserving quality online. Free, fast, and private — all in your browser.",
};

export default function PdfCompressorPage() {
  return (
    <PdfUnavailableTool
      title="PDF Compressor"
      description="Reduce the file size of your PDF while preserving visual quality."
      operation="compress a PDF file"
      reason="PDF compression involves re-encoding embedded images (JPEG quality reduction), removing unused objects, and compressing document streams. Browser APIs provide no access to PDF internals, and the Canvas API cannot re-encode existing JPEG data without quality loss from decode-reencode cycles."
      api="pdf-lib (PDFDocument.load, setCompression, save with options)"
      faqs={[
        {
          question: "Why can't PDFs be compressed in the browser?",
          answer: "Compression requires modifying objects inside the PDF: reducing image DPI, lowering JPEG quality, removing metadata, and applying object stream compression. Without a library that can parse and manipulate these internals, browser APIs are insufficient.",
        },
        {
          question: "Doesn't the Canvas API help?",
          answer: "The Canvas API can draw images and export them, but it can't read existing JPEG data from a PDF without losing quality through decode-reencode cycles. Dedicated PDF libraries handle this without intermediate quality loss.",
        },
        {
          question: "Is my data safe?",
          answer: "This tool runs entirely in your browser. No files are uploaded anywhere. Once a PDF library is integrated, the compression operation will also be fully client-side.",
        },
        {
          question: "How much can PDFs be compressed?",
          answer: "Typical compression reduces file size by 30-60% by optimizing images and removing redundant data. The exact savings depend on the PDF content.",
        },
      ]}
    />
  );
}
