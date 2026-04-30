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
    const ext = imageSrc.split(".").pop()?.toLowerCase();
    if (!ext || !imageExtensions.has(`.${ext}`)) return undefined;
    try {
      const filePath = `${process.cwd()}/public${imageSrc}`;
      const file = Bun.file(filePath);
      if (!(await file.exists())) return undefined;
      const data = await file.arrayBuffer();
      const mime =
        ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext}`;
      return `data:${mime};base64,${Buffer.from(data).toString("base64")}`;
    } catch {
      return undefined;
    }
  }
  return undefined;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);

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

export async function generateStaticParams() {
  const posts = await getArticles();
  return posts.map((post) => ({ slug: post.slug }));
}
