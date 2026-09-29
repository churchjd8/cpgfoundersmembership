import { getSupabaseAdmin } from "@/lib/supabase";
export const dynamic = "force-dynamic";
export default async function Page() {
  const db = getSupabaseAdmin();
  const rows: {
    id: string;
    vendor_name: string;
    category: string;
    confirmed_at: string;
    payload: Record<string, unknown>;
  }[] = [];
  let failed = !db;
  if (db)
    for (let offset = 0; ; offset += 1000) {
      const { data, error } = await db
        .from("cpg_match_vendor_intakes")
        .select("id,vendor_name,category,confirmed_at,payload")
        .order("confirmed_at", { ascending: false })
        .order("id")
        .range(offset, offset + 999);
      if (error) {
        failed = true;
        break;
      }
      rows.push(...data);
      if (data.length < 1000) break;
    }
  return (
    <main className="cpg-match-page mx-auto max-w-5xl px-5 py-10">
      <a href="/cpg-match-admin" className="font-semibold text-accent">
        ← Review CRM
      </a>
      <h1 className="mt-5 text-3xl font-bold">Vendor-provided information</h1>
      <p className="mt-3 text-muted">
        Current claims supplied by vendors, separate from founder experiences.
        Confirm inquiry identity before using these facts publicly. Latest
        confirmations appear first.
      </p>
      <a
        href="https://cpgmatch.com/vendor-intake"
        className="mt-3 inline-block text-accent underline"
      >
        Open vendor intake form
      </a>
      <div className="mt-6 space-y-4">
        {failed ? (
          <p role="alert">
            Could not load vendor information. Please try again.
          </p>
        ) : (
          rows.map((row) => (
            <details
              key={row.id}
              className="rounded-xl border border-border bg-white p-5"
            >
              <summary className="cursor-pointer">
                <strong>{row.vendor_name}</strong> · {row.category}
                <span className="mt-1 block text-sm text-muted">
                  Vendor confirmed:{" "}
                  {new Date(row.confirmed_at).toLocaleDateString("en-US", {
                    timeZone: "UTC",
                  })}
                </span>
              </summary>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {Object.entries(row.payload)
                  .filter(([, value]) => value !== "")
                  .map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-xs font-semibold uppercase text-muted">
                        {key.replace(/([A-Z])/g, " $1")}
                      </dt>
                      <dd className="whitespace-pre-wrap break-words text-sm">
                        {String(value)}
                      </dd>
                    </div>
                  ))}
              </dl>
            </details>
          ))
        )}
        {!failed && !rows.length && <p>No vendor information submitted yet.</p>}
      </div>
    </main>
  );
}
