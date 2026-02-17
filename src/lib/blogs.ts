import fs from "node:fs";
import path from "node:path";

type Metadata = {
  title: string;
  date: string;
};

const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
const quoteRegex = /^['"](.*)['"]\$/;

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

function getMdxFiles(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((file) => path.extname(file) === ".mdx" && file !== "page.mdx");
}

function readMdxFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMdxData(dir: string) {
  const mdxFiles = getMdxFiles(dir);

  return mdxFiles.map((file) => {
    const { metadata, content } = readMdxFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getArticles() {
  return getMdxData(path.join(process.cwd(), "src", "app", "(blogs)", "blogs"));
}

export function getArticleBySlug(slug: string) {
  const dir = path.join(process.cwd(), "src", "app", "(blogs)", "blogs");
  const filePath = path.join(dir, `${slug}.mdx`);
  // Ensure the resolved path is within the blogs directory
  if (!filePath.startsWith(dir)) {
    return null;
  }
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const { metadata, content } = readMdxFile(filePath);
  return { metadata, slug, content };
}
