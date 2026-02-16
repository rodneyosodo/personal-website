"use client";

import { usePostHog } from "posthog-js/react";
import type { ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  linkName: string;
}

export default function ExternalLink({
  href,
  children,
  className,
  linkName,
}: ExternalLinkProps) {
  const posthog = usePostHog();

  const handleClick = () => {
    posthog.capture("external_link_clicked", {
      link_name: linkName,
      url: href,
      location: "home_page",
    });
  };

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
