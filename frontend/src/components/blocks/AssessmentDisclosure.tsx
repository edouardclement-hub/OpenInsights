"use client";

import { useState } from "react";

/**
 * Collapsible block for the long-form intake sections (F22 methodology summary,
 * F23 assumptions summary). Follows the same open/close pattern as FaqAccordion.
 *
 * Body text is plain text from Strapi. Two conventions are honoured:
 *   "## Heading"  -> sub-heading within the block
 *   blank line    -> paragraph break
 */
export function AssessmentDisclosure({
  title,
  body,
  defaultOpen = false,
}: {
  title: string;
  body: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const blocks = body
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className={`disclosure${open ? " open" : ""}`}>
      <button
        type="button"
        className="disclosure-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {title}
        <svg className="disclosure-chevron" viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="disclosure-body">
        <div className="disclosure-body-inner">
          {blocks.map((block, i) =>
            block.startsWith("## ") ? (
              <h4 key={i} className="disclosure-heading">
                {block.slice(3)}
              </h4>
            ) : (
              <p key={i}>{block}</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
