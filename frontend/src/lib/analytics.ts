/**
 * Thin, dependency-free analytics shim.
 *
 * The site does not ship an analytics tag today. This records events against
 * whichever tag is present at runtime (gtag or a GTM dataLayer) and is a no-op
 * when neither is, so adding a tag later starts collecting these events with no
 * further code change.
 */
type EventParams = Record<string, string | number | boolean | undefined>;

type GtagWindow = Window & {
  gtag?: (command: "event", name: string, params?: EventParams) => void;
  dataLayer?: Array<Record<string, unknown>>;
};

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  try {
    w.gtag?.("event", name, params);
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: name, ...params });
    }
  } catch {
    // Analytics must never break an interaction.
  }
}
