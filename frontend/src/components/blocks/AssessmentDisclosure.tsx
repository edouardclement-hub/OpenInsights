"use client";

import { useRef, useState } from "react";

/**
 * Collapsible block for the long-form intake sections (F22 methodology summary,
 * F23 assumptions summary). Follows the same open/close pattern as FaqAccordion.
 *
 * Body text is plain text from Strapi. Two conventions are honoured:
 *   "## Heading"  -> sub-heading within the block
 *   blank line    -> paragraph break
 *
 * `children` render after the body, for blocks the template owns rather than
 * the CMS (the "What we measure" and "Data and code" blocks, and the closing
 * links on every Methodology summary).
 *
 * An open block ends with a Close control. Collapsing from the bottom of a long
 * block would otherwise leave the reader somewhere further down the page, so it
 * returns them to the block's own heading.
 */
export function AssessmentDisclosure({
  title,
  openTitle,
  body,
  intro,
  children,
  defaultOpen = false,
}: {
  title: string;
  /** Trigger label while open, when it differs from the closed one. */
  openTitle?: string;
  body?: string;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Collapse, then put the heading back under the reader's eye. The scroll
  // waits a frame so it is measured against the collapsed layout, and focus
  // moves without a second, competing scroll.
  const closeFromBottom = () => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        triggerRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
      });
    });
  };

  const blocks = (body || "")
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className={`disclosure${open ? " open" : ""}`}>
      <button
        ref={triggerRef}
        type="button"
        className="disclosure-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {open && openTitle ? openTitle : title}
        <svg className="disclosure-chevron" viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="disclosure-body">
        <div className="disclosure-body-inner">
          {intro}
          {blocks.map((block, i) =>
            block.startsWith("## ") ? (
              <h4 key={i} className="disclosure-heading">
                {block.slice(3)}
              </h4>
            ) : (
              <p key={i}>{block}</p>
            )
          )}
          {children}
          <div className="disclosure-close-row">
            <button
              type="button"
              className="disclosure-close"
              onClick={closeFromBottom}
              // Kept out of the tab order while collapsed: the body is hidden,
              // so its controls should not be reachable.
              tabIndex={open ? 0 : -1}
              aria-hidden={!open}
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" aria-hidden="true">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              Close {title.toLowerCase()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
