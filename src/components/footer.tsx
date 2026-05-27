import Link from "next/link";
import {
  Github,
  Instagram,
  LinkedIn,
  TikTok,
  XformerlyTwitter,
  YouTube,
} from "@/components/ui/icons";

const sections = [
  { href: "/experience", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Writing" },
  { href: "/talks", label: "Talks" },
  { href: "/awards", label: "Awards" },
  { href: "/publications", label: "Publications" },
];

const socials = [
  {
    href: "https://www.linkedin.com/in/rodneyosodo",
    label: "LinkedIn",
    Icon: LinkedIn,
  },
  { href: "https://github.com/rodneyosodo", label: "GitHub", Icon: Github },
  { href: "https://x.com/b1ackd0t", label: "X", Icon: XformerlyTwitter },
  {
    href: "https://www.instagram.com/rodneyosodo/",
    label: "Instagram",
    Icon: Instagram,
  },
  { href: "https://www.tiktok.com/@b1ackd0t", label: "TikTok", Icon: TikTok },
  {
    href: "https://www.youtube.com/@rodneyosodo",
    label: "YouTube",
    Icon: YouTube,
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="container mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-8">
          <p className="order-3 font-mono text-xs text-muted-foreground md:order-1 md:flex-1">
            © {new Date().getFullYear()} Rodney Osodo
          </p>

          <nav className="order-1 flex flex-wrap justify-center gap-x-8 gap-y-3 md:order-2">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </Link>
            ))}
          </nav>

          <div className="order-2 flex flex-wrap justify-end gap-1 md:order-3 md:flex-1">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Icon className="size-[1.05rem]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
