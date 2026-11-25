"use client";

import { useEffect, useRef } from "react";

/**
 * The Quick facts panel, which scrubs its own scroll position from where the
 * pointer sits inside it: near the top shows the top of the panel, near the
 * bottom shows the foot, so the content below the fold announces itself the
 * moment the pointer arrives.
 *
 * Deliberately narrow in scope, because content that moves on hover is easy to
 * get wrong:
 *   - pinned layouts only (>= 901px), and only when the panel actually overflows
 *   - mouse-like pointers only, never touch
 *   - off under prefers-reduced-motion, where the panel scrolls normally
 *   - frozen while the pointer is over a link or button, so the controls at the
 *     foot hold still long enough to be clicked
 */
const MIN_WIDTH = 901;
/** Share of the panel at each end that maps to the very top or very bottom. */
const DEAD_ZONE = 0.12;
/** Share of the remaining distance covered per frame. */
const EASING = 0.18;

export function HoverScrollAside({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let target = el.scrollTop;
    let frame = 0;
    let scrubbing = false;

    const step = () => {
      const distance = target - el.scrollTop;
      if (Math.abs(distance) < 0.5) {
        el.scrollTop = target;
        frame = 0;
        return;
      }
      el.scrollTop += distance * EASING;
      frame = requestAnimationFrame(step);
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const enabled = () =>
      fine.matches && !reduced.matches && window.innerWidth >= MIN_WIDTH;

    const onEnter = () => {
      scrubbing = enabled();
      target = el.scrollTop;
    };

    const onLeave = () => {
      scrubbing = false;
      stop();
    };

    const onMove = (e: PointerEvent) => {
      if (!scrubbing) return;
      // Hold position over anything clickable, so it can be hit.
      if ((e.target as Element | null)?.closest("a, button, input, select, textarea")) {
        target = el.scrollTop;
        stop();
        return;
      }
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      const box = el.getBoundingClientRect();
      const ratio = (e.clientY - box.top) / box.height;
      const scaled = (ratio - DEAD_ZONE) / (1 - DEAD_ZONE * 2);
      target = Math.min(1, Math.max(0, scaled)) * max;
      if (!frame) frame = requestAnimationFrame(step);
    };

    // A wheel or trackpad scroll wins: take its position as the new target
    // rather than dragging the panel back under the pointer.
    const onWheel = () => {
      stop();
      target = el.scrollTop;
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("wheel", onWheel);
      stop();
    };
  }, []);

  return (
    <aside ref={ref} className={className}>
      {children}
    </aside>
  );
}
