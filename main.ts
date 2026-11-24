import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const joke =
  "My cat sat on my keyboard, emailed my boss 'meow', and now HR wants a meeting about my new communication style.";

const chars = [...joke].length;
if (chars < 1 || chars >= 200) {
  throw new Error(`cat joke is ${chars} characters, must be under 200`);
}
if (joke.includes("\n")) {
  throw new Error("cat joke must be a single line, no line breaks");
}

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });
const outPath = `${targetDir}/entry.txt`;
writeFileSync(outPath, joke, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== joke) throw new Error("read-back mismatch: entry.txt does not match the joke");
console.log(`wrote ${outPath} (${chars} characters)`);
