// 1:1 Private Advisory is shown publicly as "starting at" the Private price
// with a 3-month start (homepage ladder, /work-with-jeff, /apply). The VIP
// price is not printed anywhere public: Joshua offers VIP on the intro call to
// brands that need more of Jeff's time. It is kept here for the internal
// application email.
//
// Change a number here and every page moves together.

export const PRIVATE_ADVISORY_PRICE_USD = 1997;
export const VIP_ADVISORY_PRICE_USD = 4997;
export const ADVISORY_MIN_MONTHS = 3;

/** The readiness question on /apply. The value is sent with the application. */
export const READINESS_OPTIONS = [
  { value: "ready", label: "That works for us right now" },
  { value: "soon", label: "Not yet, but likely in the next few months" },
  { value: "session", label: "I’d rather start with a single Strategy Session" },
] as const;
