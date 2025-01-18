import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  return (
    <section className="py-4">
      <div className="container mx-auto max-w-7xl px-8">
        <nav className="flex justify-between items-center">
          <div className="w-10" />

          <div className="flex items-center justify-center">
            <a className={"text-muted-foreground px-3 py-2"} href="/">
              Home
            </a>
            <a className={"text-muted-foreground px-3 py-2"} href="/">
              About
            </a>
            <a className={"text-muted-foreground px-3 py-2"} href="/">
              Blog
            </a>
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </section>
  );
}
