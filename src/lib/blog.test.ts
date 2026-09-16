import assert from "node:assert/strict";
import { test } from "node:test";
import { getAllPosts, getPostBySlug } from "./blog";

const scheduled = [
  ["cpg-contract-renewal-deadline-checklist", "2026-09-17T09:00:00-07:00"],
  ["cpg-formula-ownership-co-manufacturer-exit", "2026-09-18T09:00:00-07:00"],
  ["cpg-retail-expansion-readiness-checklist", "2026-09-19T09:00:00-07:00"],
  ["cpg-weekly-cash-review-13-week-forecast", "2026-09-20T09:00:00-07:00"],
  ["cpg-supplier-quotes-total-cost-checklist", "2026-09-21T09:00:00-07:00"],
];

test("each article becomes visible in listings and direct lookups at its Pacific release time", () => {
  scheduled.forEach(([slug, timestamp], index) => {
    const release = Date.parse(timestamp);
    assert.equal(new Date(release).getUTCHours(), 16);
    assert.equal(getPostBySlug(slug, release - 1), undefined);
    assert.ok(!getAllPosts(release - 1).some((post) => post.slug === slug));
    assert.equal(getPostBySlug(slug, release)?.slug, slug);
    const visible = getAllPosts(release);
    assert.ok(visible.some((post) => post.slug === slug));
    assert.equal(visible.filter((post) => scheduled.some(([name]) => name === post.slug)).length, index + 1);
  });
});

test("existing posts remain accessible and unknown slugs remain absent", () => {
  const beforeSeries = Date.parse("2026-09-16T00:00:00Z");
  assert.ok(getPostBySlug("cpg-legal-fatal-flaws", beforeSeries));
  assert.equal(getPostBySlug("not-a-real-post", beforeSeries), undefined);
  assert.equal(getAllPosts(beforeSeries).filter((post) => post.publishAt).length, 0);
});
