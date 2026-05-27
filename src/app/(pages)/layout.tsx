import type React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto max-w-6xl px-6 py-12 md:py-16">
      <article>{children}</article>
    </div>
  );
}
