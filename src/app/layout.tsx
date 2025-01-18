import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import type React from "react";
import Navbar from "@/components/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";

const robotoMono = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rodney Osodo",
  description: "This is Rodney Osodo's website",
};

export default function RootLayout({
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
          <div className="min-h-screen flex flex-col">
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
