import type { MDXComponents } from "mdx/types";
import { components } from "@/components/markdown";

// biome-ignore lint/style/useNamingConvention: This is used by MDX
export function useMDXComponents(): MDXComponents {
  return components;
}
