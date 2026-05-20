#!/usr/bin/env node
import { Composio } from "@composio/core";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

const apiKey = env.COMPOSIO_API_KEY;
const authConfigId = env.COMPOSIO_META_AUTH_CONFIG_ID;
const userId = process.argv[2] || "jeff_church";

if (!apiKey) throw new Error("COMPOSIO_API_KEY missing in .env");
if (!authConfigId) throw new Error("COMPOSIO_META_AUTH_CONFIG_ID missing in .env");

const composio = new Composio({ apiKey });

console.log(`Initiating Meta Ads connection for user_id=${userId}...`);
const req = await composio.connectedAccounts.initiate(userId, authConfigId);

console.log("\n=== OPEN THIS URL TO AUTHORIZE ===\n");
console.log(req.redirectUrl);
console.log("\n==================================\n");
console.log(`connected_account_id: ${req.id}`);
console.log("Waiting for authorization (timeout 5min)... ");

try {
  const account = await req.waitForConnection(300);
  console.log(`\n✓ Connected. status=${account.status} id=${account.id}`);
} catch (e) {
  console.error(`\n✗ ${e.message || e}`);
  process.exit(1);
}
