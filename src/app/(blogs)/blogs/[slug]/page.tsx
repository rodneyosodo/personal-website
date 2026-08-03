import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Form from "@/components/form";
import { CustomMdx } from "@/components/mdx";
import { extractExcerpt, getArticleBySlug, getArticles } from "@/lib/blogs";

const baseUrl = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.rodneyosodo.com"
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

  const canonical = `${baseUrl}/blogs/${post.slug}`;
  const ogImageUrl = `${baseUrl}/blogs/og/${post.slug}`;
  const description = post.metadata.description || extractExcerpt(post.content);

  return {
    title: post.metadata.title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      title: post.metadata.title,
      description,
      url: canonical,
      publishedTime: new Date(post.metadata.date).toISOString(),
      authors: [baseUrl],
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
      description,
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

  const canonical = `${baseUrl}/blogs/${post.slug}`;
  const description = post.metadata.description || extractExcerpt(post.content);
  const publishedIso = new Date(post.metadata.date).toISOString();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description,
    datePublished: publishedIso,
    image: `${baseUrl}/blogs/og/${post.slug}`,
    url: canonical,
    mainEntityOfPage: canonical,
    author: {
      "@type": "Person",
      name: "Rodney Osodo",
      url: baseUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Writing",
        item: `${baseUrl}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.metadata.title,
        item: canonical,
      },
    ],
  };

  // Previous/next posts for internal linking (chronological order).
  const chronological = (await getArticles()).sort(
    (a, b) =>
      new Date(a.metadata.date).getTime() - new Date(b.metadata.date).getTime(),
  );
  const index = chronological.findIndex((p) => p.slug === post.slug);
  const olderPost = index > 0 ? chronological[index - 1] : null;
  const newerPost =
    index >= 0 && index < chronological.length - 1
      ? chronological[index + 1]
      : null;

  return (
    <div className="relative overflow-hidden">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is statically generated and trusted
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is statically generated and trusted
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto max-w-6xl px-6 py-12 md:py-16">
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

          <nav
            aria-label="More writing"
            className="mt-14 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2"
          >
            {olderPost ? (
              <Link
                href={`/blogs/${olderPost.slug}`}
                className="group flex flex-col gap-1"
              >
                <span className="eyebrow">← Older</span>
                <span className="font-medium group-hover:text-link">
                  {olderPost.metadata.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {newerPost ? (
              <Link
                href={`/blogs/${newerPost.slug}`}
                className="group flex flex-col gap-1 sm:items-end sm:text-right"
              >
                <span className="eyebrow">Newer →</span>
                <span className="font-medium group-hover:text-link">
                  {newerPost.metadata.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>

          <Form />
        </div>
      </div>
    </div>
  );
}
