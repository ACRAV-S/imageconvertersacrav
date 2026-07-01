import type { Metadata } from "next";
import FilterToolShell from "@/components/tools/FilterToolShell";

export const metadata: Metadata = {
  title: "Saturation Adjuster",
  description: "Control color intensity online. Boost colors for vibrant photos or desaturate for a muted look. Free and private — all in your browser.",
};

export default function SaturationPage() {
  return (
    <FilterToolShell
      title="Saturation Adjuster"
      description="Control the color intensity of your image. Increase saturation for bold, vibrant colors, or decrease for a subtle, muted appearance. All processing happens in your browser."
      filterType="saturation"
      params={[
        { key: "value", label: "Saturation", min: -100, max: 100, step: 1, default: 0 },
      ]}
      faqs={[
        {
          question: "What is saturation?",
          answer: "Saturation measures the intensity of colors in an image. High saturation produces vivid, rich colors. Low saturation creates dull, grayish tones.",
        },
        {
          question: "What saturation value should I use?",
          answer: "For a natural boost, try +10 to +30. For vibrant, punchy colors, use +40 to +70. Reduce with negative values for a desaturated, moody look.",
        },
        {
          question: "What is the difference between saturation and vibrance?",
          answer: "Saturation adjusts all colors equally. Vibrance (not available in this tool) selectively boosts less-saturated colors while preserving already vivid ones.",
        },
        {
          question: "Is my image uploaded to a server?",
          answer: "Never. Everything runs client-side in your browser using the HTML Canvas API. Your files never leave your device.",
        },
      ]}
    />
  );
}
