import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Form from "@/components/form";
import { Github, LinkedIn } from "@/components/ui/icons";
import { getArticles } from "@/lib/blogs";

const focus = [
  {
    n: "01",
    title: "Distributed systems & messaging",
    body: "Multi-tenant IoT and commerce platforms in Go and Rust: message brokers, event streaming with Kafka and RabbitMQ, GraphQL APIs, and observability you can actually debug. Core contributor to SuperMQ / Magistrala; author of Serengeti, a plugin-extensible MQTT broker in Rust.",
  },
  {
    n: "02",
    title: "Full-stack & interfaces",
    body: "I don't stop at the API. I led the Magistrala UI's move from Go templates to Next.js, and build the React and TypeScript front-ends that sit on the systems I ship.",
  },
  {
    n: "03",
    title: "Edge & WebAssembly",
    body: "Propeller, a WebAssembly orchestrator that runs workloads close to where data is made, not in a far-off region.",
  },
  {
    n: "04",
    title: "From metal to mechatronics",
    body: "Five years of mechatronics engineering, a homelab that earns its rent, robots that move on their own, and the occasional detour into quantum machine learning.",
  },
];

const projects = [
  {
    name: "SuperMQ / Magistrala",
    role: "Core contributor",
    tech: "Go · MQTT · gRPC",
    body: "Production IoT messaging and device-management platform. Multi-protocol, multi-tenant, open source.",
    href: "https://github.com/absmach/supermq",
  },
  {
    name: "Serengeti",
    role: "Creator",
    tech: "Rust · MQTT",
    body: "A high-performance, plugin-extensible MQTT broker built in Rust.",
    href: "https://github.com/rodneyosodo/serengeti",
  },
  {
    name: "Propeller",
    role: "Creator",
    tech: "Rust · Go · WebAssembly",
    body: "A WebAssembly orchestrator and rules engine for running compute at the edge.",
    href: "https://github.com/rodneyosodo/propeller",
  },
  {
    name: "Belong",
    role: "Creator",
    tech: "TypeScript · React · Postgres",
    body: "A self-hosted family-tree app: a drag-and-drop tree editor with GEDCOM import/export and collaboration.",
    href: "https://github.com/rodneyosodo/belong",
  },
];

export default async function Home() {
  const posts = (await getArticles())
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime(),
    )
    .slice(0, 4);

  return (
    <div className="container mx-auto max-w-6xl px-6">
      <section className="grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-[1.5fr_1fr] md:py-24">
        <div className="animate-rise">
          <p className="eyebrow mb-5">
            Backend & Distributed Systems Engineer · Nairobi, Kenya
          </p>
          <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.05]">
            I build distributed systems, IoT platforms, and the occasional
            robot.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Hey, I'm Rodney. I studied mechatronics for five years and now I
            write Go and Rust for a living: scalable backends, message brokers,
            and the quiet plumbing that keeps data moving. I also organise{" "}
            <a
              className="text-link underline underline-offset-4 hover:text-foreground"
              href="https://www.meetup.com/python-nairobi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Python-Nairobi
            </a>{" "}
            and{" "}
            <a
              className="text-link underline underline-offset-4 hover:text-foreground"
              href="https://www.meetup.com/roboke/"
              target="_blank"
              rel="noopener noreferrer"
            >
              RoboKE
            </a>
            , and write about the systems I take apart.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              See my work
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Read the writing
            </Link>
            <div className="ml-1 flex items-center gap-1">
              <a
                aria-label="GitHub"
                href="https://github.com/rodneyosodo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Github className="size-[1.1rem]" />
              </a>
              <a
                aria-label="LinkedIn"
                href="https://www.linkedin.com/in/rodneyosodo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <LinkedIn className="size-[1.1rem]" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="relative mx-auto w-full max-w-76 animate-rise md:mx-0"
          style={{ animationDelay: "120ms" }}
        >
          <div className="relative aspect-square">
            <Image
              src="/android-chrome-512x512.png"
              alt="Rodney Osodo, smiling in a suit and sunglasses with a thumbs up"
              width={512}
              height={512}
              priority={true}
              unoptimized={true}
              className="absolute inset-0 size-full object-contain object-bottom drop-shadow-sm"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-14">
        <h2 className="eyebrow mb-10">What I work on</h2>
        <div className="divide-y divide-border">
          {focus.map((item) => (
            <div
              key={item.n}
              className="grid grid-cols-1 gap-2 py-7 md:grid-cols-[auto_1fr] md:gap-10"
            >
              <span className="font-mono text-sm text-primary">{item.n}</span>
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-14">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="eyebrow">Selected projects</h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-link hover:text-foreground"
          >
            All projects
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-1 gap-2 py-7 transition-colors md:grid-cols-[1fr_2fr] md:gap-10"
            >
              <div>
                <h3 className="flex items-center gap-1.5 text-xl font-semibold group-hover:text-link">
                  {p.name}
                  <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="eyebrow mt-2">
                  {p.role} · {p.tech}
                </p>
              </div>
              <p className="max-w-xl self-center leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-14">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="eyebrow">Recent writing</h2>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1 text-sm text-link hover:text-foreground"
          >
            All writing
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group flex items-baseline justify-between gap-6 py-5"
            >
              <span className="font-medium group-hover:text-link">
                {post.metadata.title}
              </span>
              <span className="eyebrow shrink-0">
                {new Date(post.metadata.date).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-16">
        <p className="eyebrow mb-4">Get in touch</p>
        <h2 className="max-w-2xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight">
          Let's build something, swap notes, or just keep in touch.
        </h2>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="https://www.linkedin.com/in/rodneyosodo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reach me on LinkedIn
            <ArrowUpRight className="size-4" />
          </a>
          <a
            href="https://github.com/rodneyosodo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <Github className="size-4" />
            See the code
          </a>
        </div>

        <div className="mt-10 max-w-md">
          <Form
            align="left"
            label="Prefer email?"
            buttonLabel="Get in touch"
            source="contact"
            subject="New contact from rodneyosodo.com"
          />
        </div>
      </section>
    </div>
  );
}
