"use client";

import { usePostHog } from "posthog-js/react";
import { useEffect, useRef } from "react";

interface BlogPostTrackerProps {
  slug: string;
  title: string;
  date: string;
}

export default function BlogPostTracker({
  slug,
  title,
  date,
}: BlogPostTrackerProps) {
  const posthog = usePostHog();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current && posthog) {
      posthog.capture("blog_post_read", {
        blog_slug: slug,
        blog_title: title,
        blog_date: date,
      });
      hasTracked.current = true;
    }
  }, [posthog, slug, title, date]);

  return null;
}
