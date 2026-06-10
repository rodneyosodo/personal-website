"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function MdxImage({
  className = "",
  src,
  alt,
  ...props
}: React.ComponentProps<typeof Image>) {
  const [aspectRatio, setAspectRatio] = useState("16 / 9");
  const [zoomed, setZoomed] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const srcStr = typeof src === "string" ? src : "";

  useEffect(() => {
    if (!srcStr) return;
    const img = new globalThis.Image();
    img.onload = () => {
      setAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
    };
    img.src = srcStr;
  }, [srcStr]);

  const open = useCallback(() => setZoomed(true), []);
  const close = useCallback(() => setZoomed(false), []);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomed, close]);

  return (
    <>
      <span
        ref={spanRef}
        className={cn("relative block w-full my-6 cursor-zoom-in", className)}
        style={{ aspectRatio }}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") open();
        }}
        role="button"
        tabIndex={0}
      >
        <Image
          fill
          src={srcStr}
          alt={alt ?? ""}
          sizes="(max-width: 768px) 100vw, 768px"
          className="rounded-lg object-contain"
          {...props}
        />
      </span>

      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-lg cursor-zoom-out animate-in fade-in duration-200"
          onClick={close}
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
          role="dialog"
          aria-label="Zoomed image"
          tabIndex={-1}
        >
          <div className="relative h-full w-full p-4 md:p-8">
            <Image
              fill
              src={srcStr}
              alt={alt ?? ""}
              sizes="100vw"
              className="object-contain"
              quality={100}
              {...props}
            />
          </div>
        </div>
      )}
    </>
  );
}
