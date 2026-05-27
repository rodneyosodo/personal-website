import Link from "next/link";
import { getArticles } from "@/lib/blogs";

export default async function Blogs() {
  const posts = await getArticles();

  const groupedPosts = posts
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime(),
    )
    .reduce((acc: { [key: string]: typeof posts }, post) => {
      const year = new Date(post.metadata.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {});

  const sortedYears = Object.keys(groupedPosts).sort(
    (a, b) => Number(b) - Number(a),
  );

  return (
    <div className="container mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="eyebrow mb-4">Writing</p>
        <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-tight">
          Notes from the workbench
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Essays on distributed systems, Go, and Rust, plus travel writing from
          across the continent. {posts.length} posts and counting.
        </p>
      </header>

      <div className="mt-14 space-y-12">
        {sortedYears.map((year) => (
          <section key={year}>
            <h2 className="eyebrow mb-3">{year}</h2>
            <div className="divide-y divide-border border-t border-border">
              {groupedPosts[year].map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-4"
                >
                  <span className="font-medium group-hover:text-link">
                    {post.metadata.title}
                  </span>
                  <span className="eyebrow shrink-0">
                    {new Date(post.metadata.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
