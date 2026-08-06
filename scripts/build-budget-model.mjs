/**
 * Regenerates src/app/jeff-budget/model-html.ts from model.source.html.
 *
 * The budget model is a self-contained HTML document (its own styles, its own
 * scripts). Rather than port it to React, we inline it as a string and serve it
 * from a route handler. Edit model.source.html, then run:
 *
 *   node scripts/build-budget-model.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dir = join(here, "..", "src", "app", "jeff-budget");
const SRC = join(dir, "model.source.html");
const OUT = join(dir, "model-html.ts");

const inner = readFileSync(SRC, "utf8");
const title = inner.match(/<title>(.*?)<\/title>/)?.[1] ?? "Budget model";
const body = inner.replace(/<title>.*?<\/title>\s*/, "");

const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>${title}</title>
</head>
<body>
${body}
</body>
</html>
`;

// Escape for embedding in a TS template literal.
const escaped = doc
  .replace(/\\/g, "\\\\")
  .replace(/`/g, "\\`")
  .replace(/\$\{/g, "\\${");

writeFileSync(
  OUT,
  "// AUTO-GENERATED — do not edit. Source: model.source.html\n" +
    "// Regenerate: node scripts/build-budget-model.mjs\n\n" +
    "export const BUDGET_MODEL_HTML = `" +
    escaped +
    "`;\n"
);

console.log(`Wrote ${OUT} (${doc.length} bytes of HTML)`);
