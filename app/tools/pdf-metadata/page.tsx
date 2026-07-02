import type { Metadata } from "next";
import PdfMetadataTool from "@/components/tools/pdf/PdfMetadataTool";
import { SITE_URL } from "@/lib/constants/site";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "PDF Metadata Viewer",
  description:
    "View PDF metadata including title, author, page count, and creation date online. Free and private — no file upload required. All processing happens in your browser.",
  alternates: { canonical: `${SITE_URL}/tools/pdf-metadata` },
  openGraph: {
    title: "PDF Metadata Viewer Online Free | ImageConvertersACRAV",
    description:
      "Extract and view metadata from any PDF file. See the title, author, subject, keywords, and more. All processing happens in your browser.",
    url: `${SITE_URL}/tools/pdf-metadata`,
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Metadata Viewer Online Free | ImageConvertersACRAV",
    description:
      "Extract and view metadata from any PDF file. See the title, author, subject, keywords, and more.",
  },
};

export default function PdfMetadataPage() {
  return (
    <ToolErrorBoundary>
      <PdfMetadataTool
      title="PDF Metadata Viewer"
      description="Extract and view metadata from any PDF file. See the title, author, subject, keywords, creator, producer, page count, and creation date. All processing happens in your browser — nothing is uploaded."
      faqs={[
        {
          question: "What metadata can be extracted?",
          answer:
            "This tool extracts information stored in the PDF Info dictionary: title, author, subject, keywords, creator software, producer software, creation date, modification date, and page count. Note that not all PDFs contain all fields.",
        },
        {
          question: "How does metadata extraction work?",
          answer:
            "The PDF file is read as raw text and the metadata fields are extracted by finding the PDF Info dictionary in the document trailer. This is a text-based extraction that works without a full PDF parser.",
        },
        {
          question: "What if metadata shows as 'Not available'?",
          answer:
            "Metadata fields are optional in PDF files. If a field wasn't set when the PDF was created, it will show as 'Not available'. This is normal behavior.",
        },
        {
          question: "Can encrypted or protected PDFs be read?",
          answer:
            "This tool cannot extract metadata from encrypted or password-protected PDFs, as the content is not readable without decryption. The tool will show an error in this case.",
        },
        {
          question: "Is my PDF uploaded to a server?",
          answer:
            "Never. The PDF is read entirely in your browser using JavaScript's FileReader API. Your file never leaves your device.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
