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
  process.env.NEXT_PUBLIC_BASE_URL || "https://rodneyosodo.com"
).replace(/\/+$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Rodney Osodo — Engineer & Writer",
  description:
    "The personal website of Rodney Osodo, an engineer and writer in Nairobi. I build distributed systems in Go and Rust, organise developer communities, and write about everything I take apart, from code to road trips across Africa.",
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

  openGraph: {
    type: "website",
    title: "Rodney Osodo — Engineer & Writer",
    description:
      "Engineer and writer in Nairobi. I build distributed systems in Go and Rust, organise communities, and write about everything I take apart, from code to road trips across Africa.",
    url: baseUrl,
    siteName: "Rodney Osodo",
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
    title: "Rodney Osodo — Engineer & Writer",
    description:
      "Engineer and writer in Nairobi. I build distributed systems in Go and Rust, organise communities, and write about everything I take apart, from code to road trips across Africa.",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
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
