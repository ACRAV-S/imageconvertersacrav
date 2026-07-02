import type { Metadata } from "next";
import PdfReorderPagesTool from "@/components/tools/pdf/PdfReorderPagesTool";
import { SITE_URL } from "@/lib/constants/site";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Reorder PDF Pages",
  description:
    "Rearrange PDF pages in any order online. Move pages up or down with simple controls. Free, fast, and private — all in your browser.",
  alternates: { canonical: `${SITE_URL}/tools/reorder-pdf-pages` },
  openGraph: {
    title: "Reorder PDF Pages Online Free | ImageConvertersACRAV",
    description:
      "Rearrange the order of pages in your PDF document. Simple up/down controls make reordering easy. All processing happens in your browser.",
    url: `${SITE_URL}/tools/reorder-pdf-pages`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Reorder PDF Pages Online Free | ImageConvertersACRAV",
    description:
      "Rearrange the order of pages in your PDF document. Simple up/down controls make reordering easy.",
  },
};

export default function ReorderPdfPagesPage() {
  return (
    <ToolErrorBoundary>
      <PdfReorderPagesTool
      title="Reorder PDF Pages"
      description="Rearrange the pages of your PDF in any order using simple up and down controls. All processing happens in your browser — nothing is uploaded."
      faqs={[
        {
          question: "How does page reordering work?",
          answer: "The tool uses pdf-lib to copy pages from the source PDF into a new document in the order you specify. All content, fonts, and formatting are preserved.",
        },
        {
          question: "Can I move a page to a specific position?",
          answer: "Yes, use the up and down arrows next to each page to move it to the desired position. The page numbers update in real time.",
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
