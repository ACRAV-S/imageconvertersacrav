import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import CategoryCard from "@/components/tools/CategoryCard";
import ToolGrid from "@/components/tools/ToolGrid";
import { categories, getPopularTools } from "@/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://imageconvertersacrav.vercel.app";

export const metadata: Metadata = {
  title: "Free Online Image Converter & Utility Tools",
  description:
    "Convert images, compress PDFs, format code, and more. 100+ free online tools — all processing runs client-side. Your files never leave your device.",
  openGraph: {
    title: "ImageConvertersACRAV - Free Online Tools",
    description:
      "Convert images, compress PDFs, format code, and more. 100+ free online tools — all processing runs client-side.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "ImageConvertersACRAV - Free Online Tools",
    description:
      "Convert images, compress PDFs, format code, and more. 100+ free online tools — all processing runs client-side.",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ImageConvertersACRAV",
    url: SITE_URL,
    description: "Free online image converter, PDF tools, text utilities, and developer tools. Fast, private, client-side processing.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex-1 flex flex-col">
      <section className="relative overflow-hidden border-b border-zinc-100 dark:border-zinc-800">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_35%_at_50%_0%,rgba(59,130,246,0.08),transparent)] dark:bg-[radial-gradient(45%_35%_at_50%_0%,rgba(59,130,246,0.12),transparent)]" />
        <Container className="py-20 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
              Fast, Private Tools
              <br />
              <span className="text-blue-600 dark:text-blue-500">Right in Your Browser</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Convert images, compress PDFs, format code, and more. Everything runs client-side —
              your files never leave your device.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/tools"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Browse All Tools
              </Link>
              <Link
                href="/about"
                className="rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </section>

      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-blue-600 dark:text-blue-500">Categories</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Everything you need, organized
          </p>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Four categories covering the most common file and text operations.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </Container>

      <section className="border-y border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950/50">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Popular Tools
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Our most-used utilities, ready when you are.
            </p>
          </div>
          <ToolGrid tools={getPopularTools()} />
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-blue-600 dark:text-blue-500">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Built for speed and privacy
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "100% Client-Side",
              description: "All processing happens in your browser. Your files never touch a server — ever.",
              icon: (
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              ),
            },
            {
              title: "Lightning Fast",
              description: "Powered by modern Web APIs and WebAssembly for near-native performance.",
              icon: (
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              ),
            },
            {
              title: "No Sign-Up Required",
              description: "Free and open to everyone. No accounts, no subscriptions, no data collection.",
              icon: (
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              ),
            },
            {
              title: "Works Offline",
              description: "Tools are cached and functional even without an internet connection.",
              icon: (
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                </svg>
              ),
            },
            {
              title: "Supports All Formats",
              description: "Wide format support including JPG, PNG, WebP, AVIF, PDF, SVG, and more.",
              icon: (
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              ),
            },
            {
              title: "Developer Friendly",
              description: "Clean outputs, keyboard shortcuts, and API access for power users.",
              icon: (
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              ),
            },
          ].map((feature) => (
            <div key={feature.title} className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/50">
                {feature.icon}
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">{feature.title}</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <section className="border-t border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950/50">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              No sign-ups, no uploads, no limits. Pick a tool and go.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/tools"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Browse All Tools
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
    </>
  );
}
