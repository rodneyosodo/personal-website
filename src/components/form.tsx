"use client";

import { useForm } from "@formspree/react";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Form() {
  const [state, handleSubmit] = useForm("mlddygzj");
  const id = useId();

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
