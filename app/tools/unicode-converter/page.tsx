import type { Metadata } from "next";
import TextToolShell from "@/components/tools/text/TextToolShell";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Unicode Converter - Encode/Decode Unicode Online | ImageConvertersACRAV",
  description:
    "Convert text to Unicode escape sequences and decode Unicode escapes back to readable characters. Free online unicode converter.",
  openGraph: {
    title: "Unicode Converter - Free Online Unicode Escape Tool",
    description:
      "Encode text to Unicode escape sequences (\\uXXXX) and decode them back to readable characters. Supports all Unicode characters.",
  },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <TextToolShell
      title="Unicode Converter"
      description="Convert text to Unicode escape sequences and decode Unicode escapes back to readable characters."
      mode="unicode-convert"
      faqs={[
        {
          question: "What are Unicode escape sequences?",
          answer: "Unicode escape sequences represent Unicode characters using the format \\uXXXX where XXXX is a four-digit hexadecimal code point. For example, the character '世' becomes '\\u4e16'. This format is commonly used in JSON, JavaScript strings, and programming languages.",
        },
        {
          question: "When would I use Unicode encoding?",
          answer: "Unicode encoding is useful when working with JSON data, JavaScript string literals, programming that requires ASCII-safe representations, or when transferring text through systems that may not support certain Unicode characters.",
        },
        {
          question: "What characters are encoded?",
          answer: "All non-ASCII characters (code point > 127) are encoded to \\uXXXX format. ASCII characters (standard letters, digits, and common symbols) are left as-is for readability. The backslash character is also encoded to avoid escape confusion.",
        },
        {
          question: "Is this tool free and private?",
          answer: "Yes. Free to use with all processing done locally in your browser. Your text is never sent to any server.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
