export interface BlogAuthor {
  name: string;
  bio?: string;
  avatar?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  metaDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  searchIntent?: string;
  content: string;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  categories: string[];
  tags: string[];
  featured: boolean;
  readingTime: number;
  image?: string;
  imageAlt?: string;
  imagePreview?: string;
  altTexts?: string[];
}
