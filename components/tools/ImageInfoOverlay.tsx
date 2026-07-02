"use client";

import type { ImageInfo } from "@/hooks/useImageInfo";

interface ImageInfoOverlayProps {
  info: ImageInfo;
  showExif?: boolean;
}

export default function ImageInfoOverlay({ info, showExif }: ImageInfoOverlayProps) {
  const items = [
    { label: "Dimensions", value: `${info.width} × ${info.height} px` },
    { label: "Aspect Ratio", value: info.aspectRatio },
    { label: "File Size", value: info.fileSize },
    { label: "File Name", value: info.fileName },
    { label: "Type", value: info.mimeType },
  ];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
        Image Information
      </h3>
      <dl className="space-y-1.5">
        {items.map(({ label, value }) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0">{label}</dt>
            <dd className="text-xs font-medium text-zinc-800 dark:text-zinc-200 text-right truncate">
              {value}
            </dd>
          </div>
        ))}
      </dl>
      {showExif && Object.keys(info.exif).length > 0 && (
        <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            EXIF Data
          </h4>
          <dl className="space-y-1">
            {Object.entries(info.exif).slice(0, 10).map(([key, value]) => (
              <div key={key} className="flex justify-between gap-4">
                <dt className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate">{key}</dt>
                <dd className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 text-right truncate">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
