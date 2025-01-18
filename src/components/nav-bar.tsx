import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <section className="py-4">
      <div className="container mx-auto max-w-7xl px-8">
        <nav className="flex justify-between items-center">
          <div className="w-10" />

          <div className="flex items-center justify-center">
            <Link className={"text-muted-foreground px-3 py-2"} href="/">
              Home
            </Link>
            <Link className={"text-muted-foreground px-3 py-2"} href="/about">
              About
            </Link>
            <Link className={"text-muted-foreground px-3 py-2"} href="/blogs">
              Blogs
            </Link>
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </section>
  );
}
