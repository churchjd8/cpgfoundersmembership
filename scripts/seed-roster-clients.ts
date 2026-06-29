// Seed the admin roster with Jeff's high-ticket clients ONLY.
// The panel roster is now driven by admin_clients (on_roster = true); Stripe just
// enriches payment data by email. This script:
//   1. Adds alt_emails / product / start_date columns (idempotent).
//   2. Upserts the curated high-ticket list below.
//   3. Flips on_roster = false for any pre-existing row NOT in the list, so the
//      roster shows exactly these clients and nothing else.
// Run: npx tsx --env-file=.env scripts/seed-roster-clients.ts

const ref = (process.env.SUPABASE_URL || "").match(/https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1];
const token = process.env.SUPABASE_ACCESS_TOKEN;

if (!ref || !token) {
  console.error("Missing SUPABASE_URL or SUPABASE_ACCESS_TOKEN in .env");
  process.exit(1);
}

type Seed = {
  email: string; // primary key + first Stripe join attempt
  name: string;
  business: string;
  product: string;
  startDate: string | null; // ISO yyyy-mm-dd
  altEmails: string[]; // additional Stripe join candidates
};

// NOTE: namic@gngr.placeholder and jade@fermenteria.placeholder are stand-ins —
// no email was on file. Replace them in Supabase once you have the real address.
const CLIENTS: Seed[] = [
  { email: "karen@sobasparkle.com", name: "Steve & Karen Getz", business: "Soba Sparkle (Sparklebuck)", product: "Sparkling Buckwheat Tea", startDate: "2026-01-01", altEmails: ["steve@sobasparkle.com"] },
  { email: "mike@tatsutea.com", name: "Mike & Gina Crossey", business: "Tatsu Tea", product: "Sparkling Matcha Tea", startDate: "2026-03-01", altEmails: ["gina@tatsutea.com"] },
  { email: "krystal@gotighties.com", name: "Krystal Gillis", business: "Tighties", product: "Wearable Movement Technology", startDate: "2026-02-20", altEmails: [] },
  { email: "josh@eatshires.com", name: "Joshua Velasquez", business: "Shire's Naturals", product: "Frozen Non-Dairy Pasta", startDate: "2026-03-15", altEmails: [] },
  { email: "rez@thegoatshake.com", name: "Rez Javid", business: "The Goat Shake", product: "Protein Shake", startDate: "2026-03-01", altEmails: [] },
  { email: "chrisj@jrxbiotech.com", name: "Chris Jordan & Meg Maupin", business: "5C Beauty", product: "Beauty (Skin) Product", startDate: "2026-03-01", altEmails: ["meghanmaupin@gmail.com"] },
  { email: "austin@g7studio.co", name: "Hannah & Austin Wiberg", business: "G7", product: "Bone Broth Shot", startDate: "2026-03-05", altEmails: ["hannah@g7studio.co"] },
  { email: "james@elixirshots.com", name: "James & Lina", business: "Elixir", product: "Wellness Shots", startDate: "2026-03-05", altEmails: ["lina@elixirshots.com", "chrisofthejane@gmail.com"] },
  { email: "ali@nobiggieplease.com", name: "Ali Weiss & Aytunc Atabek", business: "NoBiggie Please", product: "Kids Sparkling Juice Drink", startDate: null, altEmails: [] },
  { email: "bryn@groundedshakes.com", name: "Bryn Ferris & Gabriel Bean", business: "Grounded Shakes", product: "BFY Shake Drink", startDate: "2026-03-18", altEmails: ["gabriel@groundedshakes.com"] },
  { email: "michele@blumehoneywater.com", name: "Michele Burchfield", business: "Blume Honeywater", product: "Functional Water", startDate: "2026-04-01", altEmails: [] },
  { email: "marifassett@marimix.com", name: "Mari Fassett", business: "Marimix", product: "Healthy Snack Mix", startDate: "2026-04-01", altEmails: ["scott@marimix.com"] },
  { email: "jerome@berripro.com", name: "Jerome Tse", business: "Berri Organics", product: "Kids Hydration (natural Pedialyte)", startDate: "2026-03-24", altEmails: [] },
  { email: "nathan@drinkgoodwolf.com", name: "Nathan Kean", business: "Good Wolf", product: "Kombucha Kefir", startDate: "2026-05-01", altEmails: ["elias@drinkgoodwolf.com"] },
  { email: "alli@supermush.com", name: "Ali Schaper", business: "Super Mush", product: "BFY Gummies", startDate: "2026-05-15", altEmails: ["brian@supermush.com"] },
  { email: "namic@gngr.placeholder", name: "Namic", business: "GNGR", product: "Wellness Shots", startDate: "2026-04-14", altEmails: [] },
  { email: "jade@fermenteria.placeholder", name: "Jade Chang Sheppard", business: "Fermenteria", product: "Fermented Functional Beverage", startDate: "2026-06-16", altEmails: [] },
  { email: "zmoussa@drinktulua.com", name: "Zyad Moussa", business: "Tulua", product: "Shot Company", startDate: null, altEmails: [] },
  { email: "erin@dropsofdough.com", name: "Erin Aliaga", business: "Drops of Dough", product: "Cookie Company", startDate: "2026-06-20", altEmails: [] },
];

const q = (s: string | null) => (s == null ? "null" : `'${s.replace(/'/g, "''")}'`);
const arr = (xs: string[]) =>
  xs.length === 0 ? "'{}'" : `array[${xs.map((x) => `'${x.replace(/'/g, "''")}'`).join(",")}]::text[]`;

const emails = CLIENTS.map((c) => c.email.toLowerCase());

const values = CLIENTS.map((c) => {
  const e = c.email.toLowerCase();
  return `(${q(e)}, ${q(c.name)}, ${q(c.business)}, ${q(c.product)}, ${c.startDate ? q(c.startDate) : "null"}, ${arr(
    c.altEmails.map((x) => x.toLowerCase()),
  )}, 'active', true)`;
}).join(",\n  ");

const sql = `
alter table public.admin_clients add column if not exists alt_emails text[] not null default '{}';
alter table public.admin_clients add column if not exists product text;
alter table public.admin_clients add column if not exists start_date date;

insert into public.admin_clients (email, name, business, product, start_date, alt_emails, status, on_roster)
values
  ${values}
on conflict (email) do update set
  name = excluded.name,
  business = excluded.business,
  product = excluded.product,
  start_date = excluded.start_date,
  alt_emails = excluded.alt_emails,
  on_roster = true,
  updated_at = now();

-- Anything not on the curated high-ticket list drops off the roster.
update public.admin_clients
  set on_roster = false, updated_at = now()
  where email not in (${emails.map((e) => `'${e}'`).join(",")}) and on_roster = true;
`;

async function main() {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: sql }),
  });
  if (!res.ok) {
    console.error(`Failed (${res.status}):`, await res.text());
    process.exit(1);
  }
  console.log(`✅ Seeded ${CLIENTS.length} high-ticket clients; roster now scoped to them.`);
}

main();

export {};
