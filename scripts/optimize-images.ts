import { readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname } from "node:path";

const inputDir = process.argv[2];

if (!inputDir) {
  console.error("Usage: bun run images:optimize <path/to/images>");
  process.exit(1);
}

const SUPPORTED = new Set([".jpg", ".jpeg", ".png"]);

const files = (await readdir(inputDir))
  .filter((f) => SUPPORTED.has(extname(f).toLowerCase()));

if (files.length === 0) {
  console.log("No images found.");
  process.exit(0);
}

for (const file of files) {
  const inputPath = join(inputDir, file);
  const outputPath = join(inputDir, file.replace(extname(file), ".webp"));

  if (existsSync(outputPath)) {
    console.log(`  ${file} → skipped (already exists)`);
    continue;
  }

  const { size } = await stat(inputPath);

  const proc = Bun.spawnSync(["cwebp", "-q", "80", "-resize", "1920", "0", inputPath, "-o", outputPath]);

  if (proc.exitCode !== 0) {
    console.error(`Failed: ${file}`, proc.stderr.toString());
    continue;
  }

  const { size: newSize } = await stat(outputPath);
  const ratio = ((1 - newSize / size) * 100).toFixed(1);
  console.log(`  ${file}  ${(size / 1024 / 1024).toFixed(1)}MB → ${(newSize / 1024 / 1024).toFixed(1)}MB  (${ratio}% smaller)`);
}

console.log(`\nDone. ${files.length} image(s) converted.`);
