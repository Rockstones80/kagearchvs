"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const INTRO_VIDEO_DESKTOP = "/videos/intro.mp4";
const INTRO_VIDEO_MOBILE  = "/videos/intro-mobile.mp4";

type IntroState = {
  phase: "idle" | "playing" | "done";
  src:   string | null;
};

export default function IntroScreen() {
  const [{ phase, src }, setState] = useState<IntroState>({ phase: "idle", src: null });

  const preloaderRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const seen = sessionStorage.getItem("intro-seen");
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time pre-paint hydration gate
    setState(
      seen
        ? { phase: "done", src: null }
        : { phase: "playing", src: isMobile ? INTRO_VIDEO_MOBILE : INTRO_VIDEO_DESKTOP }
    );
    if (seen) window.dispatchEvent(new CustomEvent("intro:done"));
  }, []);

  useEffect(() => {
    if (phase !== "playing" || !src) return;

    const video     = videoRef.current;
    const preloader = preloaderRef.current;
    if (!video) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      sessionStorage.setItem("intro-seen", "1");
      window.dispatchEvent(new CustomEvent("intro:done"));
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => setState({ phase: "done", src: null }),
      });
    };

    video.addEventListener("ended", finish);
    video.addEventListener("error", finish);

    // Autoplay blocked → skip the intro rather than trap the visitor.
    video.play().catch(finish);

    // Network guard: if the video never starts within 8s, skip it.
    const guard = window.setTimeout(() => {
      if (video.currentTime === 0) finish();
    }, 8000);

    return () => {
      video.removeEventListener("ended", finish);
      video.removeEventListener("error", finish);
      window.clearTimeout(guard);
      gsap.killTweensOf(preloader);
    };
  }, [phase, src]);

  if (phase === "done") return null;

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
      }}
    >
      {src && (
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          autoPlay
          preload="auto"
          style={{
            width:     "100%",
            height:    "100%",
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
}
