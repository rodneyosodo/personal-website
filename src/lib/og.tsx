import type { ImageResponseOptions } from "@takumi-rs/image-response";
import type { ReactNode } from "react";

export interface OGImageProps {
  title: ReactNode;
  date?: string;
  avatarUrl?: string;
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

export function BlogOGImage({
  title,
  date,
  avatarUrl,
  backgroundImageUrl,
}: OGImageProps) {
  const author = "Rodney Osodo";

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
              "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4))",
          }}
        />
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            flexGrow: 1,
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
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {avatarUrl ? (
            // biome-ignore lint/performance/noImgElement: takumi renders to image, not DOM
            <img
              src="avatar"
              alt=""
              width={80}
              height={80}
              style={{
                borderRadius: 40,
                objectFit: "cover",
              }}
            />
          ) : null}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 32, fontWeight: 600 }}>{author}</span>
            {date ? (
              <span style={{ fontSize: 24, color: "#a1a1aa" }}>{date}</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
