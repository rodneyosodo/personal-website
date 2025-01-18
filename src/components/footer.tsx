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

export default function Footer() {
  return (
    <footer className="bg-background py-12 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            <a href="/" className="text-muted-foreground">
              Home
            </a>
            <span className="hidden md:block text-muted-foreground mx-2">
              |
            </span>
            <a href="/" className="text-muted-foreground">
              About
            </a>
            <span className="hidden md:block text-muted-foreground mx-2">
              |
            </span>
            <a href="/" className="text-muted-foreground">
              Blog
            </a>
            <span className="hidden md:block text-muted-foreground mx-2">
              |
            </span>
            <a href="/" className="text-muted-foreground">
              Publications
            </a>
            <span className="hidden md:block text-muted-foreground mx-2">
              |
            </span>
            <a href="/" className="text-muted-foreground">
              Talks
            </a>
            <span className="hidden md:block text-muted-foreground mx-2">
              |
            </span>
            <a href="/" className="text-muted-foreground">
              Awards
            </a>
          </nav>
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
          <div className="mb-8 w-full max-w-md">
            <form className="flex space-x-2">
              <div className="flex-grow">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  className="rounded-full"
                />
              </div>
              <Button type="submit" className="rounded-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
