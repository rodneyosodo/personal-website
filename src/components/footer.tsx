"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Github,
  Instagram,
  LinkedIn,
  TikTok,
  XformerlyTwitter,
  YouTube,
} from "@/components/ui/icons";

function Navigation() {
  return (
    <nav className="mb-8 flex flex-wrap justify-center gap-6">
      <Link href="/" className="text-muted-foreground">
        Home
      </Link>
      <span className="hidden md:block text-muted-foreground mx-2">|</span>
      <Link href="/blogs" className="text-muted-foreground">
        Blogs
      </Link>
      <span className="hidden md:block text-muted-foreground mx-2">|</span>
      <Link href="/publications" className="text-muted-foreground">
        Publications
      </Link>
      <span className="hidden md:block text-muted-foreground mx-2">|</span>
      <Link href="/talks" className="text-muted-foreground">
        Talks
      </Link>
      <span className="hidden md:block text-muted-foreground mx-2">|</span>
      <Link href="/awards" className="text-muted-foreground">
        Awards
      </Link>
    </nav>
  );
}

function SocialLinks() {
  return (
    <div className="mb-8 flex space-x-2">
      <a
        href="https://www.linkedin.com/in/rodneyosodo"
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="link" size="icon">
          <LinkedIn className="h-4 w-4" />
          <span className="sr-only">LinkedIn</span>
        </Button>
      </a>
      <a href="https://github.com/rodneyosodo" target="_blank" rel="noreferrer">
        <Button variant="link" size="icon">
          <Github className="h-4 w-4" />
          <span className="sr-only">Github</span>
        </Button>
      </a>
      <a href="https://x.com/b1ackd0t" target="_blank" rel="noreferrer">
        <Button variant="link" size="icon">
          <XformerlyTwitter className="h-4 w-4" />
          <span className="sr-only">Twitter</span>
        </Button>
      </a>
      <a
        href="https://www.instagram.com/rodneyosodo/"
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="link" size="icon">
          <Instagram className="h-4 w-4" />
          <span className="sr-only">Instagram</span>
        </Button>
      </a>
      <a
        href="https://www.tiktok.com/@b1ackd0t"
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="link" size="icon">
          <TikTok className="h-4 w-4" />
          <span className="sr-only">TikTok</span>
        </Button>
      </a>
      <a
        href="https://www.youtube.com/@rodneyosodo"
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="link" size="icon">
          <YouTube className="h-4 w-4" />
          <span className="sr-only">YouTube</span>
        </Button>
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-background py-12 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center border-t pt-4">
          <Navigation />
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
