import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import type { JSX } from "react";
import remarkGfm from "remark-gfm";
import { components } from "@/components/markdown";

export function CustomMdx(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
