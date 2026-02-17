import Image, { type ImageProps } from "next/image";
import {
  type ComponentPropsWithoutRef,
  isValidElement,
  type JSX,
  type ReactNode,
} from "react";
import { highlight } from "sugar-high";
import { cn } from "@/lib/utils";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node))
    return extractText((node.props as { children?: ReactNode }).children);
  return "";
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters except for -
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const styles = {
    1: "mt-12 scroll-m-20 text-3xl sm:text-4xl font-bold tracking-tight",
    2: "mt-10 scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight",
    3: "mt-8 scroll-m-20 text-lg sm:text-xl font-semibold tracking-tight",
    4: "mt-8 scroll-m-20 text-base sm:text-lg font-semibold tracking-tight",
    5: "mt-8 scroll-m-20 text-base sm:text-lg font-semibold tracking-tight",
    6: "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return ({ className = "" as string, ...props }) => {
    const id = slugify(extractText(props.children as ReactNode));

    return (
      <Tag id={id} className={cn(`${styles[level]}`, className)} {...props}>
        <a href={`#${id}`} aria-label="Link to section">
          {props.children}
        </a>
      </Tag>
    );
  };
}

export const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),

  a: ({ className = "" as string, ...props }) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className = "" as string, ...props }) => (
    <p
      className={cn(
        "leading-7 text-sm md:text-base/loose not-first:mt-6",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className = "" as string, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className = "" as string, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className = "" as string, ...props }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className = "" as string, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic *:text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  Image: ({ width, height, className = "", ...props }: ImageProps) =>
    width && height ? (
      <Image
        width={width}
        height={height}
        className={cn("my-6 rounded-lg", className)}
        {...props}
      />
    ) : (
      <span
        className={cn("relative block w-full aspect-video my-6", className)}
      >
        <Image fill className="rounded-lg object-cover" {...props} />
      </span>
    ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHtml = highlight(
      typeof children === "string" ? children : String(children ?? ""),
    );
    return (
      <code
        className="relative rounded-md border bg-muted py-1 font-mono text-sm text-foreground"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is the intended behavior
        dangerouslySetInnerHTML={{ __html: codeHtml }}
        {...props}
      />
    );
  },
};
