#!/usr/bin/env node

import fs from "node:fs/promises";
import process from "node:process";

function printUsage() {
  console.error(`Usage:
  node scripts/edit_tool.mjs action.json
  cat action.json | node scripts/edit_tool.mjs

Supported formats:
  {
    "tool": "Edit",
    "parameters": {
      "file_path": "/abs/path/to/file",
      "old_string": "old text",
      "new_string": "new text"
    }
  }

  or

  {
    "file_path": "/abs/path/to/file",
    "old_string": "old text",
    "new_string": "new text"
  }`);
}

async function readInput() {
  const fileArg = process.argv[2];
  if (fileArg) {
    return fs.readFile(fileArg, "utf8");
  }

  if (!process.stdin.isTTY) {
    const chunks = [];
    for await (const chunk of process.stdin) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString("utf8");
  }

  printUsage();
  process.exit(1);
}

function normalizePayload(raw) {
  const parsed = JSON.parse(raw);
  if (parsed?.tool === "Edit" && parsed?.parameters) {
    return parsed.parameters;
  }
  return parsed;
}

function countOccurrences(haystack, needle) {
  if (!needle) return 0;
  let count = 0;
  let startIndex = 0;
  while (true) {
    const index = haystack.indexOf(needle, startIndex);
    if (index === -1) return count;
    count += 1;
    startIndex = index + needle.length;
  }
}

async function main() {
  const raw = await readInput();
  let payload;

  try {
    payload = normalizePayload(raw);
  } catch (error) {
    console.error("Failed to parse JSON:", error instanceof Error ? error.message : error);
    process.exit(1);
  }

  const filePath = payload?.file_path;
  const oldString = payload?.old_string;
  const newString = payload?.new_string;
  const replaceAll = Boolean(payload?.replace_all);

  if (
    typeof filePath !== "string" ||
    typeof oldString !== "string" ||
    typeof newString !== "string"
  ) {
    console.error("Invalid payload. Expected file_path, old_string and new_string to be strings.");
    process.exit(1);
  }

  const original = await fs.readFile(filePath, "utf8");
  const occurrences = countOccurrences(original, oldString);

  if (occurrences === 0) {
    console.error(`old_string not found in ${filePath}`);
    process.exit(1);
  }

  if (occurrences > 1 && !replaceAll) {
    console.error(
      `old_string matched ${occurrences} times in ${filePath}. ` +
        "Please make old_string more specific or pass replace_all: true.",
    );
    process.exit(1);
  }

  const updated = replaceAll
    ? original.split(oldString).join(newString)
    : original.replace(oldString, newString);

  await fs.writeFile(filePath, updated, "utf8");

  console.log(
    `Updated ${filePath} (${replaceAll ? `replaced ${occurrences} matches` : "replaced 1 match"})`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
