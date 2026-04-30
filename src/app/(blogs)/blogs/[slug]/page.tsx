import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Form from "@/components/form";
import { CustomMdx } from "@/components/mdx";
import { getArticleBySlug, getArticles } from "@/lib/blogs";

const baseUrl = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://rodneyosodo.com"
).replace(/\/+$/, "");

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
    description: `Blog post by Rodney Osodo published on ${new Date(post.metadata.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
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
          <h1 className="title font-semibold text-3xl tracking-tighter mt-2 mb-8">
            {post.metadata.title}
          </h1>
          <p className="text-muted-foreground text-sm mt-2 mb-8">
            Published on{" "}
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
