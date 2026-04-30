import type { ImageResponseOptions } from "@takumi-rs/image-response";
import type { ReactNode } from "react";

export interface OGImageProps {
  title: ReactNode;
  description?: ReactNode;
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
  const siteName = "Rodney Osodo";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        color: "white",
        backgroundColor: "rgb(10,10,10)",
        fontFamily: "RobotoMono",
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "4rem",
          ...(backgroundImageUrl
            ? {
                backgroundImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5))",
              }
            : {}),
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: "64px",
            lineHeight: 1.2,
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          {title}
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "24px",
            marginTop: "auto",
            color: "rgb(240,240,240)",
            textShadow: "0 1px 4px rgba(0,0,0,0.8)",
          }}
        >
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
            }}
          >
            {siteName}
          </span>
          {date ? (
            <span
              style={{
                fontSize: "28px",
                color: "rgba(240,240,240,0.5)",
              }}
            >
              {date}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
