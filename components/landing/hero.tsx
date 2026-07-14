"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const HERO_IMAGE_DESKTOP = "/hero/hero-1.jpg";
const HERO_IMAGE_MOBILE  = "/hero/mobile-2.jpg";

const Hero = () => {
  const sectionRef   = useRef<HTMLElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("intro-seen")) return;

    gsap.set(imageWrapRef.current, { scale: 1.08 });
    gsap.set(overlayRef.current,   { opacity: 0 });
    gsap.set(logoRef.current,      { opacity: 0, y: 16 });

    const runEntrance = () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(imageWrapRef.current, { scale: 1, duration: 1.8 }, 0);
      tl.to(overlayRef.current,   { opacity: 1, duration: 1.2 }, 0);
      tl.to(logoRef.current,      { opacity: 1, y: 0, duration: 1, ease: "expo.out" }, 0.4);
    };

    window.addEventListener("intro:done", runEntrance, { once: true });
    return () => window.removeEventListener("intro:done", runEntrance);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">

      {/* Images */}
      <div ref={imageWrapRef} className="absolute inset-0 w-full h-full">
        <div className="md:hidden block absolute inset-0 w-full h-full">
          <Image
            src={HERO_IMAGE_MOBILE}
            alt="KAGEARCHVS hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-left sm:object-top"
          />
        </div>
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <Image
            src={HERO_IMAGE_DESKTOP}
            alt="KAGEARCHVS hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-left sm:object-top"
          />
        </div>
      </div>

      {/* Dark tint */}
      <div ref={overlayRef} className="absolute inset-0 bg-black/25 z-20" />

      {/* Centered white logo — links to shop */}
      <div
        ref={logoRef}
        className="absolute inset-0 z-30 flex items-center justify-center"
      >
        <Link href="/shop">
          <Image
            src="/logoweb-02.png"
            alt="KAGEARCHVS"
            width={400}
            height={100}
            className="brightness-0 invert w-[240px] md:w-[400px] h-auto"
            style={{ opacity: 0.55 }}
            priority
          />
        </Link>
      </div>

    </section>
  );
};

export default Hero;
