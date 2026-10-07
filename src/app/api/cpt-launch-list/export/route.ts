// Download Jeff's list as an Excel workbook. It carries every row in the
// database plus blank validated rows, so the same file is the template.
//   GET /api/cpt-launch-list/export?who=Jeff
import { NextResponse } from "next/server";
import { buildWorkbook, listContacts, logActivity, sameOrigin } from "@/lib/cpt-launch-list";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const who = new URL(request.url).searchParams.get("who") || "";
  try {
    const rows = await listContacts();
    const buf = await buildWorkbook(rows);
    await logActivity(who, "download", `${rows.length} rows`);
    const date = new Date().toISOString().slice(0, 10);
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="CPT Launch List ${date}.xlsx"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("[cpt-launch-list] export:", e);
    return NextResponse.json({ error: "could not build the file" }, { status: 500 });
  }
}
