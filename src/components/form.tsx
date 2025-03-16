"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@formspree/react";

export default function Form() {
  const [state, handleSubmit] = useForm("mlddygzj");

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
            <div className="flex-grow">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input
                id="email"
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
