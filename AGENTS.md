<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Daily blog publishing

Before creating a routine daily blog post, check `publishAt` in existing
`src/content/blog/*.mdx` files using the America/Los_Angeles calendar date.
An article scheduled for that date already fills the daily publishing slot;
do not create an additional routine post for that day. Explicit user requests
for additional posts take precedence. The Fatal Flaws series fills September
17–21, 2026, at 9 AM Pacific. See `docs/fatal-flaws-blog-series.md`.

Scheduled posts use an ISO timestamp with an explicit offset in `publishAt`.
Keep the request-time visibility checks in `src/lib/blog.ts` and the blog and
resources pages so future articles stay hidden until their release time.
