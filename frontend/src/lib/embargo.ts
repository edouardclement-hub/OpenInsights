/**
 * The EPM assessments embargo.
 *
 * One instant, shared by everything that has to respect it: the middleware gate
 * on /assessments, the featured row on the homepage, and the sitemap. Keeping a
 * single source avoids the two drifting apart and re-opening the hole where the
 * assessments pages were gated while the homepage still showed the card.
 *
 * The offset is written into the string rather than inferred from the runtime,
 * because this is evaluated on edge nodes and build machines running in UTC:
 *
 *   2026-11-25T09:00:00-05:00   (Wed Nov 25, 2026, 9:00 AM EST)
 *   === 2026-11-25T14:00:00Z
 */
export const EMBARGO_LIFTS_AT = Date.parse("2026-11-25T09:00:00-05:00");

/**
 * True while the embargo holds, false from the lift instant onwards.
 *
 * Pages that call this are ISR-cached, so a cached render can lag the lift by
 * up to its `revalidate` window (60s on the homepage and the sitemap). The
 * middleware gate has no such lag — it runs per request.
 */
export function isEmbargoed(now: number = Date.now()): boolean {
  return now < EMBARGO_LIFTS_AT;
}
