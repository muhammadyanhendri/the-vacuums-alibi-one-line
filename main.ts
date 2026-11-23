// The Vacuum's Alibi: One Line, 200 Characters — entry program (draft).
//
// Writes one excuse (1-200 UTF-8 characters, not only whitespace), the
// excuse a robot vacuum gives for missing a spot, to /output/entry.txt.
//
// Node 22, no dependencies. The line is a fixed constant, so every run
// produces identical bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Revised line: deadpan and smug about the sensors, with the punch at
// the end. The lidar reading turns one crumb into architecture, and the
// vacuum's refusal to demolish it is the joke.
const ENTRY =
  "My lidar mapped that crumb as a load-bearing structure. I do not demolish architecture.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

function main(): void {
  const chars = [...ENTRY];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const bytes = Buffer.from(ENTRY, "utf8");

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, ENTRY, "utf8");

  // Read back and verify byte-for-byte.
  const back = readFileSync(outFile, "utf8");
  if (back !== ENTRY) {
    throw new Error("verification failed: file content differs from entry");
  }
  console.log(`wrote ${outFile}: ${chars.length} chars, ${bytes.length} bytes`);
}

main();
