import type { Metadata } from "next";
import PdfCompressTool from "@/components/tools/pdf/PdfCompressTool";
import { SITE_URL } from "@/lib/constants/site";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "PDF Compressor",
  description:
    "Reduce PDF file size while preserving quality online. Optimize your PDF documents. Free, fast, and private — all in your browser with no uploads.",
  alternates: { canonical: `${SITE_URL}/tools/pdf-compressor` },
  openGraph: {
    title: "Compress PDF Online Free | ImageConvertersACRAV",
    description:
      "Reduce the file size of your PDF documents. Uses object stream compression to optimize PDF files. All processing happens in your browser.",
    url: `${SITE_URL}/tools/pdf-compressor`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Online Free | ImageConvertersACRAV",
    description:
      "Reduce the file size of your PDF documents. All processing happens in your browser — no uploads needed.",
  },
};

export default function PdfCompressorPage() {
  return (
    <ToolErrorBoundary>
      <PdfCompressTool
      title="PDF Compressor"
      description="Reduce the file size of your PDF by optimizing its internal structure. Uses object stream compression through pdf-lib to minimize file size while preserving all content. All processing happens in your browser — nothing is uploaded."
      faqs={[
        {
          question: "How does PDF compression work?",
          answer: "The tool uses pdf-lib to recompress the PDF with object stream compression enabled. This reduces file size by optimizing the internal structure without changing the visual appearance.",
        },
        {
          question: "How much can I compress my PDF?",
          answer: "Typical compression reduces file size by 10-30%. The exact savings depend on the PDF structure. Files with many embedded images may see more significant reductions.",
        },
        {
          question: "Is the quality affected?",
          answer: "No. This compression method only optimizes the PDF's internal structure. All content, images, and text remain at full quality.",
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
