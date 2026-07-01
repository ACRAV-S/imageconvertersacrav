import type { Metadata } from "next";
import Container from "@/components/common/Container";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about ImageConvertersacrav — a fast, private, and free online tools platform. All processing runs client-side in your browser.",
};

export default function AboutPage() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          About ImageConvertersacrav
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          ImageConvertersacrav is a powerful, unified web platform designed to provide lightning-fast, high-quality, and completely private conversion tools. We believe that tools should be accessible, free of heavy advertisements, and respect user privacy above all else.
        </p>

        <div className="mt-12 space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Our Mission</h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
              Our mission is simple: to build the ultimate utility toolbox for developers, designers, writers, and everyday web users. We focus on performance and privacy. By processing your files directly inside your browser whenever possible, we ensure your sensitive data never touches an external server.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Key Principles</h2>
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-zinc-900 dark:text-zinc-50">100% Secure & Private</dt>
                <dd className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  Most of our image, PDF, and text operations run entirely client-side. Your uploads stay in your browser.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-900 dark:text-zinc-50">High Performance</dt>
                <dd className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  Built on modern Next.js 16 and optimized for speed, our tools execute processing tasks in milliseconds.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-900 dark:text-zinc-50">Developer First</dt>
                <dd className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  Clean UI, raw format access, and robust tools designed to satisfy precise professional specifications.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-900 dark:text-zinc-50">Completely Free</dt>
                <dd className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  All foundational utilities are free to use, without aggressive advertisements or subscription blockades.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Container>
  );
}
