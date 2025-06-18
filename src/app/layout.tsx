import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import type React from "react";
import { PostHogProvider } from "@/app/providers";
import Footer from "@/components/footer";
import Navbar from "@/components/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";

const robotoMono = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rodneyosodo.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Rodney Osodo",
  description:
    "This is Rodney Osodo's website. I am a software and mechatronics engineer.",
  authors: [
    {
      name: "Rodney Osodo",
      url: baseUrl,
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
    url: baseUrl,
    siteName: "Rodney Osodo",
    images: [
      {
        url: `${baseUrl}/opengraph-image.png`,
        secureUrl: `${baseUrl}/opengraph-image.png`,
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
        url: `${baseUrl}/opengraph-image.png`,
        secureUrl: `${baseUrl}/opengraph-image.png`,
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
