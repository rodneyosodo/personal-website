import { extractExcerpt, getArticles } from "@/lib/blogs";

export const dynamic = "force-static";

const baseUrl = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.rodneyosodo.com"
).replace(/\/+$/, "");

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = (await getArticles()).sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );

  const items = posts
    .map((post) => {
      const url = `${baseUrl}/blogs/${post.slug}`;
      const description =
        post.metadata.description || extractExcerpt(post.content);
      return `    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rodney Osodo</title>
    <link>${baseUrl}</link>
    <description>Essays on distributed systems, Go, and Rust, plus travel writing from across Africa.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
