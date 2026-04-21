"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useCart } from "@/contexts/cart-context";

const NAV_LINKS = [
  { href: "/",         label: "Home"     },
  { href: "/shop",     label: "Shop"     },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/cart",     label: "My Cart"  },
];

interface NavbarProps {
  /** "light" = white lines, fixed overlay (homepage over dark hero)
   *  "dark"  = black lines + black logo, static in page flow (inner pages) */
  variant?: "light" | "dark";
}

export default function Navbar({ variant = "light" }: NavbarProps) {
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  const [open, setOpen] = useState(false);

  const navBarRef    = useRef<HTMLDivElement>(null);
  const dropdownRef  = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLLIElement[]>([]);
  const line1Ref     = useRef<HTMLSpanElement>(null);
  const line2Ref     = useRef<HTMLSpanElement>(null);
  const line3Ref     = useRef<HTMLSpanElement>(null);

  const lineColor = variant === "dark" ? "#111" : "#fff";
  const isFixed   = variant === "light"; // only homepage navbar is fixed

  /* ── Hide on scroll — light/fixed only ─────────────────────────────────── */
  useEffect(() => {
    if (!isFixed) return;

    let lastY = 0;
    let hidden = false;

    const onScroll = () => {
      if (open) return;
      const y = window.scrollY;
      const down = y > lastY && y > 60;

      if (down && !hidden) {
        gsap.to(navBarRef.current, { y: "-100%", duration: 0.4, ease: "power2.inOut" });
        hidden = true;
      } else if (!down && hidden) {
        gsap.to(navBarRef.current, { y: "0%", duration: 0.4, ease: "power2.out" });
        hidden = false;
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, isFixed]);

  /* ── Menu open / close ──────────────────────────────────────────────────── */
  const openMenu = () => {
    setOpen(true);
    gsap.set(dropdownRef.current, { display: "block" });

    const tl = gsap.timeline();
    tl.fromTo(dropdownRef.current,
      { opacity: 0, y: -12, pointerEvents: "none" },
      { opacity: 1, y: 0, duration: 0.45, ease: "expo.out", pointerEvents: "auto" }
    );
    tl.fromTo(menuLinksRef.current,
      { x: -16, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "expo.out" },
      "-=0.25"
    );
    tl.to(line1Ref.current, { rotate: 45,  y: 7,  duration: 0.3, ease: "power2.inOut" }, 0);
    tl.to(line2Ref.current, { opacity: 0,          duration: 0.15 }, 0);
    tl.to(line3Ref.current, { rotate: -45, y: -7, duration: 0.3, ease: "power2.inOut" }, 0);
  };

  const closeMenu = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setOpen(false);
        gsap.set(dropdownRef.current, { display: "none" });
      },
    });
    tl.to(dropdownRef.current, { opacity: 0, y: -10, duration: 0.35, ease: "power2.in" });
    tl.to(line1Ref.current, { rotate: 0, y: 0, duration: 0.3, ease: "power2.inOut" }, 0);
    tl.to(line2Ref.current, { opacity: 1,       duration: 0.2, delay: 0.1 }, 0);
    tl.to(line3Ref.current, { rotate: 0, y: 0, duration: 0.3, ease: "power2.inOut" }, 0);
  };

  return (
    /* Wrapper needed so dropdown can be position:absolute relative to the nav */
    <div style={{ position: "relative" }}>
      {/* ── Nav bar strip ──────────────────────────────────────────────────── */}
      <div
        ref={navBarRef}
        style={{
          position:       isFixed ? "fixed" : "relative",
          top:            isFixed ? 0 : undefined,
          left:           isFixed ? 0 : undefined,
          right:          isFixed ? 0 : undefined,
          height:         "72px",
          zIndex:         60,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "0 16px",
        }}
      >
        {/* Left — hamburger */}
        <button
          onClick={open ? closeMenu : openMenu}
          aria-label="Toggle menu"
          style={{
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "center",
            gap:            "6px",
            width:          "32px",
            background:     "none",
            border:         "none",
            cursor:         "pointer",
            padding:        0,
            flexShrink:     0,
          }}
        >
          <span ref={line1Ref} style={{ display: "block", height: "2.5px", width: "100%", background: lineColor, transformOrigin: "center" }} />
          <span ref={line2Ref} style={{ display: "block", height: "2.5px", width: "100%", background: lineColor, transformOrigin: "center" }} />
          <span ref={line3Ref} style={{ display: "block", height: "2.5px", width: "60%",  background: lineColor, transformOrigin: "center" }} />
        </button>

        {/* Center — logo (dark variant only) */}
        {variant === "dark" && (
          <div
            style={{
              position:  "absolute",
              left:      "50%",
              top:       "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Link href="/">
              <Image
                src="/logoweb-02.png"
                alt="kagearchvs"
                width={250}
                height={48}
                style={{ objectFit: "contain", filter: "brightness(0)", opacity: 0.7, display: "block" }}
              />
            </Link>
          </div>
        )}

        {/* Right — spacer */}
        <div style={{ width: "32px", flexShrink: 0 }} />
      </div>

      {/* ── Dropdown menu ────────────────────────────────────────────────── */}
      <div
        ref={dropdownRef}
        style={{
          display:              "none",
          position:             "absolute",
          top:                  "72px",
          left:                 "16px",
          zIndex:               50,
          background:           variant === "dark"
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.55)",
          backdropFilter:       "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius:         "4px",
          padding:              "24px 40px 24px 28px",
          minWidth:             "200px",
          boxShadow:            variant === "dark" ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {NAV_LINKS.map(({ href, label }, i) => {
            const displayLabel = label === "My Cart" && cartItemCount > 0
              ? `My Cart (${cartItemCount})`
              : label;
            return (
              <li
                key={label}
                ref={(el) => { if (el) menuLinksRef.current[i] = el; }}
                style={{ marginBottom: i < NAV_LINKS.length - 1 ? "20px" : 0 }}
              >
                <Link
                  href={href}
                  onClick={closeMenu}
                  style={{
                    fontFamily:    "var(--font-grotesk)",
                    fontSize:      "clamp(0.95rem, 2vw, 1.15rem)",
                    fontWeight:    700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color:         variant === "dark" ? "#111" : "#444",
                    display:       "block",
                    transition:    "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.4")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  {displayLabel}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
