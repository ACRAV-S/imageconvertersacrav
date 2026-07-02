"use client";

import { useState, useCallback, useEffect, useRef, useLayoutEffect } from "react";
import PdfPagePreview from "./PdfPagePreview";

interface PdfPageSelectorProps {
  file: File;
  pageCount: number;
  selectedPages: number[];
  onSelectionChange: (pages: number[]) => void;
}

export default function PdfPageSelector({
  file,
  pageCount,
  selectedPages,
  onSelectionChange,
}: PdfPageSelectorProps) {
  const [selectAll, setSelectAll] = useState(false);
  const prevSelectedRef = useRef<number[]>(selectedPages);
  const prevPageCountRef = useRef(pageCount);

  useLayoutEffect(() => {
    if (
      prevSelectedRef.current.length !== selectedPages.length ||
      prevPageCountRef.current !== pageCount
    ) {
      setSelectAll(selectedPages.length === pageCount && pageCount > 0);
    }
    prevSelectedRef.current = selectedPages;
    prevPageCountRef.current = pageCount;
  }, [selectedPages, pageCount]);

  const togglePage = useCallback(
    (pageNum: number) => {
      const next = selectedPages.includes(pageNum)
        ? selectedPages.filter((p) => p !== pageNum)
        : [...selectedPages, pageNum];
      onSelectionChange(next);
    },
    [selectedPages, onSelectionChange]
  );

  const toggleSelectAll = useCallback(() => {
    if (selectAll) {
      onSelectionChange([]);
    } else {
      onSelectionChange(Array.from({ length: pageCount }, (_, i) => i + 1));
    }
  }, [selectAll, pageCount, onSelectionChange]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {selectedPages.length} of {pageCount} pages selected
        </p>
        <button
          type="button"
          onClick={toggleSelectAll}
          className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          {selectAll ? "Deselect All" : "Select All"}
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => (
          <PdfPagePreview
            key={pageNum}
            file={file}
            pageNumber={pageNum}
            selected={selectedPages.includes(pageNum)}
            onSelect={togglePage}
          />
        ))}
      </div>
    </div>
  );
}
