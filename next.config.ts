import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    taint: true,
  },
  transpilePackages: ["next-mdx-remote"],
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
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
