"use client";

import posthog from "posthog-js";
// biome-ignore lint/style/useNamingConvention: 
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import SuspendedPostHogPageView from "@/app/posthog-page-view";
import type React from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      // biome-ignore lint/style/useNamingConvention: This is used by PostHog
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST as string,
      // biome-ignore lint/style/useNamingConvention: This is used by PostHog
      capture_pageview: false,
      // biome-ignore lint/style/useNamingConvention: This is used by PostHog
      capture_pageleave: true,
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}
