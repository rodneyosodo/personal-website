import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "@takumi-rs/image-response";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticles } from "@/lib/blogs";
import { BlogOGImage, getOGImageOptions } from "@/lib/og";

export const revalidate = false;

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

async function resolveImageUrl(imageSrc?: string): Promise<string | undefined> {
  if (!imageSrc) return undefined;
  if (imageSrc.startsWith("http")) return imageSrc;
  if (imageSrc.startsWith("/")) {
    const ext = path.extname(imageSrc).toLowerCase();
    if (!imageExtensions.has(ext)) return undefined;
    const filePath = path.join(process.cwd(), "public", imageSrc);
    const data = await readFile(filePath);
    const mime =
      ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : `image/${ext.slice(1)}`;
    return `data:${mime};base64,${data.toString("base64")}`;
  }
  return undefined;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getArticleBySlug(slug);

  if (!post) {
    notFound();
  }

  return new ImageResponse(
    <BlogOGImage
      title={post.metadata.title}
      date={new Date(post.metadata.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}
      backgroundImageUrl={await resolveImageUrl(post.metadata.image)}
    />,
    await getOGImageOptions(),
  );
}

export function generateStaticParams() {
  return getArticles().map((post) => ({ slug: post.slug }));
}
