import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const aiRoot = path.join(process.cwd(), "ai");

export function getAiInstructionFiles() {
  return readdirSync(aiRoot, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const filePath = path.join(entry.parentPath, entry.name);

      return {
        content: readFileSync(filePath, "utf8"),
        path: ["ai", ...path.relative(aiRoot, filePath).split(path.sep)].join("/"),
      };
    })
    .sort((a, b) => (a.path < b.path ? -1 : 1));
}
