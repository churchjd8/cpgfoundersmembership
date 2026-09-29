export const CRM_STATUSES = [
  "New",
  "Reviewing",
  "Contacted",
  "Follow-up needed",
  "Approved",
  "Archived",
] as const;
export type CrmStatus = (typeof CRM_STATUSES)[number];
export type CrmActivity = { at: string; text: string };
export type VendorCrm = {
  status: CrmStatus;
  owner: string;
  nextAction: string;
  followUpDate: string;
  updatedAt: string;
  activity: CrmActivity[];
};
export function vendorCrm(value?: Partial<VendorCrm> | null): VendorCrm {
  return {
    status: "New",
    owner: "",
    nextAction: "",
    followUpDate: "",
    updatedAt: "",
    activity: [],
    ...value,
  };
}

export function validateCrmUpdate(
  body: Record<string, unknown>,
): string | null {
  if (!Number.isSafeInteger(body.version) || Number(body.version) < 0)
    return "Invalid record version.";
  if (!CRM_STATUSES.includes(body.status as CrmStatus))
    return "Choose a valid status.";
  for (const [field, limit] of [
    ["owner", 120],
    ["nextAction", 500],
    ["note", 4000],
    ["followUpDate", 10],
  ] as const) {
    if (typeof body[field] !== "string" || body[field].length > limit)
      return `Invalid ${field}.`;
  }
  if (
    body.followUpDate &&
    (!/^\d{4}-\d{2}-\d{2}$/.test(String(body.followUpDate)) ||
      !Number.isFinite(Date.parse(`${body.followUpDate}T00:00:00Z`)) ||
      new Date(`${body.followUpDate}T00:00:00Z`).toISOString().slice(0, 10) !==
        body.followUpDate)
  )
    return "Choose a valid follow-up date.";
  return null;
}

export function updateVendorCrm(
  previous: VendorCrm,
  body: Record<string, unknown>,
  at: string,
): VendorCrm {
  const next = {
    ...previous,
    status: body.status as CrmStatus,
    owner: String(body.owner).trim(),
    nextAction: String(body.nextAction).trim(),
    followUpDate: String(body.followUpDate),
    updatedAt: at,
  };
  const changes: string[] = [];
  if (next.status !== previous.status)
    changes.push(`Status: ${previous.status} → ${next.status}`);
  if (next.owner !== previous.owner)
    changes.push(`Owner: ${next.owner || "Unassigned"}`);
  if (next.nextAction !== previous.nextAction)
    changes.push(`Next action: ${next.nextAction || "Cleared"}`);
  if (next.followUpDate !== previous.followUpDate)
    changes.push(`Follow-up date: ${next.followUpDate || "Cleared"}`);
  const note = String(body.note).trim();
  next.activity = [
    ...(note ? [{ at, text: note }] : []),
    ...(changes.length ? [{ at, text: changes.join("\n") }] : []),
    ...previous.activity,
  ];
  return next;
}
