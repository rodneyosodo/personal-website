"use client";

import { useForm } from "@formspree/react";
import { usePostHog } from "posthog-js/react";
import { useEffect, useId, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Form() {
  const [state, handleSubmit] = useForm("mlddygzj");
  const posthog = usePostHog();
  const id = useId();
  const prevSucceeded = useRef(false);
  const hasFocused = useRef(false);

  // Track successful subscription
  useEffect(() => {
    if (state.succeeded && !prevSucceeded.current) {
      posthog.capture("newsletter_subscribed", {
        form_id: "mlddygzj",
        source: "blog_post",
      });
      prevSucceeded.current = true;
    }
  }, [state.succeeded, posthog]);

  const handleEmailFocus = () => {
    if (!hasFocused.current) {
      posthog.capture("newsletter_subscription_started", {
        form_id: "mlddygzj",
        source: "blog_post",
      });
      hasFocused.current = true;
    }
  };

  return (
    <div>
      <div className="mb-8 w-full max-w-md text-center pt-8">
        <p className="text-sm">Subscribe to get future posts via email </p>
      </div>
      <div className="w-full max-w-md">
        {state.succeeded ? (
          <p className="text-center">Thank you for subscribing!</p>
        ) : (
          <form className="flex space-x-2" onSubmit={handleSubmit}>
            <div className="grow">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input
                id={id}
                placeholder="Enter your email"
                type="email"
                name="email"
                className="rounded-full"
                onFocus={handleEmailFocus}
              />
            </div>
            <Button
              type="submit"
              className="rounded-full"
              disabled={state.submitting}
            >
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
