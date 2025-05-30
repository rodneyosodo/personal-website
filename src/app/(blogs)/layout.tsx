import type React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative overflow-hidden py-8 lg:py-12">
      <div className="container mx-auto max-w-7xl px-1 md:px-8">
        <div className="max-w-3xl mx-auto">
          <article className="prose">{children}</article>
        </div>
      </div>
    </div>
  );
}
