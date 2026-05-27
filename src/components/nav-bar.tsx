"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/experience", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Writing" },
  { href: "/talks", label: "Talks" },
  { href: "/awards", label: "Awards" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-6">
        <nav className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="group flex items-baseline gap-2"
            onClick={() => setOpen(false)}
          >
            <span className="text-lg font-extrabold tracking-tight">
              Rodney Osodo
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground",
                  isActive(pathname, link.href)
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
                {isActive(pathname, link.href) && (
                  <span className="mx-auto mt-0.5 block h-px w-4 bg-primary" />
                )}
              </Link>
            ))}
            <span className="mx-2 h-5 w-px bg-border" />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <div className="container mx-auto max-w-6xl px-6 py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block border-b border-border/60 py-3 text-base last:border-0",
                  isActive(pathname, link.href)
                    ? "text-primary"
                    : "text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
