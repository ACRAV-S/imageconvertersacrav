import type { Metadata } from "next";
import Container from "@/components/common/Container";

const siteUrl = "https://imageconvertersacrav.vercel.app";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for ImageConvertersACRAV tools and services. Services are provided on an 'as is' basis without warranties.",
  alternates: { canonical: `${siteUrl}/disclaimer` },
  openGraph: {
    title: "Disclaimer | ImageConvertersACRAV",
    description: "Disclaimer for ImageConvertersACRAV tools and services.",
    url: `${siteUrl}/disclaimer`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer | ImageConvertersACRAV",
    description: "Disclaimer for ImageConvertersACRAV tools and services.",
  },
};

export default function DisclaimerPage() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Disclaimer
        </h1>
        <p className="mt-6 text-zinc-600 dark:text-zinc-400">
          Last updated: July 1, 2026
        </p>

        <div className="mt-8 space-y-6 text-zinc-700 dark:text-zinc-300">
          <p>
            The services, utilities, and assets on ImageConvertersACRAV are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied.
          </p>

          <h2 className="text-xl font-semibold mt-8 text-zinc-900 dark:text-zinc-50">1. Accuracy of Operations</h2>
          <p>
            While we strive to implement pixel-perfect image conversions and formatting results, we make no guarantees that the output files are completely flawless, accurate, or suited for critical production workflows. Verify all outputs independently before usage in high-impact operations.
          </p>

          <h2 className="text-xl font-semibold mt-8 text-zinc-900 dark:text-zinc-50">2. No Liability for File Loss</h2>
          <p>
            All processing operations run inside your browser. Under no circumstances shall ImageConvertersACRAV, its architects, or developers be liable for any data loss, file corruption, browser crashes, or hardware malfunctions resulting from using our tools.
          </p>

          <h2 className="text-xl font-semibold mt-8 text-zinc-900 dark:text-zinc-50">3. Third-Party Codecs</h2>
          <p>
            Certain conversion processes rely on open-source libraries (e.g., WebP encoders, PDF rendering blocks). Any associated performance variations or defects reside with their original authors.
          </p>
        </div>
      </div>
    </Container>
  );
}
