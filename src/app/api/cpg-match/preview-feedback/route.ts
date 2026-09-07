import shares from "./shares.json";

export const dynamic = "force-dynamic";

// Uses the same durable review store as the Cross Court and Kinder Farms reviews.
// Separate shares prevent pins from crossing vendors or listing tiers.
async function handle(request: Request) {
  const url = new URL(request.url);
  const scope = url.searchParams.get("scope") || "";
  if (!Object.hasOwn(shares, scope))
    return Response.json({ error: "Unknown preview." }, { status: 400 });
  const token = shares[scope as keyof typeof shares];
  let path = "/comments";
  let body: Record<string, unknown> | undefined;
  if (request.method === "POST") {
    const origin = request.headers.get("origin");
    if (origin && origin !== url.origin)
      return Response.json({ error: "Invalid origin." }, { status: 403 });
    const raw = await request.text();
    if (raw.length > 16000)
      return Response.json({ error: "Comment is too long." }, { status: 413 });
    try { body = JSON.parse(raw); } catch {
      return Response.json({ error: "Invalid comment." }, { status: 400 });
    }
    if (!body || typeof body !== "object" || Array.isArray(body))
      return Response.json({ error: "Invalid comment." }, { status: 400 });
    const { action, id, ...content } = body;
    if (action !== "create") {
      if (!["replies", "resolve", "delete"].includes(String(action)) ||
          typeof id !== "string" || !/^[a-zA-Z0-9_-]{1,80}$/.test(id))
        return Response.json({ error: "Invalid action." }, { status: 400 });
      path += `/${id}/${action}`;
    }
    body = { ...content, target: "lp" };
  }
  try {
    const result = await fetch(`https://engine.arkpartners.ai/r/${token}${path}`, {
      method: request.method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    const data = await result.json();
    return Response.json(data, { status: result.status, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Feedback could not be saved or loaded. Please try again." }, { status: 502 });
  }
}

export const GET = handle;
export const POST = handle;
