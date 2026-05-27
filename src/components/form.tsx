"use client";

import { useForm } from "@formspree/react";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
  const [state, handleSubmit] = useForm("mlddygzj");
  const id = useId();
  const centered = align === "center";

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
        {state.succeeded ? (
          <p className={cn("text-sm", centered && "text-center")}>
            Thanks, you're on the list.
          </p>
        ) : (
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input type="hidden" name="source" value={source} />
            <input type="hidden" name="_subject" value={subject} />
            <div className="grow">
              <Label htmlFor={id} className="sr-only">
                Email
              </Label>
              <Input
                id={id}
                placeholder="you@example.com"
                type="email"
                name="email"
                className="rounded-full"
              />
            </div>
            <Button
              type="submit"
              className="rounded-full whitespace-nowrap"
              disabled={state.submitting}
            >
              {buttonLabel}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
