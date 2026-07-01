import type { Metadata } from "next";
import ImageToolShell from "@/components/tools/ImageToolShell";

export const metadata: Metadata = {
  title: "BMP to PNG Converter",
  description: "Convert BMP images to PNG format with compression and transparency. Free, fast, and private — all in your browser.",
};

export default function BmpToPngPage() {
  return (
    <ImageToolShell
      title="BMP to PNG"
      description="Convert BMP (Bitmap) images to the more efficient PNG format. PNG compresses BMP files significantly while preserving all visual quality and supporting transparency. All processing runs in your browser."
      acceptedFormats={["image/bmp"]}
      targetFormat="png"
      faqs={[
        {
          question: "Why convert BMP to PNG?",
          answer: "BMP files are uncompressed and extremely large. Converting to PNG can reduce file size by 50-80% without any quality loss, making them much easier to store, share, and use on the web.",
        },
        {
          question: "Will I lose quality?",
          answer: "No. PNG uses lossless compression, meaning every pixel from the original BMP is preserved exactly. The image will look identical but take up much less space.",
        },
        {
          question: "Does PNG support transparency like BMP?",
          answer: "Yes. PNG supports alpha transparency, so any transparency in your original BMP will be preserved in the PNG output.",
        },
        {
          question: "Is my image uploaded to a server?",
          answer: "Never. Everything runs client-side in your browser using the HTML Canvas API. Your files never leave your device.",
        },
      ]}
    />
  );
}
