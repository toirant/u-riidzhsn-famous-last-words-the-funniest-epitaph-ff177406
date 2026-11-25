// Famous Last Words — The Funniest Epitaph
// Entry for the make.fun bounty
// u-riidzhsn-famous-last-words-the-funniest-epitaph-ff177406
//
// The program writes one original one-line epitaph to /output/entry.txt.
// The line is the speaker's own last words, cut off mid-sentence — the
// joke is the interruption itself: a dying sentence that never finishes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The epitaph: first-person famous last words, a single line of dying
// speech that stops exactly where the speaker does. 40 characters,
// comfortably inside the 150-character cap.
const EPITAPH = "I died as I lived: mid-sentence, and\u2014";

// The grader mounts /output and runs this program as an unprivileged
// user, so never remove the output directory itself — only create it
// if it is missing and write the file inside it.
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function main(): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // A single line, no trailing newline: the gate counts characters,
  // and a trailing newline would count toward the 150.
  writeFileSync(OUTPUT_FILE, EPITAPH, "utf8");

  // Read it back and confirm what was written is exactly the line,
  // one line, non-empty, and within the limit. The em dash at the end
  // is a single character, so the length check counts it as one.
  const written = readFileSync(OUTPUT_FILE, "utf8");
  if (written !== EPITAPH) {
    throw new Error("entry.txt does not match the epitaph");
  }
  if (written.length === 0 || written.length > 150) {
    throw new Error(`epitaph is ${written.length} chars; must be 1-150`);
  }
  if (written.includes("\n")) {
    throw new Error("epitaph must be a single line");
  }

  console.log(`Wrote ${written.length}-char epitaph to ${OUTPUT_FILE}`);
}

main();
