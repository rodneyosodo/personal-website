import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work — Rodney Osodo",
  description:
    "Rodney Osodo's engineering work, community leadership, and education.",
};

type Role = {
  org: string;
  title: string;
  period: string; // "" hides the date; fill in "2023 — Present" etc.
  location: string;
  points: string[];
  href?: string;
};

const engineering: Role[] = [
  {
    org: "Abstract Machines",
    title: "Open-source contributor",
    period: "",
    location: "Remote",
    href: "https://github.com/absmach",
    points: [
      "Core contributor to SuperMQ / Magistrala, an open-source IoT messaging and device-management platform written in Go.",
      "Work spans the messaging core, users and authentication, and protocol adapters (MQTT, CoAP, HTTP, gRPC).",
      "Pioneered the Magistrala UI's move from server-rendered Go templates to a modern Next.js application (React, TypeScript, Tailwind), and continue to maintain it.",
    ],
  },
  {
    org: "B2B Commerce Platform",
    title: "Software Engineer, Backend",
    period: "",
    location: "Nairobi · Remote",
    points: [
      "Lead contributor to a Go sales platform powering nationwide field-sales operations: GraphQL API, PostgreSQL, Kafka and RabbitMQ event streaming, Redis, and full observability with OpenTelemetry, Sentry, and Prometheus.",
      "Build microservices across the e-commerce, fulfilment, and notification domains, including geospatial route planning and tracking for last-mile delivery.",
      "Built a high-performance analytics engine in Rust that queries Trino and Pinot with intelligent result caching.",
      "Ship multi-tenant, event-driven services deployed on Kubernetes, backing both internal tools and a customer-facing mobile app.",
      "Support the platform's web front-ends (Next.js, React, TypeScript) alongside the backend services.",
    ],
  },
];

const community: Role[] = [
  {
    org: "Python-Nairobi",
    title: "Organiser",
    period: "",
    location: "Nairobi",
    href: "https://www.meetup.com/python-nairobi/",
    points: [
      "Organise talks and meetups for one of Nairobi's largest Python communities.",
    ],
  },
  {
    org: "RoboKE",
    title: "Organiser",
    period: "",
    location: "Nairobi",
    href: "https://www.meetup.com/roboke/",
    points: [
      "Build a community around robotics and hardware hacking in Kenya.",
    ],
  },
];

const education: Role[] = [
  {
    org: "Jomo Kenyatta University of Agriculture and Technology",
    title: "BSc, Mechatronic Engineering",
    period: "",
    location: "Kenya",
    points: [
      "Five-year mechatronics programme spanning embedded systems, control, and robotics.",
      "Grand Prize, JKUAT Tech Expo 10. First Runners-Up, JKUAT Robotics Dojo.",
    ],
  },
];

function RoleList({ roles }: { roles: Role[] }) {
  return (
    <div className="divide-y divide-border border-t border-border">
      {roles.map((role) => (
        <div
          key={`${role.org}-${role.title}`}
          className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[1fr_2fr] md:gap-12"
        >
          <div>
            <h3 className="text-lg font-semibold">
              {role.href ? (
                <a
                  href={role.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 hover:text-link"
                >
                  {role.org}
                  <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ) : (
                role.org
              )}
            </h3>
            <p className="mt-1 text-muted-foreground">{role.title}</p>
            <p className="eyebrow mt-3">
              {[role.period, role.location].filter(Boolean).join(" · ")}
            </p>
          </div>
          <ul className="max-w-xl space-y-2.5 self-center">
            {role.points.map((point) => (
              <li
                key={point}
                className="relative pl-5 leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.65em] before:size-1.5 before:rounded-full before:bg-primary/60"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <div className="container mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="eyebrow mb-4">Work</p>
        <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-tight">
          Engineer, organiser, perpetual tinkerer
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          I build backend and distributed systems in Go and Rust, lead the
          Next.js front-ends that sit on top of them, organise developer
          communities in Nairobi, and came up through mechatronics. The short
          version is below; the proof is in the{" "}
          <Link
            href="/projects"
            className="text-link underline underline-offset-4 hover:text-foreground"
          >
            projects
          </Link>
          .
        </p>
      </header>

      <section className="mt-14">
        <h2 className="eyebrow mb-6">Engineering</h2>
        <RoleList roles={engineering} />
      </section>

      <section className="mt-16">
        <h2 className="eyebrow mb-6">Community & leadership</h2>
        <RoleList roles={community} />
      </section>

      <section className="mt-16">
        <h2 className="eyebrow mb-6">Education</h2>
        <RoleList roles={education} />
      </section>

      <section className="mt-16 border-t border-border pt-10">
        <p className="text-muted-foreground">
          For awards and recognition, see{" "}
          <Link
            href="/awards"
            className="text-link underline underline-offset-4 hover:text-foreground"
          >
            awards
          </Link>
          . For talks and papers, see{" "}
          <Link
            href="/talks"
            className="text-link underline underline-offset-4 hover:text-foreground"
          >
            talks
          </Link>{" "}
          and{" "}
          <Link
            href="/publications"
            className="text-link underline underline-offset-4 hover:text-foreground"
          >
            publications
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
