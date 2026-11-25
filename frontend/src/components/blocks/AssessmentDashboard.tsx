"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Embedded IDEA dashboard, shown between the Key findings and the Assumptions
 * summary on an assessment page. Driven by the assessment's own dashboard URL,
 * so any assessment that records one gets this section.
 *
 * The embed is replaced by a plain link in two cases: a viewport narrower than
 * the breakpoint, where the dashboard's own layout does not fit, and an iframe
 * that fails to load.
 */
const MOBILE_BREAKPOINT = 768;

/**
 * The dashboard keeps drawing itself well after the iframe reports `load`, so
 * the frame is blank for a few seconds more. The placeholder holds past that
 * moment rather than handing over to an empty white box.
 */
const SETTLE_MS = 6000;
/** After this long, say so, rather than leaving a spinner turning in silence. */
const SLOW_MS = 10000;

/** Shared by the inline embed and the full-screen view. */
function DashboardFrame({
  url,
  title,
  onFail,
}: {
  url: string;
  title: string;
  onFail: () => void;
}) {
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);
  const settle = useRef<number | undefined>(undefined);

  useEffect(() => {
    const timer = window.setTimeout(() => setSlow(true), SLOW_MS);
    return () => {
      window.clearTimeout(timer);
      if (settle.current) window.clearTimeout(settle.current);
    };
  }, []);

  return (
    <>
      {!ready && (
        <div className="dashboard-placeholder" role="status" aria-live="polite">
          <span className="dashboard-spinner" aria-hidden="true" />
          <span>Loading the interactive dashboard…</span>
          {slow && (
            <span className="dashboard-placeholder-slow">
              It is a large dashboard and can take a few moments.
            </span>
          )}
        </div>
      )}
      <iframe
        src={url}
        title={title}
        loading="lazy"
        onLoad={() => {
          settle.current = window.setTimeout(() => setReady(true), SETTLE_MS);
        }}
        onError={onFail}
      />
    </>
  );
}

export function AssessmentDashboard({
  url,
  heading = "Explore the interactive results (IDEA)",
  embedTitle = "Interactive dashboard: PCS assessment results",
  linkText = "Open the dashboard in a new tab",
  /** CSS length. Tall enough to read the charts, short enough not to take the page over. */
  height = "min(70vh, 640px)",
  intro,
  note,
}: {
  url: string;
  heading?: string;
  embedTitle?: string;
  linkText?: string;
  height?: string;
  intro?: string;
  note?: string;
}) {
  // Undefined until measured, so the server render and the first client render
  // agree and neither the embed nor the link flashes in the wrong place.
  const [isNarrow, setIsNarrow] = useState<boolean | undefined>(undefined);
  const [failed, setFailed] = useState(false);
  const [full, setFull] = useState(false);

  const closeRef = useRef<HTMLButtonElement>(null);
  const expandRef = useRef<HTMLButtonElement>(null);
  const hasOpened = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const apply = () => setIsNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const close = useCallback(() => setFull(false), []);

  // Escape leaves full screen; the background stays put while it is open.
  useEffect(() => {
    if (!full) {
      if (hasOpened.current) expandRef.current?.focus();
      return;
    }
    hasOpened.current = true;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [full, close]);

  const onFail = useCallback(() => setFailed(true), []);
  const showEmbed = isNarrow === false && !failed;

  const fallbackLink = (
    <a
      className="dashboard-fallback-link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("dashboard_open_new_tab", { dashboard_url: url })}
    >
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
      <span>{linkText}</span>
    </a>
  );

  return (
    <div className="detail-section dashboard-section">
      <div className="dashboard-head">
        <h2>{heading}</h2>
        {showEmbed && (
          <button
            ref={expandRef}
            type="button"
            className="dashboard-expand"
            onClick={() => {
              setFull(true);
              trackEvent("dashboard_expand", { dashboard_url: url });
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" aria-hidden="true">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
            Expand
          </button>
        )}
      </div>
      {intro && <p className="dashboard-intro">{intro}</p>}
      {showEmbed ? (
        <>
          <div className="dashboard-embed" style={{ height }}>
            <DashboardFrame url={url} title={embedTitle} onFail={onFail} />
          </div>
          <p className="dashboard-embed-link">{fallbackLink}</p>
        </>
      ) : (
        <p className="dashboard-embed-link">{fallbackLink}</p>
      )}
      {note && <p className="dashboard-note">{note}</p>}

      {full && (
        <div
          className="lightbox dashboard-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={embedTitle}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="lightbox-bar">
            <div className="lightbox-caption">
              <strong>{heading}</strong>
            </div>
            <div className="lightbox-bar-actions">
              <a
                className="lightbox-download"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("dashboard_open_new_tab", { dashboard_url: url })}
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <span>Open in a new tab</span>
              </a>
              <button
                ref={closeRef}
                type="button"
                className="lightbox-close"
                onClick={close}
                aria-label="Close full screen (Escape)"
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="dashboard-lightbox-stage">
            <DashboardFrame url={url} title={embedTitle} onFail={onFail} />
          </div>
        </div>
      )}
    </div>
  );
}
