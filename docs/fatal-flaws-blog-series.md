# Fatal Flaws: five-day blog series

Requested by Joshua September 16, 2026. One article per day, September 17–21,
at 9 AM America/Los_Angeles (16:00 UTC). This schedule includes the weekend.

| Release | Article | Slug |
| --- | --- | --- |
| September 17 | The Contract Deadline That Matters More Than Your Renewal Date | cpg-contract-renewal-deadline-checklist |
| September 18 | Could You Take Your Formula to a New Co-Manufacturer Tomorrow? | cpg-formula-ownership-co-manufacturer-exit |
| September 19 | Before You Say Yes to 500 More Stores, Pass These Five Checks | cpg-retail-expansion-readiness-checklist |
| September 20 | The Weekly Cash Review That Finds Trouble Before Payroll Does | cpg-weekly-cash-review-13-week-forecast |
| September 21 | The Cheapest Supplier Quote Can Tie Up the Most Cash | cpg-supplier-quotes-total-cost-checklist |

## Release mechanism

The MDX files ship with the site deployment. `publishAt` controls public
visibility, including listings, article lookups, and article metadata. The
blog index, article pages, and resources page render at request time, so no
cron job, rebuild, or manual action is needed to release each article.
Unscheduled legacy articles retain their prior visibility. Invalid schedule
timestamps are not published. To reschedule, edit both `date` and `publishAt`
and deploy. Do not remove `publishAt` from a future article: that publishes it.

The existing weekday Claude blog task is documented in `BLOG_AGENT_HANDOFF.md`.
Its external trigger was not changed. Repository `AGENTS.md` now tells routine
daily publishing agents to skip dates already filled by scheduled articles.

## Editorial basis

- Workshop handout: `Fatal Flaws and Fatal Mistakes Webinar 9.16.26.pdf`.
- Voice: `jeff_voice_profile.md`, `Jeff Church Voice Profile.md`, and the blog
  examples on legal flaws, operations, working capital, and retail sequencing.
- Documented personal examples: Rowdy/Albertsons in
  `cpg-distribution-sequencing-strategy.mdx`; Suja/Todd Fisher/weekly cash
  projections in `cpg-working-capital-cash-flow-management.mdx` and
  `src/content/knowledge/cpt-part2-scaling.md`.
- Contract and formula opening situations are explicitly hypothetical.
- Financial examples are illustrative, with arithmetic checked. Unsupported
  handout statistics were not repeated as established findings.
- Primary external references are linked beside the applicable statements:
  New York Senate, USPTO, SBA, and Walmart supplier requirements.
- Each article has a distinct Pexels hero photo, recorded in
  `src/content/blog-image-credits.json`.
- Each article ends with a relevant Babu trial/workshop CTA for this series.

## Validation

Run `npx tsx --test src/lib/blog.test.ts` for release-boundary and legacy-post
checks. Also run lint on the modified TypeScript files and `npm run build`.
The production deployment should serve existing posts while future article
URLs and their contents remain unavailable before their timestamps.
