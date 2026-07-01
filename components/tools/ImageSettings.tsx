"use client";

interface ImageSettingsProps {
  targetFormat: string;
  quality: number;
  onFormatChange: (format: string) => void;
  onQualityChange: (quality: number) => void;
}

const FORMATS = [
  { value: "png", label: "PNG", desc: "Lossless, transparency" },
  { value: "jpg", label: "JPG", desc: "Small file size" },
  { value: "webp", label: "WebP", desc: "Best compression" },
];

export default function ImageSettings({
  targetFormat,
  quality,
  onFormatChange,
  onQualityChange,
}: ImageSettingsProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Convert Settings</h3>

      <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Target Format</label>
      <div className="mt-1.5 grid grid-cols-3 gap-2">
        {FORMATS.map((fmt) => (
          <button
            key={fmt.value}
            onClick={() => onFormatChange(fmt.value)}
            className={`rounded-lg border px-3 py-2 text-center text-xs font-medium transition-colors ${
              targetFormat === fmt.value
                ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-400"
                : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            <span className="block font-semibold">{fmt.label}</span>
            <span className="block mt-0.5 opacity-70">{fmt.desc}</span>
          </button>
        ))}
      </div>

      {targetFormat !== "png" && (
        <div className="mt-4">
          <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Quality: {Math.round(quality * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.01"
            value={quality}
            onChange={(e) => onQualityChange(parseFloat(e.target.value))}
            className="mt-1.5 block w-full accent-blue-600"
          />
        </div>
      )}
    </div>
  );
}
