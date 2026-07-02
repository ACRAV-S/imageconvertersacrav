"use client";

import { useRef, useEffect, useState } from "react";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  label?: string;
  fileSize?: string;
  dimensions?: string;
  showZoom?: boolean;
}

export default function ImagePreview({ src, alt = "", label, fileSize, dimensions, showZoom }: ImagePreviewProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const mountedRef = useRef(true);
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      if (mountedRef.current) {
        setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
      }
    };
    img.addEventListener("load", handleLoad);
    if (img.complete) handleLoad();
    return () => img.removeEventListener("load", handleLoad);
  }, [src]);

  const aspectRatio = naturalSize.w > 0 && naturalSize.h > 0
    ? `${naturalSize.w / gcd(naturalSize.w, naturalSize.h)}:${naturalSize.h / gcd(naturalSize.w, naturalSize.h)}`
    : null;

  return (
    <>
      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        {label && (
          <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label}</h3>
        )}
        <div className="relative flex items-center justify-center rounded-lg bg-zinc-50 p-4 dark:bg-zinc-950">
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={`max-h-72 max-w-full rounded object-contain ${showZoom ? "cursor-zoom-in" : ""}`}
            onClick={() => showZoom && setZoomOpen(true)}
          />
          {naturalSize.w > 0 && (
            <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-[11px] text-white">
              {naturalSize.w} × {naturalSize.h}
            </span>
          )}
        </div>
        {(fileSize || dimensions || aspectRatio) && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
            {dimensions && <span>{dimensions}</span>}
            {fileSize && <span>{fileSize}</span>}
            {aspectRatio && (
              <span className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
                {aspectRatio}
              </span>
            )}
          </div>
        )}
      </div>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setZoomOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setZoomOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed image"
        >
          <button
            onClick={() => setZoomOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            aria-label="Close zoom"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
