import assert from "node:assert/strict";
import { test } from "node:test";
import { vendorCrm, validateCrmUpdate, updateVendorCrm } from "./cpg-match-crm";
const update = {
  version: 0,
  status: "Reviewing",
  owner: " Nina ",
  nextAction: "Verify review",
  followUpDate: "2026-10-01",
  note: "Called the founder.",
};

test("legacy nominations begin as New with no fabricated history", () => {
  assert.deepEqual(vendorCrm({}), {
    status: "New",
    owner: "",
    nextAction: "",
    followUpDate: "",
    updatedAt: "",
    activity: [],
  });
});
test("rejects invalid dates, statuses, versions and oversized notes", () => {
  assert.equal(validateCrmUpdate(update), null);
  for (const patch of [
    { status: "Published" },
    { version: -1 },
    { version: 1.5 },
    { followUpDate: "2026-02-30" },
    { followUpDate: "2026-99-01" },
    { note: "x".repeat(4001) },
    { owner: null },
  ])
    assert.ok(validateCrmUpdate({ ...update, ...patch }));
});
test("notes and workflow changes preserve existing history without mutating it", () => {
  const old = vendorCrm({
    activity: [{ at: "2026-09-28T00:00:00Z", text: "Original note" }],
  });
  const next = updateVendorCrm(old, update, "2026-09-29T00:00:00Z");
  assert.equal(next.owner, "Nina");
  assert.equal(next.activity.length, 3);
  assert.equal(next.activity[0].text, "Called the founder.");
  assert.match(next.activity[1].text, /New → Reviewing/);
  assert.equal(next.activity[2].text, "Original note");
  assert.equal(old.activity.length, 1);
  const cleared = updateVendorCrm(
    next,
    { ...update, owner: "", nextAction: "", followUpDate: "", note: "" },
    "2026-09-30T00:00:00Z",
  );
  assert.equal(cleared.activity.length, 4);
  assert.match(cleared.activity[0].text, /Follow-up date: Cleared/);
});
