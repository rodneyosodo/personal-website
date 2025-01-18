import { notFound } from "next/navigation";
import { CustomMdx } from "@/components/mdx";
import { getArticles } from "@/lib/blogs";
import { Suspense } from "react";

export default async function Article(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const posts = getArticles();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          </div>
        </div>
      </div>
    </Suspense>
  );
}
