import { components } from "@/components/markdown";
import type { MDXComponents } from "mdx/types";

// biome-ignore lint/style/useNamingConvention: This is used by MDX
export function useMDXComponents(): MDXComponents {
  return components;
}
