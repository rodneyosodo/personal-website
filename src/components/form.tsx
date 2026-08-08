"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type State = "idle" | "submitting" | "succeeded" | "error";

export default function Form({
  label = "Get new posts in your inbox. No spam, just the occasional deep dive.",
  buttonLabel = "Subscribe",
  align = "center",
  source = "subscribe",
  subject = "New blog subscriber",
}: {
  label?: string;
  buttonLabel?: string;
  align?: "center" | "left";
  source?: string;
  subject?: string;
}) {
  const [state, setState] = useState<State>("idle");
  const id = useId();
  const centered = align === "center";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, subject }),
      });

      if (response.ok) {
        setState("succeeded");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <div className={cn(centered && "flex flex-col items-center pt-8")}>
      <p
        className={cn(
          "mb-4 w-full max-w-md text-sm text-muted-foreground",
          centered && "text-center",
        )}
      >
        {label}
      </p>
      <div className="w-full max-w-md">
        {state === "succeeded" ? (
          <p className={cn("text-sm", centered && "text-center")}>
            Thanks, you're on the list.
          </p>
        ) : (
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <div className="grow">
              <Label htmlFor={id} className="sr-only">
                Email
              </Label>
              <Input
                id={id}
                placeholder="you@example.com"
                type="email"
                name="email"
                autoComplete="email"
                required
                className="rounded-full"
              />
            </div>
            <Button
              type="submit"
              className="rounded-full whitespace-nowrap"
              disabled={state === "submitting"}
            >
              {buttonLabel}
            </Button>
          </form>
        )}
      </div>
      {state === "error" && (
        <p
          className={cn(
            "mt-2 text-sm text-destructive",
            centered && "text-center",
          )}
        >
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
