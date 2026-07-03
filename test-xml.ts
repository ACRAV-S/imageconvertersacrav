import { getSortedPosts } from "./data/blog/utils";

const posts = getSortedPosts();
const siteUrl = "https://imageconvertersacrav.vercel.app";

const items = posts
  .map(
    (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      ${post.categories
        .map(
          (cat) =>
            `<category>${cat.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</category>`
        )
        .join("\n      ")}
    </item>`
  )
  .join("");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ImageConvertersACRAV Blog</title>
    <description>Articles, tutorials, and guides about image processing, PDF tools, and web development.</description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${posts.length > 0 ? new Date(posts[0].publishedAt).toUTCString() : new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

// Check for unescaped &
const lines = xml.split("\n");
lines.forEach((line, i) => {
  // Find & that are not part of entities
  const matches = line.match(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g);
  if (matches) {
    console.log(`Line ${i+1} has ${matches.length} unescaped &:`, matches);
    console.log(`  Content: ${line.trim()}`);
  }
});

console.log("XML validation check complete");
console.log("Feed length:", xml.length);