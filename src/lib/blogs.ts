import { resolve } from "node:path";
import { Glob } from "bun";

type Metadata = {
  title: string;
  date: string;
  image?: string;
};

const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
const quoteRegex = /^['"](.*)['"]\$/;
const imageSrcRegex = /src=["']([^"']+\.(?:jpg|jpeg|png|webp|gif|svg))["']/i;
const blogsDir = `${process.cwd()}/src/app/(blogs)/blogs`;
const mdxGlob = new Glob("*.mdx");

function parseFrontmatter(fileContent: string) {
  const match = frontmatterRegex.exec(fileContent);
  if (!match?.[1]) {
    throw new Error("Invalid frontmatter format");
  }
  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  for (const line of frontMatterLines) {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(quoteRegex, "$1");
    metadata[key.trim() as keyof Metadata] = value;
  }

  return { metadata: metadata as Metadata, content };
}

function extractFirstImage(content: string): string | undefined {
  const match = imageSrcRegex.exec(content);
  if (!match) return undefined;
  const src = match[1];
  if (src.startsWith("/")) return src;
  if (src.startsWith("http")) return src;
  return undefined;
}

async function getMdxFiles(dir: string) {
  const files: string[] = [];
  for await (const file of mdxGlob.scan(dir)) {
    if (file !== "page.mdx") files.push(file);
  }
  return files;
}

async function readMdxFile(filePath: string) {
  const rawContent = await Bun.file(filePath).text();
  return parseFrontmatter(rawContent);
}

async function getMdxData(dir: string) {
  const mdxFiles = await getMdxFiles(dir);

  return Promise.all(
    mdxFiles.map(async (file) => {
      const { metadata, content } = await readMdxFile(`${dir}/${file}`);
      const slug = file.replace(/\.mdx$/, "");
      const image = metadata.image || extractFirstImage(content);
      return {
        metadata: image ? { ...metadata, image } : metadata,
        slug,
        content,
      };
    }),
  );
}

export async function getArticles() {
  return getMdxData(blogsDir);
}

export async function getArticleBySlug(slug: string) {
  const filePath = resolve(`${blogsDir}/${slug}.mdx`);
  if (!filePath.startsWith(blogsDir)) {
    return null;
  }
  if (!(await Bun.file(filePath).exists())) {
    return null;
  }
  const { metadata, content } = await readMdxFile(filePath);
  const image = metadata.image || extractFirstImage(content);
  return { metadata: image ? { ...metadata, image } : metadata, slug, content };
}
