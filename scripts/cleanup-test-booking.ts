// Remove the test booking row. Run: npx tsx --env-file=.env scripts/cleanup-test-booking.ts
import { createClient } from "@supabase/supabase-js";

async function main() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
  const { error } = await supabase
    .from("coaching_bookings")
    .delete()
    .eq("email", "test@example.com");
  if (error) {
    console.error("Cleanup failed:", error.message);
    process.exit(1);
  }
  console.log("✅ Test booking removed.");
}

main();
