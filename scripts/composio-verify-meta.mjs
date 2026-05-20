#!/usr/bin/env node
import { Composio } from "@composio/core";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = Object.fromEntries(
  readFileSync(join(__dirname, "..", ".env"), "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

const userId = process.argv[2] || "jeff_church";
const composio = new Composio({ apiKey: env.COMPOSIO_API_KEY });

console.log(`\n--- Connected accounts for user_id=${userId} ---`);
const accounts = await composio.connectedAccounts.list({ userIds: [userId] });
for (const a of accounts.items || []) {
  console.log(`${a.id}  toolkit=${a.toolkit?.slug || "?"}  status=${a.status}`);
}

console.log(`\n--- Listing Meta ad accounts ---`);
try {
  const result = await composio.tools.execute("METAADS_GET_AD_ACCOUNTS", {
    userId,
    arguments: {},
    dangerouslySkipVersionCheck: true,
  });
  console.log(JSON.stringify(result, null, 2));
} catch (e) {
  console.error("execute error:", e.message || e);
}
