import Link from "next/link";
import Container from "@/components/common/Container";

export default function NotFound() {
  return (
    <Container className="flex-1 flex flex-col items-center justify-center py-24 text-center">
      <div className="max-w-md">
        <div className="text-blue-600 dark:text-blue-500 font-extrabold text-7xl tracking-wider">
          404
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400">
          Sorry, we couldn&apos;t find the tool or utility page you are looking for. It might have been relocated or is under construction.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            Go back home
          </Link>
          <Link href="/contact" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </Container>
  );
}
