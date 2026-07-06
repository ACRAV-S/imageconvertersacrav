import type { Tool } from "@/types/tool";
import type { BlogPost } from "@/data/blog/types";

export function organizationSchema(siteUrl: string, siteName: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    description,
  };
}

export function websiteSchema(siteUrl: string, siteName: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbListSchema(
  items: { name: string; item?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.item ? { item: item.item } : {}),
    })),
  };
}

export function articleSchema(
  post: BlogPost,
  siteUrl: string,
  siteName: string,
) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    datePublished: post.publishedAt,
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
  };

  if (post.updatedAt) {
    schema.dateModified = post.updatedAt;
  }

  if (post.image) {
    schema.image = {
      "@type": "ImageObject",
      url: post.image,
      width: 1200,
      height: 630,
      ...(post.imageAlt ? { caption: post.imageAlt } : {}),
    };
  }

  return schema;
}

export function faqPageSchema(
  questions: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

export function softwareApplicationSchema(tool: Tool, siteUrl: string) {
  const categoryMap: Record<string, string> = {
    image: "Multimedia",
    pdf: "UtilitiesApplication",
    text: "DeveloperApplication",
    "text-code": "DeveloperApplication",
    developer: "DeveloperApplication",
    qr: "UtilitiesApplication",
    color: "Multimedia",
    calculator: "BusinessApplication",
  };

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    url: `${siteUrl}/tools/${tool.slug}`,
    description: tool.description,
    applicationCategory: categoryMap[tool.category] || "UtilitiesApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
  };
}

export function collectionPageSchema(
  name: string,
  description: string,
  url: string,
  items?: { url: string }[],
) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
  };

  if (items && items.length > 0) {
    schema.mainEntity = {
      "@type": "ItemList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: item.url,
      })),
    };
  }

  return schema;
}

export function webPageSchema(
  name: string,
  description: string,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
  };
}

export function extractFaqFromContent(
  content: string,
): { question: string; answer: string }[] | null {
  const regex =
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    try {
      const data = JSON.parse(match[1].trim());
      if (data["@type"] === "FAQPage" && Array.isArray(data.mainEntity)) {
        return data.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({
          question: item.name,
          answer: item.acceptedAnswer.text,
        }));
      }
    } catch {
      continue;
    }
  }
  return null;
}

export function stripJsonLdFromContent(content: string): string {
  return content.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
    "",
  );
}
