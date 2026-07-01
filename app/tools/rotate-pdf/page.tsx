import type { Metadata } from "next";
import PdfUnavailableTool from "@/components/tools/pdf/PdfUnavailableTool";

export const metadata: Metadata = {
  title: "Rotate PDF",
  description: "Rotate PDF pages to landscape or portrait online. Fix scanned documents with wrong orientation. Free and private.",
};

export default function RotatePdfPage() {
  return (
    <PdfUnavailableTool
      title="Rotate PDF"
      description="Rotate individual pages or the entire document to the correct orientation."
      operation="rotate pages within a PDF"
      reason="Rotating pages requires modifying each page's /Rotate entry in the PDF page dictionary and updating the MediaBox dimensions. Browser APIs provide no way to parse or modify PDF page dictionaries. Additionally, rotated content may need repositioning within the new page boundaries."
      api="pdf-lib (PDFPage.setRotation)"
      faqs={[
        {
          question: "Can't I just use CSS to rotate?",
          answer: "CSS rotation only affects display in a browser. A PDF file stores page orientation in its own internal metadata. To permanently change a PDF's page rotation, you must modify this metadata within the PDF structure itself.",
        },
        {
          question: "How would rotation work with a library?",
          answer: "pdf-lib has a setRotation() method that modifies the page's /Rotate entry, allowing 90, 180, and 270 degree rotations — all client-side.",
        },
        {
          question: "Is my data safe?",
          answer: "This tool runs entirely in your browser. No files are uploaded anywhere. Once a PDF library is integrated, the rotation operation will also be fully client-side.",
        },
      ]}
    />
  );
}
