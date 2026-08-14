// One-time: create the book_cover_votes table via the Supabase Management API.
// Mirrors src/app/api/book-cover-vote/schema.sql.
// Run: npx tsx --env-file=.env scripts/setup-book-cover-votes-table.ts

import { readFileSync } from "fs";

const ref = (process.env.SUPABASE_URL || "").match(/https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1];
const token = process.env.SUPABASE_ACCESS_TOKEN;

if (!ref || !token) {
  console.error("Missing SUPABASE_URL or SUPABASE_ACCESS_TOKEN in .env");
  process.exit(1);
}

const sql = readFileSync("src/app/api/book-cover-vote/schema.sql", "utf8");

async function main() {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  if (!res.ok) {
    console.error(`Failed (${res.status}):`, await res.text());
    process.exit(1);
  }
  console.log("✅ book_cover_votes table is ready.");
}

main();

export {};
