import { components } from "@/components/markdown";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import type { JSX } from "react";

export function CustomMdx(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
