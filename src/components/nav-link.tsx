"use client";

import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import type { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function NavLink({ href, children, className }: NavLinkProps) {
  const posthog = usePostHog();

  const handleClick = () => {
    posthog.capture("nav_link_clicked", {
      destination: href,
      link_text: typeof children === "string" ? children : href,
      location: "navbar",
    });
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
