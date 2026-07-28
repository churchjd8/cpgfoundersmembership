# Daily Blog Post Agent - Handoff Doc

This document tells any Claude Code instance how to manage the scheduled remote agent that auto-publishes daily blog posts for cpgfoundersgroup.com.

## Current Setup

- **Trigger ID:** `trig_01NukkfTqZYr22FZ6T3QY5aZ`
- **Name:** CPG Founders Group - Daily Blog Post
- **Schedule:** Monday-Friday at 6:00am PT (1:00pm UTC) - cron: `0 13 * * 1-5`
- **Model:** `claude-sonnet-4-6`
- **Repo:** https://github.com/churchjd8/cpgfoundersmembership
- **Environment:** `env_01D831ZBVhM18HkihCbbRYM3`
- **Manage at:** https://claude.ai/code/scheduled/trig_01NukkfTqZYr22FZ6T3QY5aZ

## What the Agent Does

Each weekday morning at 6am PT, a remote Claude agent:
1. Clones the repo
2. Reads existing blog posts in `src/content/blog/` to avoid duplicate topics
3. Picks a fresh SEO-relevant CPG topic Jeff can speak to
4. Writes a 800-1500 word blog post in Jeff's voice (direct, no em dashes)
5. Finds a relevant Unsplash photo (or falls back to existing Jeff images)
6. Saves the post as an MDX file with proper frontmatter
7. Runs `npm run build` to verify
8. Commits and pushes to `main` (Vercel auto-deploys on push)

## Managing the Trigger from Another Claude Conversation

Any Claude Code session can interact with this via the `RemoteTrigger` tool. Load it with:

```
ToolSearch: select:RemoteTrigger
```

Then use actions:

- `{action: "list"}` - list all triggers
- `{action: "get", trigger_id: "trig_01NukkfTqZYr22FZ6T3QY5aZ"}` - get details
- `{action: "run", trigger_id: "trig_01NukkfTqZYr22FZ6T3QY5aZ"}` - run now manually
- `{action: "update", trigger_id: "trig_01NukkfTqZYr22FZ6T3QY5aZ", body: {...}}` - update config

## Common Issues

**Trigger shows `"enabled": false`**
Happens if a run fails (e.g., repo rename, permissions issue). Re-enable with:
```
{action: "update", trigger_id: "trig_01NukkfTqZYr22FZ6T3QY5aZ", body: {"enabled": true}}
```

**Updating the prompt or settings**
When updating `job_config`, include the FULL object including `events` - partial updates replace the whole block. The current full prompt is stored in the trigger's `job_config.ccr.events[0].data.message.content`. Fetch it first with `get` if you need to modify.

**Repo renamed**
Update the `sources` in `job_config.ccr.session_context`:
```json
"sources": [{"git_repository": {"url": "https://github.com/churchjd8/NEW_REPO_NAME"}}]
```

**Wrong / off-topic header images**
Image selection now goes through `scripts/fetch-blog-images.mjs`, which calls the
Pexels API. Do not go back to scraping a stock photo site. To fix or re-pick an
image by hand:

```bash
node scripts/fetch-blog-images.mjs --only <slug> --query "concrete photographable nouns" --all
```

`--all` forces a re-fetch even when the image file already exists. Queries live in
`scripts/blog-image-queries.json`; photographer credits are recorded in
`src/content/blog-image-credits.json`. The `PEXELS_API_KEY` is in `.env` locally and
inlined in the trigger prompt for the remote agent.

## The Current Prompt

The full prompt the agent runs is below. To update topics, tone, or flow, fetch the current trigger, modify this text, and update via the API.

**Last updated:** 2026-07-28 — replaced image selection entirely with the Pexels API via `scripts/fetch-blog-images.mjs`. Both prior methods (og:image scraping, then the Unsplash napi endpoint) failed silently, and the old fallback pool was a rotation of Jeff's headshots, award badges, book covers and the Nika logo. Net effect: 54 of 87 posts shipped with a hero image unrelated to the article (Trader Joe's post showing a Whole Foods award badge, DTC marketing post showing an Inc 500 badge, and so on). All 54 were backfilled with topical Pexels photos. The fallback pool no longer contains any personal or award imagery, and the agent must now report the exact error when it falls back, so the failure is loud instead of silent.

Prior update — 2026-05-06: rewrote step 6 (image selection) to fix the same-photo-every-day bug. Agent now must build a RECENTLY_USED_IMAGES set from the last 21 days, is permanently forbidden from `retail-store-aisle.jpg` and `grocery-shelf.jpg`, must download a fresh Unsplash photo via WebSearch + WebFetch (extracting the `og:image` source ID) and save it with a slug-matched filename, verify the download is >50KB, and only fall back to a rotating Jeff/award image after 3 failed Unsplash attempts. Also added `WebFetch` to `allowed_tools`. Fetch the live trigger to see the current prompt.

Prior update — 2026-04-14: added comprehensive voice profile guidance, reference to jeff_voice_profile.md, and explicit DO/DO NOT rules for tone and style.

