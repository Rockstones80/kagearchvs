"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const WORD        = "RED SUMMER";
const ROWS        = 3;
const DURATION_MS = 4400; // time on screen before the fade starts
const FADE_MS     = 600;
const RED         = "#ff1c1c";
const DIM         = 0.8;  // how dark un-lit text gets (0..1)

// repeated-word track; two identical copies per row = seamless loop
const TRACK = `${WORD} `.repeat(6);

export default function IntroScreen() {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [leaving, setLeaving] = useState(false);

  const finishedRef = useRef(false);

  useLayoutEffect(() => {
    const seen = sessionStorage.getItem("intro-seen");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time pre-paint hydration gate
    setPhase(seen ? "done" : "playing");
    if (seen) window.dispatchEvent(new CustomEvent("intro:done"));
  }, []);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    sessionStorage.setItem("intro-seen", "1");
    window.dispatchEvent(new CustomEvent("intro:done"));
    setLeaving(true);
    window.setTimeout(() => setPhase("done"), FADE_MS);
  };

  useEffect(() => {
    if (phase !== "playing") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 1200 : DURATION_MS;
    const timer = window.setTimeout(finish, hold);
    return () => window.clearTimeout(timer);
     
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`rs-intro${leaving ? " leaving" : ""}`}
      onClick={finish}
      role="button"
      aria-label="Skip intro"
      title="click to skip"
    >
      <div className="rs-rows">
        {Array.from({ length: ROWS }).map((_, r) => (
          <div
            key={r}
            className="rs-row"
            style={
              {
                "--dur": `${18 + r * 3}s`,
                animationDelay: `${-(r * 4.1)}s`,
              } as React.CSSProperties
            }
          >
            <span>{TRACK}</span>
            <span>{TRACK}</span>
          </div>
        ))}
      </div>
      <div className="rs-light" />
      <div className="rs-vig" />

      <style>{`
        .rs-intro {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #000;
          overflow: hidden;
          cursor: pointer;
          transition: opacity ${FADE_MS / 1000}s ease;
        }
        .rs-intro.leaving {
          opacity: 0;
          pointer-events: none;
        }
        .rs-rows {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .rs-row {
          display: flex;
          white-space: nowrap;
          will-change: transform;
          animation: rs-marL var(--dur, 18s) linear infinite;
        }
        .rs-row:nth-child(even) {
          animation-name: rs-marR;
        }
        .rs-row span {
          font-family: var(--font-grotesk), "Helvetica Neue", Arial, "Segoe UI", sans-serif;
          font-weight: 800;
          font-stretch: condensed;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: ${RED};
          font-size: 26vh;
          line-height: 1.12;
          padding-right: 0.3em;
          user-select: none;
        }
        @keyframes rs-marL {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes rs-marR {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        /* moving light: a dark overlay with soft transparent "holes" that
           sweep across (revealing bright text) plus a neon-buzz flicker */
        .rs-light {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: rgba(0, 0, 0, ${DIM});
          -webkit-mask-image:
            radial-gradient(circle, transparent 0 14%, #000 42%),
            radial-gradient(circle, transparent 0 10%, #000 34%);
          mask-image:
            radial-gradient(circle, transparent 0 14%, #000 42%),
            radial-gradient(circle, transparent 0 10%, #000 34%);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: 60% 120%, 45% 80%;
          mask-size: 60% 120%, 45% 80%;
          animation:
            rs-sweepA 2.1s ease-in-out infinite alternate,
            rs-sweepB 1.6s ease-in-out infinite alternate,
            rs-flicker 1.7s steps(1, end) infinite;
        }
        @keyframes rs-sweepA {
          0%   { -webkit-mask-position: -8% 24%, 118% 76%; mask-position: -8% 24%, 118% 76%; }
          100% { -webkit-mask-position: 112% 78%, -18% 26%; mask-position: 112% 78%, -18% 26%; }
        }
        @keyframes rs-sweepB {
          0%   { -webkit-mask-size: 60% 120%, 45% 70%; mask-size: 60% 120%, 45% 70%; }
          100% { -webkit-mask-size: 62% 118%, 52% 95%; mask-size: 62% 118%, 52% 95%; }
        }
        /* quick, irregular jumps in how much light gets through -> flicker */
        @keyframes rs-flicker {
          0%   { opacity: 1; }    6%  { opacity: 0.55; } 9%  { opacity: 1; }
          17%  { opacity: 0.8; }  19% { opacity: 0.35; } 21% { opacity: 1; }
          34%  { opacity: 0.9; }  36% { opacity: 0.5; }  38% { opacity: 1; }
          52%  { opacity: 0.7; }  54% { opacity: 1; }
          68%  { opacity: 0.85; } 70% { opacity: 0.4; }  72% { opacity: 1; }
          86%  { opacity: 0.6; }  88% { opacity: 1; }    100% { opacity: 1; }
        }
        .rs-vig {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            120% 120% at 50% 50%,
            transparent 52%,
            rgba(0, 0, 0, 0.8) 100%
          );
        }
        @media (prefers-reduced-motion: reduce) {
          .rs-row { animation: none; }
          .rs-light {
            animation: none;
            -webkit-mask-position: 50% 50%, 50% 50%;
            mask-position: 50% 50%, 50% 50%;
          }
        }
      `}</style>
    </div>
  );
}
