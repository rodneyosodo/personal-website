import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/blogs";

const baseUrl = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.rodneyosodo.com"
).replace(/\/+$/, "");

async function generateBlogsSitemap() {
  const posts = await getArticles();
  const sitemap: MetadataRoute.Sitemap = [];

  for (const post of posts) {
    sitemap.push({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: new Date(post.metadata.date).toISOString(),
      priority: 0.5,
    });
  }

  return sitemap;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // lastModified is intentionally omitted for static pages: using the build
  // timestamp changes on every deploy, which teaches Google to ignore it.
  const posts = await getArticles();
  const latestPostDate = posts
    .map((post) => new Date(post.metadata.date).getTime())
    .reduce((a, b) => Math.max(a, b), 0);

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(latestPostDate).toISOString(),
      priority: 1,
    },
    {
      url: `${baseUrl}/experience`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/publications`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/awards`,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/talks`,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(latestPostDate).toISOString(),
      priority: 0.5,
    },
    ...(await generateBlogsSitemap()),
  ];
}
