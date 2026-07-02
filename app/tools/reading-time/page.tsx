import type { Metadata } from "next";
import TextToolShell from "@/components/tools/text/TextToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Reading Time Calculator - Estimate Reading Time | ImageConvertersACRAV",
  description:
    "Calculate how long it takes to read any text. Get estimated reading and speaking times instantly. Free reading time calculator.",
  openGraph: {
    title: "Reading Time Calculator - Free Online Reading Duration Estimator",
    description:
      "Estimate reading and speaking times for any text. Based on average reading speed of 238 words per minute.",
  },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <TextToolShell
      title="Reading Time Calculator"
      description="Calculate how long it takes to read any text. Get estimated reading and speaking times instantly."
      mode="reading-time"
      faqs={[
        {
          question: "How is reading time calculated?",
          answer: "Reading time is calculated using the average adult reading speed of 238 words per minute. The total word count is divided by 238 and rounded up to the nearest minute.",
        },
        {
          question: "How is speaking time different from reading time?",
          answer: "Speaking time uses a slower rate of 183 words per minute, which is the average conversational speaking pace. Reading silently is typically faster than reading aloud, so speaking time is usually longer.",
        },
        {
          question: "Are these estimates accurate?",
          answer: "These estimates are based on average reading and speaking speeds. Actual times may vary depending on content complexity, reader familiarity with the topic, and individual reading speed differences.",
        },
        {
          question: "Can I use this for blog post planning?",
          answer: "Absolutely. Bloggers and content creators use reading time estimates to help readers gauge content length. Most readers prefer articles that take 5-10 minutes to read.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
