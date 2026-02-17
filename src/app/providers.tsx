"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import type React from "react";
import { useEffect } from "react";
import SuspendedPostHogPageView from "@/app/posthog-page-view";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (key && host) {
      posthog.init(key, {
        api_host: "/ingest",
        ui_host: host,
        capture_pageview: false,
        capture_pageleave: true,
      });
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}
