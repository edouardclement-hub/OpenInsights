import baseline2026_11 from "@/content/baselines/2026-11.json";

/**
 * Baseline versions.
 *
 * One JSON file per version under `src/content/baselines/`, named for its id
 * (`2026-11.json`). To publish a new version: add the file, then add one import
 * and one entry to BASELINE_FILES below. Nothing else needs touching.
 *
 * Which version is "Current" is never set by hand. BASELINES is sorted by id,
 * newest first, and the first entry is the current one. Once a version is
 * published its file should not change, except to add a dated correction note.
 */

export type BaselinePolicy = {
  /** Policy name, as it is known publicly. */
  name: string;
  /** Federal, or the province or territory. */
  jurisdiction: string;
  /** When the measure came into force. */
  inForceSince: string;
  /** How the measure is represented in the models. */
  representedAs: string;
};

export type BaselineChanges = {
  added: string[];
  removed: string[];
  changed: string[];
};

export type Baseline = {
  /** "2026-11". Sorts correctly as a string, which is how Current is decided. */
  id: string;
  /** "Baseline: November 2026". The label shown everywhere on the site. */
  label: string;
  /** ISO date the Baseline was set. */
  dateSet: string;
  /** One line on what changed in this version. */
  headline: string;
  changes: BaselineChanges;
  policies: BaselinePolicy[];
  /** Empty until Zenodo issues one. The page shows a placeholder while empty. */
  zenodoDoi: string;
  /** Empty until a PDF exists. The Download PDF button is hidden while empty. */
  pdfUrl: string;
  /**
   * Dated correction note, added after publication if something needs fixing.
   * The only edit a published version should receive.
   */
  correction?: { date: string; note: string };
};

const BASELINE_FILES: Baseline[] = [baseline2026_11];

/** Every Baseline version, newest first. */
export const BASELINES: Baseline[] = [...BASELINE_FILES].sort((a, b) =>
  b.id.localeCompare(a.id)
);

/** Every Baseline version, oldest first. Used by the milestone rail. */
export const BASELINES_OLDEST_FIRST: Baseline[] = [...BASELINES].reverse();

/** The newest version. This is the one marked "Current". */
export function getCurrentBaseline(): Baseline {
  return BASELINES[0];
}

export function getBaseline(id: string): Baseline | null {
  return BASELINES.find((b) => b.id === id) ?? null;
}

export function isCurrentBaseline(id: string): boolean {
  return BASELINES[0]?.id === id;
}

/**
 * The milestone rail and the "View all past Baselines" control only make sense
 * once there is something to compare. Both are hidden entirely until then.
 */
export function hasMultipleBaselines(): boolean {
  return BASELINES.length > 1;
}

export function baselinePath(id: string): string {
  return `/methodology/baseline/${id}`;
}

const SHORT_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2026-11" -> "Nov 2026", for the milestone rail. */
export function baselineShortLabel(id: string): string {
  const [year, month] = id.split("-");
  const name = SHORT_MONTHS[Number(month) - 1];
  return name ? `${name} ${year}` : id;
}

/**
 * Slugs whose Baseline version is known here rather than in Strapi.
 *
 * `baselineVersion` is a new field on the assessment content type. Until the
 * CMS instance holding the live records has been redeployed with it, records
 * come back without the field, and these entries stand in. An assessment that
 * carries the field always wins, so this map can be emptied once every live
 * record has one.
 */
const BASELINE_VERSION_FALLBACK: Record<string, string> = {
  "powering-canada-strong-financing-the-build": "2026-11",
};

/**
 * The Baseline version an assessment was run against, or null if it records
 * none. Returns the id only when a version page for it actually exists.
 */
export function assessmentBaselineId(a: {
  slug: string;
  baselineVersion?: string | null;
}): string | null {
  const id = a.baselineVersion || BASELINE_VERSION_FALLBACK[a.slug] || null;
  return id && getBaseline(id) ? id : null;
}

/** "2026-11" -> "November 2026", for breadcrumbs and banner text. */
export function baselineMonthYear(id: string): string {
  const label = getBaseline(id)?.label;
  if (label?.startsWith("Baseline: ")) return label.slice("Baseline: ".length);
  return baselineShortLabel(id);
}
