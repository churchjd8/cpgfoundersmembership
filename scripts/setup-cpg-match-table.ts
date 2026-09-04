// One-time setup for structured CPG Match intake storage.
// Run: npx tsx --env-file=.env scripts/setup-cpg-match-table.ts
import { readFileSync } from "node:fs";

const ref = (process.env.SUPABASE_URL || "").match(/https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1];
const token = process.env.SUPABASE_ACCESS_TOKEN;

if (!ref || !token) {
  console.error("Missing SUPABASE_URL or SUPABASE_ACCESS_TOKEN in .env");
  process.exit(1);
}

const query = readFileSync("src/app/api/cpg-match/schema.sql", "utf8");

async function main() {
  const response = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    console.error(`Failed (${response.status}):`, await response.text());
    process.exit(1);
  }

  console.log("CPG Match submissions table is ready.");
}

main();
