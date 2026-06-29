"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

// ── Exact copy of korty's min3Digits helper ────────────────────────────────────
function min3Digits(num: number): string {
  if (num < 10)  return `00${num}`;
  else if (num < 99) return `0${num}`;
  return `${num}`;
}

// ── Mirrors korty's toBePreloaded.forEach loop exactly ────────────────────────
// korty does NOT filter "100" — it stays as the last item
function buildNumbersArr(totalImages: number): string[] {
  return Array.from({ length: totalImages }, (_, i) => {
    const pct = Math.floor((100 / totalImages) * (i + 1));
    return min3Digits(pct);
  });
}

// 19 items — same as korty's toBePreloaded.length
// Last item will be "100" (shown without hide-first, like korty's)
const numbersArr = buildNumbersArr(19);

const IMAGE_1 = "/45.jpg";
const IMAGE_2 = "/hero-9.2.jpg";

export default function IntroScreen() {
  const [visible, setVisible] = useState(true);

  const preloaderRef  = useRef<HTMLDivElement>(null);
  const fakeZeroRef   = useRef<HTMLDivElement>(null);
  const pInnerRef     = useRef<HTMLSpanElement>(null);
  const con1Ref       = useRef<HTMLDivElement>(null);
  const img1Ref       = useRef<HTMLDivElement>(null);
  const con2Ref       = useRef<HTMLDivElement>(null);
  const img2Ref       = useRef<HTMLDivElement>(null);
  const footerRef     = useRef<HTMLDivElement>(null);
  const pctContRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          window.dispatchEvent(new CustomEvent("intro:done"));
          setVisible(false);
        },
      });

      // ── Counter: single continuous linear scroll ────────────────────────────
      // Mirrors korty's overlapping gsap.to calls with ease:"none" — the key to
      // seamlessness. No discrete steps, no easing deceleration between numbers.
      // numbersArr.length = 19, but "100" is last — scroll to index 18 (just before it)
      // so fake-zero handles the hundreds digit. We stop at item 18 (the "100" step
      // handled below). Actually we let it scroll all the way: p-inner scrolls to
      // -(numbersArr.length * 100)% of its own height (each item = 100% of visible area).
      // Using yPercent requires p-inner height = 1 item. We keep block flow so use y.
      // "none" ease = constant velocity = seamless (korty's overlapping tween effect)
      tl.to(pInnerRef.current, {
        y: `-${numbersArr.length - 1}em`,   // stop at "094" (second-to-last), then flip to 100
        duration: 5,
        ease: "none",
      });

      // ── Hold briefly while counter sits at ~94% ─────────────────────────────
      tl.to({}, { duration: 0.3 });

      // ── Flip to '100: fake-zero exits upward, p-inner scrolls to "100" ──────
      // Slower flip as requested (1.5s instead of 1s)
      tl.to(fakeZeroRef.current, {
        y: "-1em",
        duration: 1.5,
        ease: "power2.inOut",
      });
      tl.to(pInnerRef.current, {
        y: `-${numbersArr.length}em`,
        duration: 1.5,
        ease: "power2.inOut",
      }, "<");

      // ── Hide counter BEFORE image reveals (fixes '100 showing on image) ────
      tl.to(pctContRef.current, { opacity: 0, duration: 0.4, ease: "power2.out" });

      // ── con-2 reveals ───────────────────────────────────────────────────────
      tl.set(con2Ref.current, { autoAlpha: 1 });
      tl.from(con2Ref.current, { yPercent: 100, duration: 1.5, ease: "expo.inOut" });
      tl.from(img2Ref.current, { yPercent: -100, duration: 1.5, ease: "expo.inOut" }, "<");

      // ── con-1 snaps visible ─────────────────────────────────────────────────
      tl.set(con1Ref.current, { autoAlpha: 1 });

      // ── con-2 exits (korty: .to con-2 yPercent:-100, image-2 yPercent:100) ─
      tl.to(con2Ref.current, { yPercent: -100, duration: 1.5, ease: "expo.inOut" });
      tl.to(img2Ref.current, { yPercent: 100,  duration: 1.5, ease: "expo.inOut" }, "<");

      // ── con-1 exits ─────────────────────────────────────────────────────────
      tl.to(con1Ref.current, { yPercent: -100, duration: 1.5, ease: "expo.inOut" });
      tl.to(img1Ref.current, { yPercent: 100,  duration: 1.5, ease: "expo.inOut" }, "<");

      // ── Footer fades out (korty: delay -1 = overlap with image exit) ────────
      tl.to(footerRef.current, { opacity: 0, duration: 1, ease: "power2.out" }, "-=1");

      // ── Preloader fades ─────────────────────────────────────────────────────
      tl.to(preloaderRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" });
    });

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={preloaderRef}
      className="c-preloader"
      aria-hidden="true"
      style={{
        position:   "fixed",
        inset:      0,
        zIndex:     9999,
        background: "#000",
        overflow:   "hidden",
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="c-preloader__inner"
        style={{
          width:    "100%",
          height:   "100%",
          display:  "flex",
          alignItems:     "center",
          justifyContent: "center",
          position:       "relative",
          padding:        "32px",
        }}
      >
        {/* ── stacked grid: percentages__container + preloader-images ───────── */}
        <div style={{ display: "grid", width: "100%", maxWidth: "340px", height: "380px" }}>

          {/* percentages__container — above images (z-index 3) */}
          <div
            ref={pctContRef}
            className="percentages__container"
            style={{
              gridArea:       "1/1",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              zIndex:         3,
            }}
          >
            {/* ── korty's heading-1 .percentages ─────────────────────────── */}
            <div
              className="percentages"
              style={{
                fontFamily:  "var(--font-fraunces)",
                fontSize:    "clamp(2.8rem, 6vw, 6.5rem)",
                fontStyle:   "italic",
                fontWeight:  400,
                color:       "white",
                lineHeight:  1,
                display:     "inline-flex",
                alignItems:  "center",
                position:    "relative",
                overflowY:   "hidden",
                overflowX:   "visible",
                paddingLeft: "20px",
                marginLeft:  "-20px",
              }}
            >
              {/* korty: <div class="mark">'</div> — absolute positioned left */}
              <div
                className="mark"
                style={{ position: "absolute", left: "5px", lineHeight: 1 }}
              >
                &apos;
              </div>

              {/* korty: <div class="fake-zero">0</div> — absolute, z-index:1 */}
              {/* Just "0" — korty moves this UP (yPercent:-100) to reveal nothing,
                  allowing the "1" in the last p-inner item "100" to show */}
              <div
                ref={fakeZeroRef}
                className="fake-zero"
                style={{
                  position: "absolute",
                  zIndex:   1,
                  lineHeight: 1,
                  left:     "20px",   // sits over the hundreds digit of p-inner
                }}
              >
                0
              </div>

              {/* korty: <span class="p-inner"> with display:flex + will-change
                  .subsequent items are position:absolute top:(index+1)*100%
                  .hide-first::first-letter { opacity:0 } hides hundreds digit
                  Last item "100" has NO hide-first → "1" is visible when fake-zero exits */}
              <span
                ref={pInnerRef}
                className="p-inner"
                style={{
                  display:    "flex",       // korty: display:flex (not block)
                  willChange: "transform",
                  lineHeight: 1,
                  position:   "relative",   // so absolute children offset from here
                }}
              >
                {/* hide-first: "000" — ::first-letter hidden, shows "00" */}
                <span
                  className="hide-first"
                  style={{ lineHeight: 1, letterSpacing: "normal" }}
                >
                  000
                </span>

                {/* subsequent items — position:absolute, top:(index+1)*100% */}
                {numbersArr.map((n, i) => {
                  const isLast = i + 1 === numbersArr.length; // last item = "100", no hide-first
                  return (
                    <span
                      key={n}
                      className={`subsequent${!isLast ? " hide-first" : ""}`}
                      style={{
                        position:      "absolute",
                        top:           `${(i + 1) * 100}%`,  // korty: top:(index+1)*100%
                        lineHeight:    1,
                        letterSpacing: "normal",
                        left:          0,
                      }}
                    >
                      {n}
                    </span>
                  );
                })}
              </span>
            </div>
          </div>

          {/* preloader-images — behind counter (z-index 2) */}
          <div
            className="preloader-images"
            style={{
              gridArea: "1/1",
              display:  "grid",
              zIndex:   2,
              position: "relative",
            }}
          >
            {/* con-1 — behind, exits last */}
            <div
              ref={con1Ref}
              className="image-con con-1"
              style={{
                gridArea:  "1/1",
                width:     "100%",
                height:    "100%",
                position:  "relative",
                overflow:  "hidden",
                opacity:   0,
                visibility:"hidden",
                zIndex:    1,
              }}
            >
              <div
                ref={img1Ref}
                className="image-1 image"
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src={IMAGE_1}
                  alt=""
                  fill
                  style={{ objectFit: "cover", objectPosition: "50% 50%" }}
                />
              </div>
            </div>

            {/* con-2 — front, reveals and exits first */}
            <div
              ref={con2Ref}
              className="image-con con-2"
              style={{
                gridArea:  "1/1",
                width:     "100%",
                height:    "100%",
                position:  "relative",
                overflow:  "hidden",
                opacity:   0,
                visibility:"hidden",
                zIndex:    2,
              }}
            >
              <div
                ref={img2Ref}
                className="image-2 image"
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src={IMAGE_2}
                  alt=""
                  fill
                  style={{ objectFit: "cover", objectPosition: "50% 0%" }}
                  priority
                />
              </div>
            </div>
          </div>

        </div>

        {/* c-preloader__footer — logo bottom-left */}
        <div
          ref={footerRef}
          className="c-preloader__footer"
          style={{ position: "absolute", left: "32px", bottom: "32px" }}
        >
          <Image
            src="/navbar.png"
            alt="KAGEARCHVS"
            width={120}
            height={40}
            className="w-24 h-auto brightness-0 invert"
          />
        </div>
      </div>

      {/* ── CSS for hide-first::first-letter (matches korty's SCSS exactly) ──── */}
      <style>{`
        .p-inner .hide-first::first-letter {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
