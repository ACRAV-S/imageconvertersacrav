import type { Metadata } from "next";
import Container from "@/components/common/Container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the ImageConvertersACRAV team. Report bugs, suggest features, or ask questions.",
};

export default function ContactPage() {
  return (
    <Container className="py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Have feedback, a bug report, or a feature request? We would love to hear from you.
        </p>

        <form className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Message
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
                defaultValue={""}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled
              className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-not-allowed opacity-80"
            >
              Send Message (Disabled)
            </button>
            <p className="mt-2 text-xs text-zinc-500">Contact form is currently a demo interface.</p>
          </div>
        </form>
      </div>
    </Container>
  );
}
