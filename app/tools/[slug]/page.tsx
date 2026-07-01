import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/common/Container";
import { tools, getToolBySlug } from "@/data/tools";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <Container className="py-12">
      <div className="mb-8">
        <Link
          href="/tools"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        >
          &larr; All Tools
        </Link>
      </div>

      <div className="max-w-3xl">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{tool.icon}</span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {tool.title}
            </h1>
            <p className="mt-1 text-sm capitalize text-zinc-500 dark:text-zinc-400">
              {tool.category.replace("-", " & ")}
            </p>
          </div>
        </div>

        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
          {tool.description}
        </p>
      </div>

      <div className="mt-12 rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-zinc-400 dark:text-zinc-500 text-sm">
          Tool functionality coming soon.
        </p>
      </div>
    </Container>
  );
}