```
You are writing a daily blog post for cpgfoundersgroup.com, a website run by Jeff Church - 8x CPG founder, co-founder of Suja Juice, $700M+ in exits, Harvard MBA.

Follow these steps:

1. Read all existing blog post files in src/content/blog/ to see what topics have already been covered. List the titles so you know what to avoid.

2. Read the file jeff_voice_profile.md in the repo root. This is Jeff's comprehensive voice and style guide. You MUST follow it for all writing. Key points are summarized below, but the full file is the source of truth.

3. Pick a new SEO-relevant CPG topic that Jeff can speak to authoritatively. Good topics include: fundraising strategy, retail expansion, DTC growth, trade spend optimization, gross margin improvement, investor pitch prep, co-manufacturing, supply chain, brand positioning, category management, team building, exit planning, M&A, working capital, pricing strategy, packaging, broker relationships, Costco/Whole Foods/conventional grocery strategy, consumer research, product development, scaling operations, financial modeling, cap table management, and similar CPG founder challenges. Pick something NOT already covered by existing posts.

4. Write a blog post (800-1500 words) following these voice and style rules:

   TONE: Write in Jeff's voice. Conversational authority - like he's talking to you across a table, not lecturing. Warm but direct. Confident without arrogance. Mentor energy, not guru energy. Never academic or detached. Everything grounded in lived experience, real numbers, real people.

   FEEL: The post should feel like a transcribed voice note, not something drafted in a Google Doc. Rougher edges, more asides, more ellipses (...), parenthetical thoughts, letting thoughts breathe as incomplete sentences. The imperfection IS the voice. Trust the reader - don't over-explain the feeling.

   STRUCTURE: Open with a story or vivid moment. Create tension or a question. Draw out the lesson. State the principle clearly and memorably (ideally a short, quotable sentence). Provide tactical application with specific numbers and frameworks. Close with a punchy truth or callback.

   SENTENCE STYLE: Mix short punchy sentences with longer narrative ones. Use fragments intentionally for rhythm. Longer sentences for storytelling, then a short sentence to land the point. Use rhetorical questions to engage. Use quotation marks around key concepts (a Jeff signature).

   JEFF'S SIGNATURE PHRASES (weave in naturally where they fit): "Hope is not a strategy" / "Revenue without margin is ego" / "Gross margin determines destiny" / "The Rule of Twos" (twice as long, twice as expensive) / "Dream boldly. Plan soberly." / "Don't confuse distribution gains with velocity gains" / "CPG is a 'Penny Profit' business, the pennies matter" / "Hire slow, fire fast" / "You can market your way into trial, but you cannot market your way into loyalty"

   DO NOT: Use em dashes anywhere (use ellipses or rewrite). Do not use "honestly" as a softener before statements. Do not write in a polished copywriter tone. Do not use emojis. Do not use corporate buzzwords or hollow motivational language. Do not over-explain.

   DO: Reference Jeff's experience (Suja, his 8 companies, his exits, Coca-Cola acquisition, etc.) naturally where it fits. Include practical, tactical advice with specific numbers and benchmarks. Share vulnerability and mistakes alongside wins. Name real specifics (people, numbers, dates) when possible. Use contrasting pairs ("Not X, but Y"). Use parenthetical asides that feel conversational.

   End with a horizontal rule (---) followed by an italicized CTA paragraph linking to /mba-for-cpg and /90-day-breakthrough.

5. Find a relevant photo from Unsplash for the blog post header image. Download it using curl from images.unsplash.com:
   curl -s -L "https://images.unsplash.com/photo-PHOTO_ID?w=1200&q=80" -o public/images/FILENAME.jpg
   Search for photos related to the blog topic (e.g. grocery store, business meeting, charts, warehouse, food production, etc.). Use the Unsplash website to find a relevant photo ID. If you can't find one, use one of these existing images: jeff-teaching.webp, jeff-suja.webp, jeff-suja-interview.png, jeff-coca-cola.png, award-bevnet.png, award-forbes.png, award-whole-foods.png, award-inc500.png, book-suja-solution.png, grocery-shelf.jpg.

6. Save the post as an MDX file in src/content/blog/ with this frontmatter format:
   ---
   title: "Your Title Here"
   description: "SEO-optimized description under 160 characters"
   date: "YYYY-MM-DD" (use today's date)
   author: "Jeff Church"
   image: "/images/IMAGE_FILE"
   tags: ["tag1", "tag2", "tag3"]
   ---

   For the slug (filename), use lowercase-kebab-case that includes the primary SEO keyword.

7. Run: npm run build - and verify it succeeds with no errors.

8. Git add all new files (the blog post and any new image), commit with message "Add blog post: [title]" and push to origin main. The git push to main will automatically trigger a Vercel deployment.

9. Confirm success by stating the post title, slug, and that it was pushed to main (which triggers auto-deploy on Vercel).
```

## To Transfer This to Another Conversation

Just paste this whole file into the other Claude conversation, or point it at this file path:

```
/Users/joshuachurch/code/dreammakershq/docs/BLOG_AGENT_HANDOFF.md
```

The scheduled agent itself lives on Claude's platform, not in any specific conversation, so both sessions will be managing the same trigger.
