import type { MDXComponents } from "mdx/types";
import { components } from "@/components/markdown";

export function useMDXComponents(): MDXComponents {
  return components;
}
