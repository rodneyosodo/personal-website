"use client";

import { getCalApi } from "@calcom/embed-react";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

export default function CalButton() {
  const [loading, setLoading] = useState(false);

  async function openCal() {
    setLoading(true);
    try {
      const cal = await getCalApi({ namespace: "personal-website" });
      cal("modal", { calLink: "rodneyosodo/personal-website" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={openCal}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      Book my Cal
      <CalendarDays className="size-4" />
      <span className="sr-only">Open my calendar</span>
    </button>
  );
}
