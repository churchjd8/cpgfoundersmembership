import { vendorCrm } from "@/lib/cpg-match-crm";
import { cookies } from "next/headers";
import { loadSubmissions } from "@/lib/cpg-match-submissions";
import { CPG_MATCH_ADMIN_COOKIE, isCpgMatchAdmin } from "@/lib/cpg-match-admin-auth";

function csv(value: unknown) {
  const text = Array.isArray(value) ? value.join(", ") : String(value ?? "");
  const safe = /^[\s]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}
export async function GET(request: Request) {
  const token = (await cookies()).get(CPG_MATCH_ADMIN_COOKIE)?.value;
  if (!await isCpgMatchAdmin(token)) return new Response("Unauthorized", { status: 401 });
  const type = new URL(request.url).searchParams.get("type") || undefined;
  if (type && !["recommendation", "waitlist"].includes(type)) return new Response("Invalid submission type", { status: 400 });
  try {
    const data = await loadSubmissions(type);
    const fields = ["vendorContactName", "vendorContactEmail", "vendorNotificationPermission", "vendorPermissionRecordedAt", "vendorPermissionScope", "attribution", "scope", "workPeriod", "quality", "communication", "delivery", "value", "expectations", "stageFit", "disappointed", "companyStage", "investment", "bestFor", "knowBeforeHiring", "certification", "needs"];
    const header = ["id", "type", "first_name", "last_name", "email", "brand", "vendor_name", "vendor_category", "created_at", ...fields, "status", "owner", "next_action", "follow_up_date", "last_updated", "activity_and_notes", "full_response"];
    const lines = data.map(row => [row.id, row.submission_type, row.first_name, row.last_name, row.email, row.brand, row.vendor_name, row.vendor_category, row.created_at, ...fields.map(field => row.payload?.[field] ?? (field === "vendorNotificationPermission" ? "Not recorded" : "")), ...(row.submission_type === "recommendation" ? [vendorCrm(row.crm).status, vendorCrm(row.crm).owner, vendorCrm(row.crm).nextAction, vendorCrm(row.crm).followUpDate, vendorCrm(row.crm).updatedAt, vendorCrm(row.crm).activity.map(item => `${item.at}: ${item.text}`).join("\n\n")] : ["", "", "", "", "", ""]), JSON.stringify(row.payload)].map(csv).join(","));
    return new Response("\uFEFF" + [header.join(","), ...lines].join("\r\n"), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename=cpg-match-${type === "recommendation" ? "nominations" : type || "submissions"}.csv`, "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("CPG Match export error:", error);
    return new Response("Could not export submissions", { status: 500 });
  }
}
