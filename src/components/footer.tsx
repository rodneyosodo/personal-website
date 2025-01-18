"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Github,
  Instagram,
  LinkedIn,
  TikTok,
  XformerlyTwitter,
  YouTube,
} from "@/components/ui/icons";
import { useForm } from "@formspree/react";
import Link from "next/link";

function Navigation() {
  return (
    <nav className="mb-8 flex flex-wrap justify-center gap-6">
      <Link href="/" className="text-muted-foreground">
        Home
      </Link>
      <span className="hidden md:block text-muted-foreground mx-2">|</span>
      <Link href="/about" className="text-muted-foreground">
        About
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
      <Button variant="link" size="icon">
        <LinkedIn className="h-4 w-4" />
        <span className="sr-only">LinkedIn</span>
      </Button>
      <Button variant="link" size="icon">
        <Github className="h-4 w-4" />
        <span className="sr-only">Github</span>
      </Button>
      <Button variant="link" size="icon">
        <XformerlyTwitter className="h-4 w-4" />
        <span className="sr-only">Twitter</span>
      </Button>
      <Button variant="link" size="icon">
        <Instagram className="h-4 w-4" />
        <span className="sr-only">Instagram</span>
      </Button>
      <Button variant="link" size="icon">
        <TikTok className="h-4 w-4" />
        <span className="sr-only">TikTok</span>
      </Button>
      <Button variant="link" size="icon">
        <YouTube className="h-4 w-4" />
        <span className="sr-only">YouTube</span>
      </Button>
    </div>
  );
}

export default function Footer() {
  const [state, handleSubmit] = useForm("mlddygzj");

  return (
    <footer className="bg-background py-12 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <Navigation />
          <SocialLinks />
          <div className="mb-8 w-full max-w-md">
            {state.succeeded ? (
              <p className="text-center">Thank you for subscribing!</p>
            ) : (
              <form className="flex space-x-2" onSubmit={handleSubmit}>
                <div className="flex-grow">
                  <Label htmlFor="email" className="sr-only">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    className="rounded-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="rounded-full"
                  disabled={state.submitting}
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
