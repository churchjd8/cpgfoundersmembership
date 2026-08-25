/**
 * Renders the kit delivery emails for pasting into Kajabi.
 *
 * Kajabi sends the delivery emails, but the copy is authored here so it stays
 * versioned and stays in step with what the pages actually promise. Edit
 * src/lib/kits.ts or src/lib/kit-email.ts, re-run this, paste the result into
 * the matching Kajabi form automation.
 *
 *   npx tsx scripts/render-kit-emails.ts [outDir]
 *
 * Each variant produces two files:
 *   *--preview.html           full document, open it in a browser to proof
 *   *--paste-into-kajabi.html inner HTML only, for Kajabi's editor
 */

import fs from "node:fs";
import path from "node:path";
import { KITS, getKit } from "../src/lib/kits";
import { kitEmailHtml, kitEmailSubject } from "../src/lib/kit-email";

const outDir = process.argv[2] || "kajabi-emails";

/** Kajabi wraps its own shell around the body, so it wants the inner content. */
function pasteReady(full: string) {
  const m = full.match(/<div style="max-width:640px[^"]*">([\s\S]*)<\/div>\s*<\/body>/);
  return (m ? m[1] : full).trim();
}

const VARIANTS = [
  {
    file: "1-book-toolbox-all-kits",
    label: "Book door (/toolbox) — all three kits",
    form: "NEEDS A NEW KAJABI FORM (book-sourced, so it tags separately)",
    kits: KITS,
    source: "toolbox" as const,
  },
  {
    file: "2-site-all-kits",
    label: "Site bundle (/resources) — all three kits",
    form: "2149549983 — All Free Resources Bundle",
    kits: KITS,
    source: "resources" as const,
  },
  {
    file: "3-profitability-kit",
    label: "The Fastest Path to Profitability Kit",
    form: "2149558655 — Burn Rate Replay",
    kits: [getKit("profitability")!],
    source: "resources" as const,
  },
  {
    file: "4-fundraising-kit",
    label: "The $300M Fundraising Kit",
    form: "2149549980 — Fundraising Masterclass Replay",
    kits: [getKit("fundraising")!],
    source: "resources" as const,
  },
  {
    file: "5-starting-line-kit",
    label: "The Starting Line Kit",
    form: "2149549982 — CPG Playbook Video Replay",
    kits: [getKit("starting-line")!],
    source: "resources" as const,
  },
];

fs.mkdirSync(outDir, { recursive: true });

for (const v of VARIANTS) {
  // Kajabi's merge field, so the greeting still personalizes.
  const full = kitEmailHtml({
    firstName: "{{contact.first_name}}",
    kits: v.kits,
    source: v.source,
  });

  fs.writeFileSync(path.join(outDir, `${v.file}--preview.html`), full);
  fs.writeFileSync(path.join(outDir, `${v.file}--paste-into-kajabi.html`), pasteReady(full));

  const links = [...full.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const relative = links.filter((l) => !l.startsWith("http"));

  console.log(`\n${v.label}`);
  console.log(`  subject: ${kitEmailSubject(v.kits, v.source)}`);
  console.log(`  kajabi form: ${v.form}`);
  console.log(`  links: ${links.length}${relative.length ? `  ⚠ ${relative.length} RELATIVE (will break in email)` : ""}`);
}

console.log(`\nWrote ${VARIANTS.length * 2} files to ${path.resolve(outDir)}`);
