import { getSortedPosts } from "@/data/blog/utils";

export async function GET() {
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
      ${post.categories.map((cat) => `<category>${cat}</category>`).join("\n      ")}
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

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
