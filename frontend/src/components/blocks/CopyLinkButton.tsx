"use client";

import { useState } from "react";

/**
 * Small link-icon button that copies the full URL of a section or a page.
 *
 * `target` is whatever an anchor would carry: "#baseline" for a section on the
 * current page, or "/methodology/baseline/2026-11" for another page. It is
 * resolved against the current location, so what lands on the clipboard is the
 * absolute URL, for example
 * https://epm.openinsights.ca/methodology#baseline
 */
export function CopyLinkButton({
  target,
  label = "Copy link to this section",
  variant = "icon",
  text = "Copy link",
}: {
  target: string;
  label?: string;
  /** "icon" sits beside a heading; "button" is the sidebar's labelled button. */
  variant?: "icon" | "button";
  /** Trigger text for the "button" variant. */
  text?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    const url =
      typeof window === "undefined"
        ? target
        : new URL(target, window.location.href).toString();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, or permission denied).
    }
  }

  if (variant === "button") {
    return (
      <button type="button" className="baseline-btn" onClick={onCopy} aria-label={label}>
        {copied ? "Link copied" : text}
      </button>
    );
  }

  return (
    <span className="copy-link">
      <button
        type="button"
        className="copy-link-btn"
        onClick={onCopy}
        aria-label={label}
        title={label}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
          <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
        </svg>
      </button>
      <span className="copy-link-flash" role="status" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </span>
  );
}
