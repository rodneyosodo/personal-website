import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import type React from "react";
import Navbar from "@/components/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { PostHogProvider } from "@/app/providers";

const robotoMono = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rodney Osodo",
  description: "This is Rodney Osodo's website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "https://rodneyosodo.com";

  return (
    <html lang="en">
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Rodney Osodo Portfolio" />
        <meta
          property="og:description"
          content="This is Rodney Osodo's website. I am a software and mechatronics engineer."
        />
        <meta property="og:url" content={baseUrl} />

        <meta property="og:image" content={`${baseUrl}/opengraph-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Rodney Osodo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rodney Osodo Portfolio" />
        <meta
          name="twitter:description"
          content="This is Rodney Osodo's website. I am a software and mechatronics engineer."
        />
        <meta name="twitter:image" content={`${baseUrl}/opengraph-image.png`} />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
      </head>
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
