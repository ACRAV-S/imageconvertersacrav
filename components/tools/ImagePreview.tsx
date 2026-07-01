"use client";

import { useRef, useEffect, useState } from "react";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  label?: string;
  fileSize?: string;
  dimensions?: string;
}

export default function ImagePreview({ src, alt = "", label, fileSize, dimensions }: ImagePreviewProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const mountedRef = useRef(true);
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });

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

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      {label && (
        <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label}</h3>
      )}
      <div className="flex items-center justify-center rounded-lg bg-zinc-50 p-4 dark:bg-zinc-950">
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="max-h-72 max-w-full rounded object-contain"
        />
      </div>
      {(fileSize || naturalSize.w > 0) && (
        <div className="mt-3 flex gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          {naturalSize.w > 0 && (
            <span>
              {naturalSize.w} &times; {naturalSize.h} px
            </span>
          )}
          {fileSize && <span>{fileSize}</span>}
        </div>
      )}
    </div>
  );
}
