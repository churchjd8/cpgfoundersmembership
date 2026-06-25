// Jeff's coaching-call availability, organized by month.
//
// HOW THIS WORKS
// --------------
// Each month has its own booking link (e.g. /clients/schedule-session/august).
// Within a month, every entry below is one bookable 1-hour 1:1 slot, authored
// in PACIFIC time. The booking page renders each slot in the visitor's own
// timezone. Past slots auto-hide, and any slot someone books disappears for the
// next visitor (tracked in Supabase).
//
// TO ADD A MONTH'S TIMES: find the month in SESSION_MONTHS and edit its `slots`
// array. One line per slot:
//   { date: "2026-08-18", time: "09:00" }   // 9:00 AM Pacific
// Only list times Jeff is OPEN. When a slot fills (or Jeff cancels), delete the
// line. Calls run 1 hour; Jeff is fine going back-to-back. An empty `slots`
// array just shows "no times available yet" on that month's page.
//
// DAYLIGHT SAVING: July–Oct are PDT (UTC-07:00). PST (-08:00) begins Nov 1, 2026
// — if you add November+ dates, flag it and we'll switch the offset.

const PACIFIC_OFFSET = "-07:00"; // PDT
const CALL_MINUTES = 60;

export type SlotInput = {
  /** Pacific calendar date, YYYY-MM-DD */
  date: string;
  /** Start time, 24h "HH:MM" Pacific */
  time: string;
};

export type SessionMonth = {
  /** URL slug, e.g. "august" -> /clients/schedule-session/august */
  key: string;
  /** Display label, e.g. "August" */
  label: string;
  slots: SlotInput[];
};

// ┌─────────────────────────────────────────────────────────────┐
// │  Jeff's open 1:1 blocks by month (Pacific). Add/remove lines  │
// │  as availability changes. Source: Jeff's monthly date drops.  │
// └─────────────────────────────────────────────────────────────┘
export const SESSION_MONTHS: SessionMonth[] = [
  {
    key: "july",
    label: "July",
    slots: [
      { date: "2026-06-29", time: "15:00" }, // Mon 3:00 PM
      { date: "2026-06-30", time: "08:00" }, // Tue 8:00 AM
      { date: "2026-06-30", time: "09:00" }, // Tue 9:00 AM
      { date: "2026-07-02", time: "12:00" }, // Thu 12:00 PM
      { date: "2026-07-02", time: "14:00" }, // Thu 2:00 PM
      { date: "2026-07-09", time: "09:00" }, // Thu 9:00 AM (only opening left on Jul 9)
      { date: "2026-07-13", time: "09:00" }, // Mon 9:00 AM
      { date: "2026-07-13", time: "15:00" }, // Mon 3:00 PM
      { date: "2026-07-14", time: "08:00" }, // Tue 8:00 AM
      { date: "2026-07-14", time: "10:00" }, // Tue 10:00 AM
      { date: "2026-07-15", time: "08:00" }, // Wed 8:00 AM
      { date: "2026-07-15", time: "10:00" }, // Wed 10:00 AM
      { date: "2026-07-15", time: "12:00" }, // Wed 12:00 PM
    ],
  },
  {
    key: "august",
    label: "August",
    // Jeff is back from East Coast travel mid-August, so August calls land
    // later in the month. PASTE AUGUST DATES HERE when Jeff sends them.
    slots: [],
  },
];

export type Slot = {
  /** Stable id == the slot's absolute start instant, ISO 8601 with offset */
  id: string;
  /** Same as id; the absolute start instant */
  startIso: string;
  /** Minutes the call runs */
  durationMinutes: number;
};

function toSlots(inputs: SlotInput[]): Slot[] {
  return inputs
    .map((s) => {
      const startIso = `${s.date}T${s.time}:00${PACIFIC_OFFSET}`;
      return { id: startIso, startIso, durationMinutes: CALL_MINUTES };
    })
    .sort((a, b) => a.startIso.localeCompare(b.startIso));
}

/** Look up a month by its URL key. */
export function getMonth(key: string): SessionMonth | null {
  return SESSION_MONTHS.find((m) => m.key === key) ?? null;
}

/** All slots for one month, sorted. */
export function generateSlots(monthKey: string): Slot[] {
  const m = getMonth(monthKey);
  return m ? toSlots(m.slots) : [];
}

/** A month's slots whose start is still in the future. */
export function upcomingSlots(monthKey: string, now: Date = new Date()): Slot[] {
  return generateSlots(monthKey).filter((s) => new Date(s.startIso).getTime() > now.getTime());
}

/** Find a single slot across every month (for booking validation). */
export function findSlot(
  slotId: string,
  now: Date = new Date(),
): { slot: Slot; month: SessionMonth } | null {
  for (const m of SESSION_MONTHS) {
    const slot = toSlots(m.slots).find(
      (s) => s.id === slotId && new Date(s.startIso).getTime() > now.getTime(),
    );
    if (slot) return { slot, month: m };
  }
  return null;
}

/** Months that currently have at least one upcoming slot (for the chooser). */
export function openMonths(now: Date = new Date()): { key: string; label: string; count: number }[] {
  return SESSION_MONTHS.map((m) => ({
    key: m.key,
    label: m.label,
    count: upcomingSlots(m.key, now).length,
  })).filter((m) => m.count > 0);
}
