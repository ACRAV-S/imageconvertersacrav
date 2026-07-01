import type { Metadata } from "next";
import JpgToPdfTool from "@/components/tools/pdf/JpgToPdfTool";

export const metadata: Metadata = {
  title: "JPG to PDF",
  description: "Convert JPG images to PDF documents online. Combine multiple images into a single PDF file. Free, fast, and private.",
};

export default function JpgToPdfPage() {
  return (
    <JpgToPdfTool
      title="JPG to PDF"
      description="Convert your JPEG images into a PDF document. Upload multiple images and they will be combined into a single PDF file, one image per page. All processing happens in your browser — nothing is uploaded to any server."
      faqs={[
        {
          question: "How does JPG to PDF conversion work?",
          answer: "The tool constructs a valid PDF file by embedding the JPEG image data directly into PDF pages using the DCTDecode filter. Each image becomes one page in the PDF, preserving its original quality and dimensions. No re-encoding occurs, so there is zero quality loss.",
        },
        {
          question: "Can I combine multiple JPGs into one PDF?",
          answer: "Yes, upload multiple images and they will be combined into a single PDF document. Each image appears on its own page in the order you upload them.",
        },
        {
          question: "What image formats are supported?",
          answer: "This tool supports JPEG images. If you upload images in other formats (PNG, WebP), they will be converted to JPEG first before being embedded in the PDF.",
        },
        {
          question: "Is my image uploaded to a server?",
          answer: "Never. The PDF is constructed entirely in your browser using JavaScript. Your images never leave your device.",
        },
        {
          question: "What is the maximum number of images?",
          answer: "There is no hard limit, but very large images or many images may require significant memory. For best performance, keep individual images under 10MB.",
        },
      ]}
    />
  );
}
