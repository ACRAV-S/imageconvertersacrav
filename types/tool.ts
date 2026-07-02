export type ToolCategory = "image" | "pdf" | "text" | "text-code" | "developer" | "qr" | "color" | "calculator";

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
