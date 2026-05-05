import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Form from "@/components/form";
import { CustomMdx } from "@/components/mdx";
import { getArticleBySlug, getArticles } from "@/lib/blogs";

const baseUrl = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://rodneyosodo.com"
).replace(/\/+$/, "");

const EXCERPT_WORD_COUNT = 20;

function extractExcerpt(content: string): string {
  const cleaned = content
    .replace(/^---[\s\S]*?---/, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[#*_`~\[\]()]/g, "")
    .replace(/https?:\/\/[^\s]+/g, "")
    .replace(/\n+/g, " ")
    .trim();
  const allWords = cleaned ? cleaned.split(/\s+/) : [];
  const words = allWords.slice(0, EXCERPT_WORD_COUNT);
  return words.join(" ") + (allWords.length >= EXCERPT_WORD_COUNT ? "..." : "");
}

export async function generateStaticParams() {
  const posts = await getArticles();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = await getArticleBySlug(params.slug);

  if (!post) {
    return { title: "Not Found" };
  }

  const ogImageUrl = `${baseUrl}/blogs/og/${post.slug}`;

  return {
    title: post.metadata.title,
    description: extractExcerpt(post.content),
    openGraph: {
      title: post.metadata.title,
      url: `${baseUrl}/blogs/${post.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
  };
}

export default async function Article(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await getArticleBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto max-w-8xl px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="title font-semibold text-3xl tracking-tighter mt-2 mb-2">
            {post.metadata.title}
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            {new Date(post.metadata.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <article className="prose">
            <CustomMdx source={post.content} />
          </article>
          <Form />
        </div>
      </div>
    </div>
  );
}
