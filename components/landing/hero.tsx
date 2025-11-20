import React from "react";
import Link from "next/link";
import Slideshow from "../ui/slideshow";

const heroImages = [
  { src: "/hero-1.png", alt: "Hero 1" },
  { src: "/hero-2.jpg", alt: "Hero 2" },
  { src: "/hero-3.jpg", alt: "Hero 3" },
];

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Slideshow
        images={heroImages}
        interval={5000}
        transitionDuration={1000}
      />

      {/* Dark overlay to reduce image brightness */}
      <div className="absolute inset-0 bg-black/40 z-20"></div>

      {/* Text overlay */}
      <div className="absolute inset-0 z-30 flex items-end">
        <div className="px-4 pb-6 md:pb-4 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-tight mb-3 md:mb-4">
            ALL PRODUCTS
          </h1>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs sm:text-sm md:text-base font-medium uppercase tracking-wide text-white hover:text-white/80 transition-colors"
          >
            Shop now
            <span className="text-base sm:text-lg md:text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
