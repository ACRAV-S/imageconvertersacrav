import type { Metadata } from "next";
import FilterToolShell from "@/components/tools/FilterToolShell";

export const metadata: Metadata = {
  title: "Contrast Adjuster",
  description: "Fine-tune image contrast online. Make colors pop or create soft, muted looks. Free and private — all in your browser.",
};

export default function ContrastPage() {
  return (
    <FilterToolShell
      title="Contrast Adjuster"
      description="Adjust the contrast of your image. Increase contrast to make colors and details pop, or decrease for a softer, muted look. All processing happens in your browser."
      filterType="contrast"
      params={[
        { key: "value", label: "Contrast", min: -100, max: 100, step: 1, default: 0 },
      ]}
      faqs={[
        {
          question: "What is image contrast?",
          answer: "Contrast measures the difference between the lightest and darkest parts of an image. Higher contrast makes bright areas brighter and dark areas darker.",
        },
        {
          question: "What contrast value should I use?",
          answer: "For subtle enhancement, try +10 to +30. For high-contrast looks, use +50 to +80. Reduce contrast with negative values for a faded, vintage look.",
        },
        {
          question: "Can I restore the original after adjusting?",
          answer: "Set the slider back to 0 and re-process. Each adjustment creates a new result from the original uploaded image.",
        },
        {
          question: "Is my image uploaded to a server?",
          answer: "Never. Everything runs client-side in your browser using the HTML Canvas API. Your files never leave your device.",
        },
      ]}
    />
  );
}
