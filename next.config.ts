import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    qualities: [75, 100],
    remotePatterns: [{ protocol: "https", hostname: "r2.rodneyosodo.com" }],
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    taint: true,
    useTypeScriptCli: true,
  },
  transpilePackages: ["next-mdx-remote"],
  serverExternalPackages: [
    "@takumi-rs/core",
    "takumi-js",
    "@takumi-rs/image-response",
  ],
  async headers() {
    return [
      {
        source: "/ingest/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async rewrites() {
    const postHogBaseURL = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (!postHogBaseURL) {
      return [];
    }

    const assetPath =
      postHogBaseURL === "https://us.i.posthog.com"
        ? "https://us-assets.i.posthog.com"
        : postHogBaseURL === "https://eu.i.posthog.com"
          ? "https://eu-assets.i.posthog.com"
          : process.env.NEXT_PUBLIC_POSTHOG_ASSET_HOST || "";

    return [
      {
        source: "/ingest/static/:path*",
        destination: assetPath + "/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: postHogBaseURL + "/:path*",
      },
      {
        source: "/ingest/decide",
        destination: postHogBaseURL + "/decide",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // Legacy Hugo RSS feed URL
      {
        source: "/index.xml",
        destination: "/feed.xml",
        permanent: true,
      },
      {
        source: "/rss.xml",
        destination: "/feed.xml",
        permanent: true,
      },
      // Legacy Medium-style blog URL (from the pre-Next.js site)
      {
        source:
          "/blogs/@rodneyosodo/minimizing-python-docker-images-cf99f4468d39",
        destination:
          "/blogs/2020-03-13_Minimizing-python-docker-images-cf99f4468d39",
        permanent: true,
      },
      {
        source:
          "/blogs/@rodneyosodo/minimizing-python-docker-images-cf99f4468d39/",
        destination:
          "/blogs/2020-03-13_Minimizing-python-docker-images-cf99f4468d39",
        permanent: true,
      },
      // Removed PDF referenced by external sites
      {
        source: "/AfricaOpenHardwareCommunity2023.pdf",
        destination: "/talks",
        permanent: true,
      },
      // Ghost pagination URL from the old site
      {
        source: "/blogs/1",
        destination: "/blogs",
        permanent: true,
      },
      // Removed sample/demo pages
      {
        source: "/sample",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blogs/sample",
        destination: "/blogs",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
