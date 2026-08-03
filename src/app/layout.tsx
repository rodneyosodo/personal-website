import type { Metadata } from "next";
import { Bricolage_Grotesque, Roboto_Mono } from "next/font/google";
import "./globals.css";
import type React from "react";
import { PostHogProvider } from "@/app/providers";
import Footer from "@/components/footer";
import Navbar from "@/components/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const baseUrl = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.rodneyosodo.com"
).replace(/\/+$/, "");

const defaultDescription =
  "Rodney Osodo is an engineer in Nairobi building distributed systems in Go and Rust, organising developer communities, and writing about code and travel across Africa.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Rodney Osodo - Software Engineer in Nairobi",
    template: "%s | Rodney Osodo",
  },
  description: defaultDescription,
  authors: [
    {
      name: "Rodney Osodo",
      url: baseUrl,
    },
  ],
  keywords: [
    "Rodney Osodo",
    "Software Engineer",
    "Distributed Systems",
    "Go",
    "Rust",
    "IoT",
    "Writer",
    "Nairobi",
    "Kenya",
  ],
  creator: "Rodney Osodo",
  publisher: "Rodney Osodo",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${baseUrl}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    title: "Rodney Osodo - Software Engineer in Nairobi",
    description: defaultDescription,
    url: baseUrl,
    siteName: "Rodney Osodo",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/opengraph-image.jpeg`,
        secureUrl: `${baseUrl}/opengraph-image.jpeg`,
        alt: "Rodney Osodo",
        type: "image/jpeg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@b1ackd0t",
    creator: "@b1ackd0t",
    title: "Rodney Osodo - Software Engineer in Nairobi",
    description: defaultDescription,
    images: [
      {
        url: `${baseUrl}/opengraph-image.jpeg`,
        secureUrl: `${baseUrl}/opengraph-image.jpeg`,
        alt: "Rodney Osodo",
        type: "image/jpeg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${robotoMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <PostHogProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 flex flex-col">{children}</main>
              <Footer />
            </div>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
