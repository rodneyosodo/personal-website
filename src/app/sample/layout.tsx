import type React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="max-w-2xl mx-auto">
          <article className="prose">{children}</article>
        </div>
      </div>
    </div>
  );
}
