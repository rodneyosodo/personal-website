import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Rodney Osodo",
  description:
    "Open-source and personal projects: distributed systems, IoT platforms, WebAssembly, and quantum machine learning.",
};

type Project = {
  name: string;
  role: string;
  tech: string;
  year: string;
  body: string;
  href: string;
};

const projects: Project[] = [
  {
    name: "SuperMQ / Magistrala",
    role: "Core contributor",
    tech: "Go · MQTT · CoAP · gRPC",
    year: "Ongoing",
    body: "Production-grade IoT messaging and device-management platform by Abstract Machines. Multi-tenant, multi-protocol, fully open source. I work across the messaging core, users and auth, and protocol adapters (MQTT, CoAP, HTTP, gRPC).",
    href: "https://github.com/absmach/supermq",
  },
  {
    name: "Magistrala UI",
    role: "Lead / migration",
    tech: "Next.js · React · TypeScript · Tailwind",
    year: "Ongoing",
    body: "The web console for Magistrala. I pioneered its move from server-rendered Go templates to a modern Next.js app, and maintain the component system, data layer, and dashboards on top of the platform APIs.",
    href: "https://github.com/absmach/magistrala-ui",
  },
  {
    name: "Serengeti",
    role: "Creator",
    tech: "Rust · MQTT 3.1.1",
    year: "2026",
    body: "A high-performance, plugin-extensible MQTT broker written in Rust. Built for throughput, with an extension model for custom messaging behaviour.",
    href: "https://github.com/rodneyosodo/serengeti",
  },
  {
    name: "Propeller",
    role: "Core contributor",
    tech: "Rust · Go · WebAssembly",
    year: "2024",
    body: "A WebAssembly orchestrator and rules engine for running compute at the edge, close to where data is produced. Schedules and runs sandboxed Wasm workloads across distributed nodes.",
    href: "https://github.com/rodneyosodo/propeller",
  },
  {
    name: "Belong",
    role: "Creator",
    tech: "TypeScript · React · Vite · PostgreSQL",
    year: "2026",
    body: "A self-hosted family-tree application: a drag-and-drop visual tree editor with auto-layout, GEDCOM 5.5.1 import/export, multiple relationship types, PNG/PDF export, and collaboration with owner/editor/viewer roles.",
    href: "https://github.com/rodneyosodo/belong",
  },
  {
    name: "Homelab",
    role: "Maintainer",
    tech: "Terraform · HCL · Docker · self-hosted",
    year: "Ongoing",
    body: "Infrastructure-as-code for a self-hosted home datacenter: the staging ground where personal experiments get hardened before they reach anything that matters.",
    href: "https://github.com/rodneyosodo/homelab",
  },
  {
    name: "Variational Quantum Classifier",
    role: "Author",
    tech: "Python · Qiskit · Jupyter",
    year: "2021",
    body: "Quantum machine learning: variational models and feature maps applied to a heart-attack dataset. Grew out of my Quantum Open Source Foundation project.",
    href: "https://github.com/rodneyosodo/variational-quantum-classifier-on-heartattack",
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="eyebrow mb-4">Projects</p>
        <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-tight">
          Things I've built and broken
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Go and Rust on the backend, React on the front, mostly distributed,
          occasionally quantum. The ones below are public; a few more live
          behind company walls.
        </p>
      </header>

      <div className="mt-14 divide-y divide-border border-t border-border">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-1 gap-3 py-8 md:grid-cols-[1fr_2fr] md:gap-12"
          >
            <div>
              <h2 className="flex items-center gap-1.5 text-xl font-semibold group-hover:text-link">
                {p.name}
                <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </h2>
              <p className="eyebrow mt-3">{p.role}</p>
              <p className="mt-1.5 font-mono text-xs text-muted-foreground">
                {p.tech}
              </p>
              <p className="mt-1.5 font-mono text-xs text-primary">{p.year}</p>
            </div>
            <p className="max-w-xl leading-relaxed text-muted-foreground">
              {p.body}
            </p>
          </a>
        ))}
      </div>

      <p className="mt-12 text-sm text-muted-foreground">
        More on{" "}
        <a
          href="https://github.com/rodneyosodo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link underline underline-offset-4 hover:text-foreground"
        >
          github.com/rodneyosodo
        </a>
        .
      </p>
    </div>
  );
}
