import type { Metadata } from "next";
import Container from "@/components/common/Container";

const siteUrl = "https://imageconvertersacrav.vercel.app";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for ImageConvertersACRAV. By accessing or using our website, you agree to comply with these terms.",
  alternates: { canonical: `${siteUrl}/terms` },
  openGraph: {
    title: "Terms of Service | ImageConvertersACRAV",
    description: "Terms of service for ImageConvertersACRAV.",
    url: `${siteUrl}/terms`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | ImageConvertersACRAV",
    description: "Terms of service for ImageConvertersACRAV.",
  },
};

export default function TermsPage() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl prose dark:prose-invert">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-6 text-zinc-600 dark:text-zinc-400">
          Last updated: July 1, 2026
        </p>

        <div className="mt-8 space-y-6 text-zinc-700 dark:text-zinc-300">
          <p>
            Welcome to ImageConvertersACRAV. By accessing or using our website, you agree to comply with and be bound by the following terms of service.
          </p>

          <h2 className="text-xl font-semibold mt-8 text-zinc-900 dark:text-zinc-50">1. Acceptance of Terms</h2>
          <p>
            These terms govern your use of the free utilities and layouts hosted under the ImageConvertersACRAV service. If you do not agree with any part of these terms, you are prohibited from using the platform.
          </p>

          <h2 className="text-xl font-semibold mt-8 text-zinc-900 dark:text-zinc-50">2. Permitted Use</h2>
          <p>
            You are granted a non-exclusive, non-transferable, revocable license to access our platform strictly for personal or professional file processing. All processing is executed client-side, and you retain complete, exclusive ownership of your files.
          </p>

          <h2 className="text-xl font-semibold mt-8 text-zinc-900 dark:text-zinc-50">3. Limitations and Misuse</h2>
          <p>
            You must not misuse our services by introducing malware, scripting mass browser denial-of-service queries, or attempting to compromise site integrity.
          </p>

          <h2 className="text-xl font-semibold mt-8 text-zinc-900 dark:text-zinc-50">4. Intellectual Property</h2>
          <p>
            The interface code, layout design, branding elements, and logic files of ImageConvertersACRAV are protected by copyright laws. You may not clone, distribute, or reverse-engineer the codebase without direct, explicit written permission.
          </p>
        </div>
      </div>
    </Container>
  );
}
