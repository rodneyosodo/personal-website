import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Everything Rodney Osodo has built and contributed to: open-source IoT and messaging platforms in Go, Rust systems and WebAssembly, personal products, embedded hardware, and quantum machine learning.",
  alternates: {
    canonical: "/projects",
  },
};

type Project = {
  name: string;
  role?: string;
  tech: string;
  year?: string;
  body: ReactNode;
  href?: string;
};

const sections: { label: string; projects: Project[] }[] = [
  {
    label: "Open-source platforms",
    projects: [
      {
        name: "Magistrala",
        role: "Core contributor",
        tech: "Go · Next.js · MQTT · CoAP · HTTP · gRPC · Zephyr",
        year: "Ongoing",
        body: (
          <>
            Production-grade IoT messaging and device-management platform by
            Abstract Machines. Multi-tenant, multi-protocol, fully open source.
            I work across the messaging core, users and auth, and the protocol
            adapters, led the Magistrala UI's move from server-rendered Go
            templates to a modern Next.js app, and built the{" "}
            <a
              href="https://github.com/absmach/agent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link underline underline-offset-4 hover:text-foreground"
            >
              Linux IoT Agent
              <span className="sr-only"> (opens in a new tab)</span>
            </a>{" "}
            and Zephyr IoT Agent that put Magistrala on edge devices.
          </>
        ),
        href: "https://github.com/absmach/magistrala",
      },
      {
        name: "Propeller",
        role: "Core contributor",
        tech: "Rust · Go · WebAssembly",
        year: "Ongoing",
        body: (
          <>
            A WebAssembly orchestrator and rules engine for running compute at
            the edge, close to where data is produced. I contribute across the
            scheduler and runtime, plus the{" "}
            <a
              href="https://github.com/absmach/propeller-k8s-operator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link underline underline-offset-4 hover:text-foreground"
            >
              Kubernetes operator
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            , UI, and docs.
          </>
        ),
        href: "https://github.com/absmach/propeller",
      },
      {
        name: "FluxMQ",
        role: "Contributor",
        tech: "Go · MQTT · Kafka",
        year: "Ongoing",
        body: "High-performance, scalable message broker for modern event-driven applications.",
        href: "https://github.com/absmach/fluxmq",
      },
      {
        name: "Cocos AI",
        role: "Contributor",
        tech: "Go · Confidential Computing",
        year: "2024 – 2025",
        body: "Confidential computing system for AI by Ultraviolet: TEE-backed training and inference. I also worked on Prism, its SaaS layer for confidential collaborative AI.",
        href: "https://github.com/ultravioletrs/cocos",
      },
    ],
  },
  {
    label: "Products I've built",
    projects: [
      {
        name: "Serengeti",
        role: "Creator",
        tech: "Rust · MQTT 3.1.1",
        year: "2026",
        body: "A high-performance, plugin-extensible MQTT broker written in Rust. Built for throughput, with an extension model for custom messaging behaviour.",
        href: "https://github.com/rodneyosodo/serengeti",
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
        name: "NgombeOS",
        role: "Creator",
        tech: "TypeScript · TanStack Start · Elysia · PostgreSQL",
        year: "2026",
        body: "Dairy farm management for Kenyan farms: herd registry, milk production, feed, health, breeding, finance, and Paystack billing — replacing paper record keeping.",
        href: "https://www.ngombeos.com",
      },
      {
        name: "Homelab",
        role: "Maintainer",
        tech: "Terraform · HCL · Docker · self-hosted",
        year: "Ongoing",
        body: "Infrastructure-as-code for a self-hosted home datacenter: the staging ground where personal experiments get hardened before they reach anything that matters.",
        href: "https://github.com/rodneyosodo/homelab",
      },
    ],
  },
  {
    label: "Hardware & mechatronics",
    projects: [
      {
        name: "Quarc",
        role: "Contributor",
        tech: "FPGA · Rust · ML-KEM · ML-DSA",
        year: "Ongoing",
        body: "A post-quantum secure element for IoT: runs ML-KEM-768 and ML-DSA-65 (NIST FIPS 203/204) in FPGA fabric, keeps key material out of firmware reach, and verifies every boot image — built entirely with open tooling.",
        href: "https://github.com/absmach/quarc",
      },
      {
        name: "A0 Gateway",
        role: "Contributor",
        tech: "ESP32-C6 · RISC-V · Wi-Fi 6 · M-Bus",
        year: "Ongoing",
        body: "A modular IoT gateway platform around the ESP32-C6: Wi-Fi 6, Bluetooth 5, 802.15.4, NB-IoT/LTE-M and optional Ethernet, optimised for low-power, battery-powered deployments.",
        href: "https://github.com/absmach/a0",
      },
      {
        name: "Smart farm",
        role: "Creator",
        tech: "Python · STM32 · IoT",
        year: "2019",
        body: "Automated smart-farm demo on the Africa's Talking Eris V1 dev kit (STM32F103), built for their hackathon.",
        href: "https://github.com/rodneyosodo/smart-farm-africastalking-hackathon",
      },
    ],
  },
  {
    label: "Quantum & machine learning",
    projects: [
      {
        name: "Variational Quantum Classifier",
        role: "Author",
        tech: "Python · Qiskit · Jupyter",
        year: "2021",
        body: "Quantum machine learning: variational models and feature maps applied to a heart-attack dataset. Grew out of my Quantum Open Source Foundation mentorship project.",
        href: "https://github.com/rodneyosodo/variational-quantum-classifier-on-heartattack",
      },
      {
        name: "QOSF Mentorship Program",
        role: "Mentee",
        tech: "Python · Qiskit",
        year: "2020",
        body: "My work through the Quantum Open Source Foundation mentorship: variational quantum classifiers and quantum feature maps.",
        href: "https://github.com/rodneyosodo/qc-mentorship-program",
      },
    ],
  },
];

function ProjectRow({ p }: { p: Project }) {
  const arrow = p.href && (
    <>
      <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );

  const meta = (
    <div>
      <h2 className="flex items-center gap-1.5 text-xl font-semibold group-hover:text-link">
        {p.name}
        {arrow}
      </h2>
      {p.role && <p className="eyebrow mt-3">{p.role}</p>}
      <p className="mt-1.5 font-mono text-xs text-muted-foreground">{p.tech}</p>
      {p.year && (
        <p className="mt-1.5 font-mono text-xs text-primary">{p.year}</p>
      )}
    </div>
  );

  const body = (
    <p className="max-w-xl leading-relaxed text-muted-foreground">{p.body}</p>
  );

  if (!p.href) {
    return (
      <div className="group grid grid-cols-1 gap-3 py-8 md:grid-cols-[1fr_2fr] md:gap-12">
        {meta}
        {body}
      </div>
    );
  }

  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid grid-cols-1 gap-3 py-8 md:grid-cols-[1fr_2fr] md:gap-12"
    >
      {meta}
      {body}
    </a>
  );
}

export default function ProjectsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="eyebrow mb-4">Projects</p>
        <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-tight">
          Things I've built and broken
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Go and Rust on the backend, React on the front, hardware on the bench,
          qubits in the notebook. The ones below are public; a few more live
          behind company walls.
        </p>
      </header>

      <div className="mt-14 space-y-16">
        {sections.map((section) => (
          <section key={section.label}>
            <h2 className="eyebrow mb-2">{section.label}</h2>
            <div className="divide-y divide-border border-t border-border">
              {section.projects.map((p) => (
                <ProjectRow key={p.name} p={p} />
              ))}
            </div>
          </section>
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
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
    </div>
  );
}
