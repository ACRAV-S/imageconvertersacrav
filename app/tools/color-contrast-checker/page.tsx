import type { Metadata } from "next";
import ColorContrastTool from "@/components/tools/color/ColorContrastTool";
import ToolErrorBoundary from "@/components/tools/ToolErrorBoundary";

export const metadata: Metadata = {
  title: "Color Contrast Checker (WCAG) - Check Contrast Online | ImageConvertersACRAV",
  description: "Check color contrast ratios against WCAG standards. Ensure your designs meet accessibility requirements with our free contrast checker.",
  openGraph: { title: "Color Contrast Checker - Free WCAG Accessibility Tool", description: "Check color contrast ratios against WCAG AA and AAA standards for accessible design." },
};

export default function Page() {
  return (
    <ToolErrorBoundary>
      <ColorContrastTool
      title="Color Contrast Checker (WCAG)"
      description="Check color contrast ratios against WCAG standards. Ensure your designs meet accessibility requirements."
      faqs={[
        { question: "What is WCAG contrast ratio?", answer: "WCAG (Web Content Accessibility Guidelines) defines minimum contrast ratios between text and background colors. AA requires 4.5:1 for normal text and 3:1 for large text. AAA requires 7:1 and 4.5:1 respectively." },
        { question: "How is contrast ratio calculated?", answer: "Contrast ratio is calculated using the relative luminance of each color. The formula is (L1 + 0.05) / (L2 + 0.05) where L1 is the lighter color's luminance and L2 is the darker color's luminance." },
        { question: "What is the difference between AA and AAA?", answer: "AA is the minimum compliance level for most websites. AAA is a higher standard that provides better accessibility. While AAA is recommended, it is not always achievable for all design elements." },
        { question: "Is this tool free and secure?", answer: "Yes. All contrast calculations happen in your browser. No color data is sent anywhere." },
      ]}
    />
    </ToolErrorBoundary>
  );
}
