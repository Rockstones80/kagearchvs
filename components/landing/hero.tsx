"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import Slideshow from "@/components/ui/slideshow";

const heroImages = [
  { src: "/hero-a1.jpg", alt: "Hero 1" },
  { src: "/hero-a2.jpg", alt: "Hero 2" },
  { src: "/hero-a3.jpg", alt: "Hero 3" },
  { src: "/hero-a4.jpg", alt: "Hero 4" },
  { src: "/hero-a5.jpg", alt: "Hero 5" },
];

const heroImagesMobile = [
  { src: "/4.jpg",       alt: "Hero 3" },
  { src: "/mobile-1.jpg",      alt: "Hero 4" },
  { src: "/D10.jpg",      alt: "Hero 4" },
  { src: "/mobile-2.jpg", alt: "Hero 2" },
];

const Hero = () => {
  const sectionRef   = useRef<HTMLElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(sectionRef.current,   { opacity: 0 });
    gsap.set(imageWrapRef.current, { scale: 1.08 });
    gsap.set(overlayRef.current,   { opacity: 0 });
    gsap.set(logoRef.current,      { opacity: 0, y: 16 });

    const runEntrance = () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(sectionRef.current,   { opacity: 1, duration: 0.01 });
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
          <Slideshow images={heroImagesMobile} interval={5000} transitionDuration={1000} />
        </div>
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <Slideshow images={heroImages} interval={5000} transitionDuration={1000} />
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
            src="/navbar.png"
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
