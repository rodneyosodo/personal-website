import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/blogs";

function generateBlogsSitemap() {
  const posts = getArticles();
  const sitemap: MetadataRoute.Sitemap = [];

  for (const post of posts) {
    sitemap.push({
      url: `/blogs/${post.slug}`,
      lastModified: new Date(post.metadata.date).toISOString(),
      priority: 0.5,
    });
  }

  return sitemap;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "/",
      lastModified: new Date().toISOString(),
      priority: 1,
    },
    {
      url: "/publications",
      lastModified: new Date().toISOString(),
      priority: 0.8,
    },
    {
      url: "/awards",
      lastModified: new Date().toISOString(),
      priority: 0.7,
    },
    {
      url: "/talks",
      lastModified: new Date().toISOString(),
      priority: 0.6,
    },
    {
      url: "/blogs",
      lastModified: new Date().toISOString(),
      priority: 0.5,
    },
    ...generateBlogsSitemap(),
  ];
}
