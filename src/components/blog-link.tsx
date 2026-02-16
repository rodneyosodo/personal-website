"use client";

import Link from "next/link";
import { usePostHog } from "posthog-js/react";

interface BlogLinkProps {
  slug: string;
  title: string;
  date: string;
}

export default function BlogLink({ slug, title, date }: BlogLinkProps) {
  const posthog = usePostHog();

  const handleClick = () => {
    posthog.capture("blog_post_clicked", {
      blog_slug: slug,
      blog_title: title,
      blog_date: date,
    });
  };

  return (
    <Link
      href={`/blogs/${slug}`}
      className="grow hover:underline break-words"
      onClick={handleClick}
    >
      {title}
    </Link>
  );
}
