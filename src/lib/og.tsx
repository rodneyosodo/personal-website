import type { ImageResponseOptions } from "@takumi-rs/image-response";
import type { ReactNode } from "react";

export interface OGImageProps {
  title: ReactNode;
  date?: string;
  backgroundImageUrl?: string;
}

const font = Bun.file("src/lib/og/RobotoMono-Variable.ttf")
  .arrayBuffer()
  .then((data) => ({
    name: "RobotoMono",
    data: new Uint8Array(data),
    weight: 400 as const,
  }));

export async function getOGImageOptions(): Promise<ImageResponseOptions> {
  return {
    width: 1200,
    height: 630,
    format: "webp",
    fonts: [await font],
  };
}

export function BlogOGImage({ title, date, backgroundImageUrl }: OGImageProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#111",
        color: "white",
        fontFamily: "RobotoMono",
        padding: "60px",
        justifyContent: "space-between",
        ...(!backgroundImageUrl
          ? {
              backgroundImage: "linear-gradient(135deg, #1a1a1a 0%, #000 100%)",
            }
          : {}),
      }}
    >
      {backgroundImageUrl ? (
        // biome-ignore lint/performance/noImgElement: takumi renders to image, not DOM
        <img
          src={backgroundImageUrl}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : null}
      {backgroundImageUrl ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
          }}
        />
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            textShadow: "0 4px 12px rgba(0,0,0,0.5)",
          }}
        >
          {title}
        </h1>
        {date ? (
          <span style={{ fontSize: 24, color: "#a1a1aa" }}>{date}</span>
        ) : null}
      </div>
    </div>
  );
}
