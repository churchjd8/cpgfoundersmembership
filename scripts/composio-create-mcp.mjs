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

const composio = new Composio({ apiKey: env.COMPOSIO_API_KEY });
const userId = process.argv[2] || "jeff_church";
const authConfigId = env.COMPOSIO_META_AUTH_CONFIG_ID;

if (!authConfigId) throw new Error("COMPOSIO_META_AUTH_CONFIG_ID missing in .env");

const name = `jeff-meta-ads-${Date.now()}`;
console.log(`Creating MCP server "${name}"...`);
const server = await composio.mcp.create(name, {
  toolkits: [{ toolkit: "metaads", authConfigId }],
  manuallyManageConnections: false,
});
console.log(`mcp_server_id: ${server.id}`);

console.log(`\nGenerating per-user instance for user_id=${userId}...`);
const instance = await server.generate(userId);
console.log(`\n=== MCP URL (per-user) ===`);
console.log(instance.url);
console.log(`==========================\n`);
console.log("Add to Claude Code with:");
console.log(`  claude mcp add --transport http --scope user composio-jeff "${instance.url}"`);
