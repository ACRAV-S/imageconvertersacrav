import type { Metadata } from "next";
import Container from "@/components/common/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ImageConvertersACRAV privacy policy. Your privacy is our highest priority — file transformations are processed directly in your browser.",
};

export default function PrivacyPage() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl prose dark:prose-invert">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-zinc-600 dark:text-zinc-400">
          Last updated: July 1, 2026
        </p>

        <div className="mt-8 space-y-6 text-zinc-700 dark:text-zinc-300">
          <p>
            At ImageConvertersACRAV, your privacy is our highest priority. We believe in providing robust web utilities without harvesting or tracking your personal files.
          </p>

          <h2 className="text-xl font-semibold mt-8 text-zinc-900 dark:text-zinc-50">1. Information We Do Not Collect</h2>
          <p>
            Unlike typical conversion platforms, we do NOT upload your media files, PDFs, or code blocks to external servers. File transformations are processed directly inside your browser utilizing JavaScript, HTML5 Canvas, WebAssembly, and local APIs. Your source files and converted outputs never leave your computer.
          </p>

          <h2 className="text-xl font-semibold mt-8 text-zinc-900 dark:text-zinc-50">2. Analytics and Logging</h2>
          <p>
            We may use lightweight, privacy-respecting analytical services to monitor aggregate site traffic and load patterns. This telemetry does not contain personal indicators or track the files you operate inside our tools.
          </p>

          <h2 className="text-xl font-semibold mt-8 text-zinc-900 dark:text-zinc-50">3. Cookies</h2>
          <p>
            We use minimal local cookies or local storage strictly to remember your site settings, such as your selected visual theme (Light/Dark mode) or preferred default conversion settings.
          </p>

          <h2 className="text-xl font-semibold mt-8 text-zinc-900 dark:text-zinc-50">4. Third-Party Links</h2>
          <p>
            Our website may contain links to external reference resources or template hosts. We have no authority over and assume no liability for the content, privacy mandates, or practices of any third-party networks.
          </p>
        </div>
      </div>
    </Container>
  );
}
