import type { Metadata } from "next";
import FilterToolShell from "@/components/tools/FilterToolShell";

export const metadata: Metadata = {
  title: "Brightness Adjuster",
  description: "Adjust image brightness online. Lighten underexposed photos or darken overexposed ones. Free and private — all in your browser.",
};

export default function BrightnessPage() {
  return (
    <FilterToolShell
      title="Brightness Adjuster"
      description="Adjust the brightness of your image. Move the slider right to lighten, left to darken. All processing happens in your browser."
      filterType="brightness"
      params={[
        { key: "value", label: "Brightness", min: -100, max: 100, step: 1, default: 0 },
      ]}
      faqs={[
        {
          question: "How does brightness adjustment work?",
          answer: "Brightness adjustment adds or subtracts a value from each pixel's RGB channels. Positive values lighten the image, negative values darken it.",
        },
        {
          question: "What brightness value should I use?",
          answer: "For subtle corrections, try between -20 and +20. For dramatic effects, use values up to ±100. At +100, the image becomes nearly white.",
        },
        {
          question: "Does brightness affect contrast?",
          answer: "Brightness changes affect the entire image uniformly. For more targeted adjustments, try the Contrast Adjuster tool.",
        },
        {
          question: "Is my image uploaded to a server?",
          answer: "Never. Everything runs client-side in your browser using the HTML Canvas API. Your files never leave your device.",
        },
      ]}
    />
  );
}
