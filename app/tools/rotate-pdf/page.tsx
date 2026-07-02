import type { Metadata } from "next";
import PdfRotateTool from "@/components/tools/pdf/PdfRotateTool";
import { SITE_URL } from "@/lib/constants/site";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Rotate PDF",
  description:
    "Rotate PDF pages to landscape or portrait orientation online. Choose 90°, 180°, or 270° rotation. Free, fast, and private — all in your browser.",
  alternates: { canonical: `${SITE_URL}/tools/rotate-pdf` },
  openGraph: {
    title: "Rotate PDF Pages Online Free | ImageConvertersACRAV",
    description:
      "Rotate individual pages or entire PDF documents to the correct orientation. All processing happens in your browser — no uploads needed.",
    url: `${SITE_URL}/tools/rotate-pdf`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate PDF Pages Online Free | ImageConvertersACRAV",
    description:
      "Rotate individual pages or entire PDF documents to the correct orientation. All processing happens in your browser — no uploads needed.",
  },
};

export default function RotatePdfPage() {
  return (
    <ToolErrorBoundary>
      <PdfRotateTool
      title="Rotate PDF"
      description="Rotate individual pages or all pages in your PDF document. Choose 90°, 180°, or 270° rotation. Select which pages to rotate using the page preview grid. All processing happens in your browser — nothing is uploaded."
      faqs={[
        {
          question: "How does PDF rotation work?",
          answer: "The tool modifies each page's /Rotate entry in the PDF page dictionary using pdf-lib. This rotates the display orientation without re-rendering the page content, so there is no quality loss.",
        },
        {
          question: "Can I rotate only specific pages?",
          answer: "Yes. Select individual pages from the preview grid, or use Select All to rotate the entire document.",
        },
        {
          question: "What rotation angles are supported?",
          answer: "90°, 180°, and 270° rotation is supported. Each rotation is applied relative to the page's current orientation.",
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
