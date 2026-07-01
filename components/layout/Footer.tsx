import Link from "next/link";
import Container from "../common/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-100 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-950 transition-colors">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-blue-600 dark:text-blue-500">
                ACR<span className="text-zinc-950 dark:text-white">AV</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Free online image, PDF, text and developer tools. Fully client-side, fast, and secure.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Popular Tools</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                  Image Converter
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                  PDF Compressor
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                  JSON Formatter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-100 pt-8 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center sm:text-left">
            &copy; {currentYear} ImageConvertersACRAV. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-zinc-400 dark:text-zinc-500">
            <span>Built for speed & privacy</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
