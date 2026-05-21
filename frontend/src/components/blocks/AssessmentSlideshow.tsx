"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import type { AssessmentSlide } from "@/lib/assessment-slides";

export function AssessmentSlideshow({ slides }: { slides: AssessmentSlide[] }) {
  const [i, setI] = useState(0);
  const total = slides.length;
  const prev = useCallback(() => setI((v) => (v - 1 + total) % total), [total]);
  const next = useCallback(() => setI((v) => (v + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const current = slides[i];

  return (
    <div className="slideshow" aria-roledescription="carousel">
      <div className="slideshow-image-wrap">
        <Image
          src={current.image}
          alt={current.title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          style={{ objectFit: "contain" }}
          priority={i === 0}
        />
      </div>
      <div className="slideshow-caption">
        <div className="slideshow-counter">
          Slide {i + 1} / {total}
        </div>
        <div className="slideshow-title">{current.title}</div>
        {current.description && <div className="slideshow-desc">{current.description}</div>}
      </div>
      <div className="slideshow-controls">
        <button onClick={prev} aria-label="Previous slide" className="slideshow-nav">
          ←
        </button>
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
        <button onClick={next} aria-label="Next slide" className="slideshow-nav">
          →
        </button>
      </div>
    </div>
  );
}
