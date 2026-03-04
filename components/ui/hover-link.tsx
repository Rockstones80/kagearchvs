"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import AnimatedLink from "./animated-link";

interface HoverLinkProps {
  index: string;
  label: React.ReactNode;
  href: string;
  imageSrc: string;
}

// ── Module-level mouse tracking — mirrors hoverVideo.js exactly ──
let mousepos = { x: 0, y: 0 };
let mousePosCache = { x: 0, y: 0 };
let direction = { x: 0, y: 0 };

if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    mousepos = { x: e.clientX, y: e.clientY };
  });
}

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}
function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}
function map(
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((v - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export default function HoverLink({
  index,
  label,
  href,
  imageSrc,
}: HoverLinkProps) {
  // DOM refs
  const linkRef   = useRef<HTMLAnchorElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const innerRef  = useRef<HTMLDivElement>(null);
  const assetRef  = useRef<HTMLDivElement>(null);

  // Animation state — all in refs so no React re-renders
  const rafIdRef      = useRef<number | undefined>(undefined);
  const firstCycleRef = useRef(false);
  const boundsRef     = useRef<{ el: DOMRect; reveal: DOMRect } | null>(null);
  const hoverProps    = useRef({
    tx:       { previous: 0, current: 0, amt: 0.08 },
    ty:       { previous: 0, current: 0, amt: 0.08 },
    rotation: { previous: 0, current: 0, amt: 0.08 },
  });

  // ── rAF loop (mirrors HoverVideo.loopRender / render) ──
  function loopRender() {
    if (rafIdRef.current === undefined) {
      rafIdRef.current = requestAnimationFrame(render);
    }
  }

  function stopRendering() {
    if (rafIdRef.current !== undefined) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = undefined;
    }
  }

  function render() {
    rafIdRef.current = undefined;

    const link   = linkRef.current;
    const reveal = revealRef.current;
    if (!link || !reveal) { loopRender(); return; }

    // First frame: calculate bounds once
    if (firstCycleRef.current) {
      boundsRef.current = {
        el:     link.getBoundingClientRect(),
        reveal: reveal.getBoundingClientRect(),
      };
    }

    const bounds = boundsRef.current;
    if (!bounds) { loopRender(); return; }

    const mouseDistanceX = clamp(
      Math.abs(mousePosCache.x - mousepos.x),
      0,
      100
    );

    direction = {
      x: mousePosCache.x - mousepos.x,
      y: mousePosCache.y - mousepos.y,
    };
    mousePosCache = { x: mousepos.x, y: mousepos.y };

    const hp = hoverProps.current;

    // Target position: center of reveal follows cursor
    hp.tx.current =
      Math.abs(mousepos.x - bounds.el.left) - bounds.reveal.width  / 2;
    hp.ty.current =
      Math.abs(mousepos.y - bounds.el.top)  - bounds.reveal.height / 2;

    // Rotation based on mouse distance
    hp.rotation.current = firstCycleRef.current
      ? 0
      : map(mouseDistanceX, 0, 100, 0, direction.x < 0 ? 60 : -60);

    // Interpolate
    hp.tx.previous = firstCycleRef.current
      ? hp.tx.current
      : lerp(hp.tx.previous, hp.tx.current, hp.tx.amt);
    hp.ty.previous = firstCycleRef.current
      ? hp.ty.current
      : lerp(hp.ty.previous, hp.ty.current, hp.ty.amt);
    hp.rotation.previous = firstCycleRef.current
      ? hp.rotation.current
      : lerp(hp.rotation.previous, hp.rotation.current, hp.rotation.amt);

    gsap.set(reveal, {
      x:        hp.tx.previous,
      y:        hp.ty.previous,
      rotation: hp.rotation.previous,
    });

    firstCycleRef.current = false;
    loopRender();
  }

  // ── Show / hide reveal (mirrors HoverVideo.showVideo / hideVideo) ──
  function showVideo() {
    const inner  = innerRef.current;
    const asset  = assetRef.current;
    const reveal = revealRef.current;
    const link   = linkRef.current;
    if (!inner || !asset || !reveal || !link) return;

    gsap.killTweensOf([inner, asset]);

    gsap.timeline({
      onStart: () => {
        // Lift item above siblings while hovered
        gsap.set(link, { zIndex: 4 });
        reveal.style.opacity = "1";
      },
    })
      // revealInner slides in from left or right
      .to(inner, {
        duration: 0.2,
        ease: "sine.out",
        startAt: { x: direction.x < 0 ? "-100%" : "100%" },
        x: "0%",
      })
      // revealAsset counter-slides (creates the "wipe" feel)
      .to(
        asset,
        {
          duration: 0.2,
          ease: "sine.out",
          startAt: { x: direction.x < 0 ? "100%" : "-100%" },
          x: "0%",
        },
        0
      );
  }

  function hideVideo() {
    const inner  = innerRef.current;
    const asset  = assetRef.current;
    const reveal = revealRef.current;
    const link   = linkRef.current;
    if (!inner || !asset || !reveal || !link) return;

    gsap.killTweensOf([inner, asset]);

    gsap.timeline({
      onStart:    () => { gsap.set(link, { zIndex: 1 }); },
      onComplete: () => { gsap.set(reveal, { opacity: 0 }); },
    })
      .to(inner, {
        duration: 0.2,
        ease: "sine.out",
        x: direction.x < 0 ? "100%" : "-100%",
      })
      .to(
        asset,
        {
          duration: 0.2,
          ease: "sine.out",
          x: direction.x < 0 ? "-100%" : "100%",
        },
        0
      );
  }

  return (
    <a
      ref={linkRef}
      href={href}
      // "group" enables Tailwind group-hover on AnimatedLink children
      className="menu__item group"
      style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
      onMouseEnter={() => {
        showVideo();
        firstCycleRef.current = true;
        loopRender();
      }}
      onMouseLeave={() => {
        stopRendering();
        hideVideo();
      }}
    >
      {/* ── Label ── */}
      <span
        className="hover-link-text menu__item-label"
        style={{
          display:        "inline-flex",
          alignItems:     "center",
          position:       "relative",
          zIndex:         2,
          color:          "#121821",
        }}
      >
        <sup
          style={{
            // variableFonts(6, 10) — em is relative to parent 70px link text
            // giving ~30px at desktop, matching korty's .c-hoverlink__super
            ["--min-size" as string]: "6",
            ["--max-size" as string]: "10",
            fontSize:      "var(--responsive)",
            fontWeight:    500,
            letterSpacing: "-2px",
            position:      "relative",
            top:           "-15px",
            left:          "5px",
            marginRight:   "4px",
            display:       "inline-block",
          }}
        >
          {index}
        </sup>

        {/* link-overflow + ov-inner for entrance animation (mirrors index.vue) */}
        <span className="link-overflow">
          <span className="ov-inner">
            <AnimatedLink>{label}</AnimatedLink>
          </span>
        </span>
      </span>

      {/* ── Hover reveal — exactly .hover-reveal from _globals.scss ──
           400×400px, position absolute, z-index -1, top/left 0        */}
      <div
        ref={revealRef}
        style={{
          position:      "absolute",
          zIndex:        -1,
          width:         "400px",
          height:        "400px",
          top:           0,
          left:          0,
          pointerEvents: "none",
          opacity:       0,
        }}
      >
        {/* .hover-reveal__inner — overflow hidden for the wipe slide */}
        <div
          ref={innerRef}
          style={{
            overflow:  "hidden",
            width:     "100%",
            height:    "100%",
            position:  "relative",
          }}
        >
          {/* .hover-reveal__video — the asset that counter-slides */}
          <div
            ref={assetRef}
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            <Image
              src={imageSrc}
              alt=""
              fill
              style={{ objectFit: "cover", objectPosition: "50% 50%" }}
            />
          </div>
        </div>
      </div>
    </a>
  );
}
