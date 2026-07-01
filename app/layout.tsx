import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ImageConvertersACRAV - Free Online Image & Utility Tools",
    template: "%s | ImageConvertersACRAV",
  },
  description:
    "Free online image converter, PDF tools, text utilities, and developer tools. Fast, private, client-side processing. No uploads needed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var theme = localStorage.getItem("theme");
              if (!theme) {
                theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
              }
              if (theme === "dark") {
                document.documentElement.classList.add("dark");
              }
            })();
          `
        }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
