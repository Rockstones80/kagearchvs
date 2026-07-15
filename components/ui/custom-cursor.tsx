"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

export default function CustomCursor() {
  const cursorRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Only show on fine-pointer devices (mouse, not touch)
    if (!window.matchMedia("(any-pointer: fine)").matches) return;

    const el = cursorRef.current;
    if (!el) return;

    el.style.opacity = "0";

    const mouse = { x: 0, y: 0 };
    const rendered = {
      tx:      { previous: 0, current: 0, amt: 0.15 },
      ty:      { previous: 0, current: 0, amt: 0.15 },
      scale:   { previous: 1, current: 1, amt: 0.15 },
      opacity: { previous: 1, current: 1, amt: 0.10 },
    };

    let rafId: number;
    let started = false;
    const bounds = el.getBoundingClientRect();

    const render = () => {
      rendered.tx.current = mouse.x - bounds.width / 2;
      rendered.ty.current = mouse.y - bounds.height / 2;

      for (const key in rendered) {
        const r = rendered[key as keyof typeof rendered];
        r.previous = lerp(r.previous, r.current, r.amt);
      }

      el.style.transform = `translateX(${rendered.tx.previous}px) translateY(${rendered.ty.previous}px) scale(${rendered.scale.previous})`;
      el.style.opacity = String(rendered.opacity.previous);
      rafId = requestAnimationFrame(render);
    };

    const onFirstMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      rendered.tx.previous = rendered.tx.current = mouse.x - bounds.width / 2;
      rendered.ty.previous = rendered.ty.current = mouse.y - bounds.height / 2;
      gsap.to(el, { duration: 0.9, ease: "power3.out", opacity: 1 });
      window.removeEventListener("mousemove", onFirstMove);
      window.addEventListener("mousemove", onMove);
      if (!started) { started = true; render(); }
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Event delegation — works for dynamically added links/buttons too
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) {
        rendered.scale.current = 2.5;
        rendered.opacity.current = 0.5;
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) {
        rendered.scale.current = 1;
        rendered.opacity.current = 1;
      }
    };

    window.addEventListener("mousemove", onFirstMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onFirstMove);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <svg
      ref={cursorRef}
      width="32"
      height="32"
      viewBox="0 0 20 20"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        opacity: 0,
      }}
    >
      <circle cx="10" cy="10" r="5" fill="#4e0000" opacity="0.7" />
    </svg>
  );
}
