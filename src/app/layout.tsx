import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/app/providers";
import Footer from "@/components/footer";
import Navbar from "@/components/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";
import type React from "react";

const robotoMono = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rodney Osodo",
  description:
    "This is Rodney Osodo's website. I am a software and mechatronics engineer.",
  authors: [
    {
      name: "Rodney Osodo",
      url: process.env.NEXT_PUBLIC_BASE_URL || "https://rodneyosodo.com",
    },
  ],
  keywords: ["Rodney Osodo", "Software Engineer", "Mechatronics Engineer"],
  creator: "Rodney Osodo",
  publisher: "Rodney Osodo",

  openGraph: {
    type: "website",
    title: "Rodney Osodo Portfolio",
    description:
      "This is Rodney Osodo's website. I am a software and mechatronics engineer.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://rodneyosodo.com",
    siteName: "Rodney Osodo",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://rodneyosodo.com"}/opengraph-image.png`,
        secureUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://rodneyosodo.com"}/opengraph-image.png`,
        alt: "Rodney Osodo's Portfolio",
        type: "image/png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rodney Osodo Portfolio",
    description:
      "This is Rodney Osodo's website. I am a software and mechatronics engineer.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://rodneyosodo.com"}/opengraph-image.png`,
        secureUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://rodneyosodo.com"}/opengraph-image.png`,
        alt: "Rodney Osodo's Portfolio",
        type: "image/png",
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
    <html lang="en">
      <body className={`${robotoMono.className}  antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <PostHogProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              {children}
              <Footer />
            </div>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
