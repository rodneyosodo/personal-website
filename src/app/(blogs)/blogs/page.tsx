import { getArticles } from "@/lib/blogs";
import Link from "next/link";

export default function Blogs() {
  const posts = getArticles();

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
    <div className="space-y-2 px-8">
      {sortedYears.map((year) =>
        groupedPosts[year].map((post, index) => (
          <div key={post.slug} className="flex gap-6 items-center">
            {index === 0 ? (
              <span className="text-muted-foreground min-w-[4rem]">{year}</span>
            ) : (
              <span className="min-w-[4rem]" />
            )}
            <Link
              href={`/blogs/${post.slug}`}
              className="flex-grow hover:underline truncate"
            >
              {post.metadata.title}
            </Link>
            <span className="text-muted-foreground whitespace-nowrap">
              {new Date(post.metadata.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        )),
      )}
    </div>
  );
}
