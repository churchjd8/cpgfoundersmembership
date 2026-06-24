// Jeff's coaching-call availability.
//
// HOW THIS WORKS
// --------------
// Each entry below is one bookable 1-hour call slot, authored in PACIFIC time.
// The booking page renders every slot in the visitor's own timezone; this file
// is always written in Pacific. Past slots auto-hide, and any slot someone books
// disappears for the next visitor (tracked in Supabase).
//
// TO ADD / EDIT / REMOVE TIMES: just edit the SLOTS array below.
//   { date: "2026-06-29", time: "15:00" }   // Monday 3:00 PM Pacific
// Only list times Jeff is OPEN. When a slot fills (or Jeff cancels it), delete
// the line. Calls run 1 hour; Jeff is fine going back-to-back.
//
// DAYLIGHT SAVING: these dates are all in PDT (UTC-07:00). PST (-08:00) begins
// Nov 1, 2026 — if you add dates past then, flag it and we'll switch the offset.

const PACIFIC_OFFSET = "-07:00"; // PDT
const CALL_MINUTES = 60;

export type SlotInput = {
  /** Pacific calendar date, YYYY-MM-DD */
  date: string;
  /** Start time, 24h "HH:MM" Pacific */
  time: string;
};

// ┌─────────────────────────────────────────────────────────────┐
// │  Jeff's open coaching blocks (Pacific). Source: Coaching       │
// │  Blocks.xlsx. Already-booked blocks (Jerome 7/1, Erin 7/1,     │
// │  Zayed 7/10) are intentionally omitted.                        │
// └─────────────────────────────────────────────────────────────┘
export const SLOTS: SlotInput[] = [
  { date: "2026-06-29", time: "15:00" }, // Mon 3:00 PM
  { date: "2026-06-30", time: "08:00" }, // Tue 8:00 AM
  { date: "2026-06-30", time: "09:00" }, // Tue 9:00 AM
  { date: "2026-07-02", time: "12:00" }, // Thu 12:00 PM
  { date: "2026-07-02", time: "14:00" }, // Thu 2:00 PM
  { date: "2026-07-09", time: "09:00" }, // Thu 9:00 AM
  { date: "2026-07-09", time: "12:00" }, // Thu 12:00 PM
  { date: "2026-07-09", time: "14:00" }, // Thu 2:00 PM
  { date: "2026-07-13", time: "09:00" }, // Mon 9:00 AM
  { date: "2026-07-13", time: "15:00" }, // Mon 3:00 PM
  { date: "2026-07-14", time: "08:00" }, // Tue 8:00 AM
  { date: "2026-07-14", time: "10:00" }, // Tue 10:00 AM
  { date: "2026-07-15", time: "08:00" }, // Wed 8:00 AM
  { date: "2026-07-15", time: "10:00" }, // Wed 10:00 AM
  { date: "2026-07-15", time: "12:00" }, // Wed 12:00 PM
];

export type Slot = {
  /** Stable id == the slot's absolute start instant, ISO 8601 with offset */
  id: string;
  /** Same as id; the absolute start instant */
  startIso: string;
  /** Minutes the call runs */
  durationMinutes: number;
};

/** All slots as concrete, sorted instants. */
export function generateSlots(inputs: SlotInput[] = SLOTS): Slot[] {
  return inputs
    .map((s) => {
      const startIso = `${s.date}T${s.time}:00${PACIFIC_OFFSET}`;
      return { id: startIso, startIso, durationMinutes: CALL_MINUTES };
    })
    .sort((a, b) => a.startIso.localeCompare(b.startIso));
}

/** Slots whose start is still in the future relative to `now`. */
export function upcomingSlots(now: Date = new Date(), inputs?: SlotInput[]): Slot[] {
  return generateSlots(inputs).filter((s) => new Date(s.startIso).getTime() > now.getTime());
}
