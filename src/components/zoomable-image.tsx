"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function ZoomableImage({
  width,
  height,
  className = "",
  alt = "",
  ...props
}: ImageProps) {
  const [zoomed, setZoomed] = useState(false);

  const close = useCallback(() => setZoomed(false), []);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoomed, close]);

  const image =
    width && height ? (
      <Image
        width={width}
        height={height}
        alt={alt}
        className={`my-6 rounded-lg cursor-zoom-in ${className}`.trim()}
        onClick={() => setZoomed(true)}
        {...props}
      />
    ) : (
      <span
        className={`relative block w-full aspect-video my-6 ${className}`.trim()}
      >
        <Image
          fill
          alt={alt}
          className="rounded-lg object-cover cursor-zoom-in"
          onClick={() => setZoomed(true)}
          {...props}
        />
      </span>
    );

  return (
    <>
      {image}
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm cursor-zoom-out p-4"
          onClick={close}
          onKeyDown={(e) => e.key === "Enter" && close()}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <Image
              {...props}
              alt={alt}
              width={width ?? 1600}
              height={height ?? 1200}
              className="object-contain max-h-[90vh] rounded-lg w-auto h-auto"
              onClick={(e) => e.stopPropagation()}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
