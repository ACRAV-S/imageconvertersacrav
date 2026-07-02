"use client";

import Container from "@/components/common/Container";
import FaqSection from "@/components/tools/FaqSection";
import type { FaqItem } from "@/components/tools/FaqSection";

interface PdfUnavailableToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
  operation: string;
  reason: string;
  api: string;
}

export default function PdfUnavailableTool({
  title,
  description,
  faqs,
  operation,
  reason,
  api,
}: PdfUnavailableToolProps) {
  return (
    <Container className="py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-8 dark:border-amber-800 dark:bg-amber-950/30">
        <div className="flex items-center gap-3">
          <svg className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-300">
            Browser API Limitation
          </h2>
        </div>
        <p className="mt-4 text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
          To <strong>{operation}</strong>, a PDF manipulation library is required.
          Web browsers do not provide native APIs to modify the internal structure of PDF files.
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-amber-200 bg-white p-4 dark:border-amber-800 dark:bg-amber-950/20">
            <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">Why this is not possible</h3>
            <p className="mt-1 text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
              {reason}
            </p>
          </div>

          <div className="rounded-lg border border-amber-200 bg-white p-4 dark:border-amber-800 dark:bg-amber-950/20">
            <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">What would be needed</h3>
            <p className="mt-1 text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
              A client-side library like <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs dark:bg-amber-900/50">{api}</code> can be used to perform this operation entirely in the browser.
              This tool is ready to integrate such a library when added to the project.
            </p>
          </div>
        </div>
      </div>

      <FaqSection faqs={faqs} />
    </Container>
  );
}
