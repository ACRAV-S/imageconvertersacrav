export default function NewsletterCTA() {
  return (
    <section className="rounded-xl border border-zinc-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 dark:border-zinc-800 dark:from-blue-950/30 dark:to-cyan-950/30">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
        Stay Updated
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Get the latest articles and tutorials about image processing, PDF tools, and web development delivered to your inbox.
      </p>
      <div className="mt-4 flex gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          aria-label="Email address for newsletter"
          className="flex-1 min-w-0 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-500 transition-colors"
        />
        <button
          type="button"
          className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-colors"
        >
          Subscribe
        </button>
      </div>
    </section>
  );
}
