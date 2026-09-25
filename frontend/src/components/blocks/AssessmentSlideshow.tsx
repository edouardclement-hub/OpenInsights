"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { AssessmentSlide } from "@/lib/assessment-slides";

export function AssessmentSlideshow({ slides }: { slides: AssessmentSlide[] }) {
  const [i, setI] = useState(0);
  const [full, setFull] = useState(false);
  const total = slides.length;
  const prev = useCallback(() => setI((v) => (v - 1 + total) % total), [total]);
  const next = useCallback(() => setI((v) => (v + 1) % total), [total]);

  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  // Arrow keys drive the slideshow; Escape leaves full screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape" && full) setFull(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, full]);

  // Lock background scroll while the lightbox is open, and move focus into it.
  // Focus only returns to the opener after a real close: focusing on mount would
  // scroll the slideshow into view and the page would not open at the top.
  const hasOpened = useRef(false);
  useEffect(() => {
    if (!full) {
      if (hasOpened.current) openerRef.current?.focus();
      return;
    }
    hasOpened.current = true;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [full]);

  const current = slides[i];

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  const dots = (
    <div className="slideshow-dots" role="tablist">
      {slides.map((_, idx) => (
        <button
          key={idx}
          role="tab"
          aria-selected={idx === i}
          aria-label={`Go to slide ${idx + 1}`}
          className={idx === i ? "dot active" : "dot"}
          onClick={() => setI(idx)}
        />
      ))}
    </div>
  );

  return (
    <>
      <div className="slideshow" aria-roledescription="carousel">
        <button
          ref={openerRef}
          type="button"
          className="slideshow-image-wrap slideshow-expand-hit"
          onClick={() => setFull(true)}
          aria-label={`Expand slide ${i + 1} of ${total} to full screen`}
          title="Click to expand"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <Image
            src={current.image}
            alt={current.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            style={{ objectFit: "contain" }}
            priority={i === 0}
          />
          <span className="slideshow-expand-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
            Expand
          </span>
        </button>
        <div className="slideshow-controls">
          <button onClick={prev} aria-label="Previous slide" className="slideshow-nav">
            ←
          </button>
          {dots}
          <button onClick={next} aria-label="Next slide" className="slideshow-nav">
            →
          </button>
        </div>
      </div>

      {full && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title}. Slide ${i + 1} of ${total}.`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setFull(false);
          }}
        >
          <div className="lightbox-bar">
            <div className="lightbox-caption">
              <strong>{current.title}</strong>
              <span>
                {i + 1} / {total}
              </span>
            </div>
            <button
              ref={closeRef}
              type="button"
              className="lightbox-close"
              onClick={() => setFull(false)}
              aria-label="Close full screen (Escape)"
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="lightbox-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="lightbox-nav lightbox-nav-prev"
            >
              ←
            </button>
            {/* Deliberately a plain <img>: next/image would serve a downscaled
                render, and full screen needs the original pixels so the small
                axis labels on these charts stay legible. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current.image}
              src={current.image}
              alt={current.title}
              className="lightbox-image"
            />
            <button
              onClick={next}
              aria-label="Next slide"
              className="lightbox-nav lightbox-nav-next"
            >
              →
            </button>
          </div>

          <div className="lightbox-footer">
            {current.description && <p>{current.description}</p>}
            {dots}
          </div>
        </div>
      )}
    </>
  );
}
