import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Converter",
  description: "Convert images between PNG, JPG, and WebP formats online. Free, fast, and private — all processing runs in your browser. No uploads needed.",
  openGraph: {
    title: "Image Converter - Free Online Image Converter",
    description: "Convert images between PNG, JPG, and WebP formats. Free, fast, and private — all in your browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Converter - Free Online Image Converter",
    description: "Convert images between PNG, JPG, and WebP formats. Free, fast, and private — all in your browser.",
  },
};

export default function ImageConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
