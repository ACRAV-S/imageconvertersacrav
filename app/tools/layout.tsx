"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { getToolBySlug } from "@/data";
import RelatedContent from "@/components/tools/RelatedContent";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();

  if (!segment) {
    return <>{children}</>;
  }

  const tool = getToolBySlug(segment);

  if (!tool) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <RelatedContent tool={tool} />
    </>
  );
}
