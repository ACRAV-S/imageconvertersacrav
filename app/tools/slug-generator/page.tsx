import type { Metadata } from "next";
import TextToolShell from "@/components/tools/text/TextToolShell";

export const metadata: Metadata = {
  title: "Slug Generator - Create URL Slugs Online | ImageConvertersACRAV",
  description:
    "Generate URL-friendly slugs from any text. Perfect for blog posts, pages, and SEO-friendly URLs. Free online slug generator.",
  openGraph: {
    title: "Slug Generator - Free Online URL Slug Creator",
    description:
      "Convert any text into a clean, URL-friendly slug. Automatically removes special characters and replaces spaces with hyphens.",
  },
};

export default function Page() {
  return (
    <TextToolShell
      title="Slug Generator"
      description="Generate URL-friendly slugs from any text. Perfect for blog posts, pages, and SEO-friendly URLs."
      mode="slug"
      faqs={[
        {
          question: "What is a URL slug?",
          answer: "A URL slug is the part of a URL that identifies a specific page in a human-readable format. For example, in 'example.com/blog/my-article', 'my-article' is the slug. Slugs should be lowercase, use hyphens instead of spaces, and contain only alphanumeric characters and hyphens.",
        },
        {
          question: "How does the slug generator work?",
          answer: "The tool converts your text to lowercase, removes special characters and non-word characters, replaces spaces and underscores with hyphens, removes consecutive hyphens, and trims any leading or trailing hyphens.",
        },
        {
          question: "Why are slugs important for SEO?",
          answer: "SEO-friendly slugs help search engines understand page content and improve click-through rates. A good slug is descriptive, readable, and contains relevant keywords. Search engines recommend using hyphens as word separators.",
        },
        {
          question: "Is this tool free and private?",
          answer: "Yes. Free to use with no data sent to any server. All processing happens locally in your browser.",
        },
      ]}
    />
  );
}
