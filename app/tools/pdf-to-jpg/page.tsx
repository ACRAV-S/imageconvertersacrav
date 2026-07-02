import type { Metadata } from "next";
import PdfToJpgTool from "@/components/tools/pdf/PdfToJpgTool";
import { SITE_URL } from "@/lib/constants/site";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "PDF to JPG",
  description:
    "Convert PDF pages to high-quality JPG images online. Extract every page as an image. Free, fast, and private — all in your browser with no uploads.",
  alternates: { canonical: `${SITE_URL}/tools/pdf-to-jpg` },
  openGraph: {
    title: "Convert PDF to JPG Online Free | ImageConvertersACRAV",
    description:
      "Convert each page of your PDF into a high-quality JPEG image. All processing happens in your browser — no uploads needed.",
    url: `${SITE_URL}/tools/pdf-to-jpg`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert PDF to JPG Online Free | ImageConvertersACRAV",
    description:
      "Convert each page of your PDF into a high-quality JPEG image. All processing happens in your browser — no uploads needed.",
  },
};

export default function PdfToJpgPage() {
  return (
    <ToolErrorBoundary>
      <PdfToJpgTool
      title="PDF to JPG"
      description="Convert each page of your PDF into a high-quality JPEG image. Uses PDF.js to render pages at 2x resolution for crisp output. All processing happens in your browser — nothing is uploaded."
      faqs={[
        {
          question: "How does PDF to JPG conversion work?",
          answer: "The tool uses PDF.js, Mozilla's PDF rendering library, to render each page onto a canvas at 2x resolution. The canvas is then exported as a high-quality JPEG image. Everything runs client-side.",
        },
        {
          question: "What image quality can I expect?",
          answer: "Pages are rendered at 2x scale (144 DPI equivalent) and saved as JPEG at 92% quality. This provides excellent readability while keeping file sizes reasonable.",
        },
        {
          question: "Can encrypted PDFs be converted?",
          answer: "No. Password-protected or encrypted PDFs cannot be rendered because the content cannot be accessed without decryption.",
        },
        {
          question: "Is my data safe?",
          answer: "Absolutely. All rendering is done in your browser using client-side JavaScript. Your files never leave your device.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
