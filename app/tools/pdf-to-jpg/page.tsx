import type { Metadata } from "next";
import PdfUnavailableTool from "@/components/tools/pdf/PdfUnavailableTool";

export const metadata: Metadata = {
  title: "PDF to JPG",
  description: "Convert PDF pages to JPG images online. Extract each page as a high-quality image. Free and private.",
};

export default function PdfToJpgPage() {
  return (
    <PdfUnavailableTool
      title="PDF to JPG"
      description="Convert each page of your PDF into a high-quality JPEG image."
      operation="convert PDF pages to images"
      reason="Rendering PDF pages to images requires a PDF renderer — a library that can parse PDF content streams, execute drawing commands (text, paths, images), and composite them onto a canvas. Browsers have a built-in PDF viewer, but it cannot be accessed programmatically from JavaScript to render individual pages to Canvas elements for export."
      api="pdf.js (pdfjs-dist, renderPage with canvas context)"
      faqs={[
        {
          question: "Why does PDF rendering need a library?",
          answer: "PDF is a page description language, not an image format. To convert a page to JPG, a renderer must interpret all PDF commands (text, vector graphics, images) and draw them onto a canvas. The browser's built-in PDF viewer cannot be accessed programmatically — a library like PDF.js is required.",
        },
        {
          question: "Can I use the browser's PDF viewer?",
          answer: "The browser's native PDF viewer (<embed>, <iframe> with PDF) displays PDFs but provides no JavaScript API to extract page content or render to canvas. PDF.js is the standard library for this and works entirely client-side.",
        },
        {
          question: "Is my data safe?",
          answer: "Once a PDF renderer library is integrated, this tool will process everything in your browser. No files would be uploaded to any server.",
        },
      ]}
    />
  );
}
