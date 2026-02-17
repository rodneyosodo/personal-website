import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/blogs";

const baseUrl = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://rodneyosodo.com"
).replace(/\/+$/, "");

function generateBlogsSitemap() {
  const posts = getArticles();
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

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      priority: 1,
    },
    {
      url: `${baseUrl}/publications`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/awards`,
      lastModified: new Date().toISOString(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/talks`,
      lastModified: new Date().toISOString(),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date().toISOString(),
      priority: 0.5,
    },
    ...generateBlogsSitemap(),
  ];
}
