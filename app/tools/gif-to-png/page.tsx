import type { Metadata } from "next";
import ImageToolShell from "@/components/tools/ImageToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "GIF to PNG Converter",
  description: "Convert GIF images to PNG format with higher quality and more colors. Free, fast, and private — all in your browser.",
};

export default function GifToPngPage() {
  return (
    <ToolErrorBoundary>
      <ImageToolShell
      title="GIF to PNG"
      description="Convert GIF images to PNG format for higher quality, more colors, and smaller file sizes. PNG supports millions of colors compared to GIF's 256-color limit. Note: Only the first frame of animated GIFs is converted."
      acceptedFormats={["image/gif"]}
      targetFormat="png"
      faqs={[
        {
          question: "Why convert GIF to PNG?",
          answer: "PNG supports millions of colors (truecolor) compared to GIF's 256-color limit, resulting in much higher quality images. PNG files are also often smaller than GIFs for photographic content.",
        },
        {
          question: "Will animation be preserved?",
          answer: "No. This tool converts only the first frame of an animated GIF to a static PNG. If you need to preserve animation, keep the original GIF format.",
        },
        {
          question: "Is transparency preserved?",
          answer: "Yes. Both GIF and PNG support transparency. When converting from GIF to PNG, transparency information is preserved.",
        },
        {
          question: "Is my image uploaded to a server?",
          answer: "Never. Everything runs client-side in your browser using the HTML Canvas API. Your files never leave your device.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
