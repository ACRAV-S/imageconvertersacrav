import type { Metadata } from "next";
import TextGeneratorTool from "@/components/tools/text/TextGeneratorTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Random String Generator - Generate Secure Strings | ImageConvertersACRAV",
  description:
    "Generate secure random strings with customizable length and character sets. Perfect for passwords and tokens. Free online random string generator.",
  openGraph: {
    title: "Random String Generator - Free Online Secure String Generator",
    description:
      "Generate cryptographically secure random strings with customizable character sets including uppercase, lowercase, digits, and symbols.",
  },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <TextGeneratorTool
      title="Random String Generator"
      description="Generate secure random strings with customizable length and character sets. Perfect for passwords and tokens."
      mode="random-string"
      faqs={[
        {
          question: "How random are the generated strings?",
          answer: "The generator uses the Web Crypto API (crypto.getRandomValues), which is cryptographically secure. It is the same random number generator used for encryption and security applications. The randomness is suitable for passwords, tokens, and security keys.",
        },
        {
          question: "Can I customize the character set?",
          answer: "Yes. You can enable or disable four character categories: uppercase letters (A-Z), lowercase letters (a-z), digits (0-9), and symbols (!@#$%^&*()_-+=<>?/{}~). At least one category must be selected.",
        },
        {
          question: "What is the maximum string length?",
          answer: "The maximum length is 256 characters for practical display purposes, but the underlying crypto API supports much longer strings. Use the slider to set the desired length.",
        },
        {
          question: "Is this suitable for password generation?",
          answer: "Yes. The cryptographically secure random generator makes this suitable for password generation. For maximum security, enable all character types and use a length of at least 16 characters.",
        },
      ]}
    />
    </ToolErrorBoundary>
  );
}
