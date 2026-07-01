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
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (imgRef.current) {
      const handleLoad = () => {
        setNaturalSize({ w: imgRef.current!.naturalWidth, h: imgRef.current!.naturalHeight });
      };
      imgRef.current.addEventListener("load", handleLoad);
      if (imgRef.current.complete) handleLoad();
      return () => imgRef.current?.removeEventListener("load", handleLoad);
    }
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
