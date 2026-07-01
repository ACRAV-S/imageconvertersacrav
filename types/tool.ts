export type ToolCategory = "image" | "pdf" | "text-code" | "developer";

export interface Tool {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  icon: string;
  keywords: string[];
}

export interface ToolCategoryMeta {
  id: ToolCategory;
  title: string;
  description: string;
  gradient: string;
}
