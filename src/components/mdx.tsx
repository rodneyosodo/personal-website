import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import type { JSX } from "react";
import { components } from "@/components/markdown";

export function CustomMdx(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
