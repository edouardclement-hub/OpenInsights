"use client";

import { useState } from "react";

export function CopyCitation({
  citation,
  label = "Copy citation",
  className = "btn-copy-cite",
}: {
  citation: string;
  /** Trigger text. The Baseline sidebar uses "Cite this Baseline". */
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <button className={className} onClick={onCopy} type="button">
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      {copied ? "Copied!" : label}
    </button>
  );
}
