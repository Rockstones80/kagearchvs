import React from "react";
import Link from "next/link";
import Image from "next/image";
import Slideshow from "../ui/slideshow";

const heroImages = [
  { src: "/hero-1.png", alt: "Hero 1" },
  { src: "/hero-2.jpg", alt: "Hero 2" },
  { src: "/hero-3.jpg", alt: "Hero 3" },
];

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Mobile/Tablet: Single static image */}
      <div className="absolute inset-0 w-full h-full md:hidden">
        <Image
          src="/hero-5.png"
          alt="Hero"
          fill
          priority
          className="object-cover object-top"
          quality={100}
        />
      </div>

      {/* Desktop: Slideshow */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        <Slideshow
          images={heroImages}
          interval={5000}
          transitionDuration={1000}
        />
      </div>

      {/* Dark overlay to reduce image brightness */}
      <div className="absolute inset-0 bg-black/40 z-20"></div>

      {/* Text overlay */}
      <div className="absolute inset-0 z-30 flex items-end">
        <div className="w-full px-2 md:px-4 pb-2 md:pb-4 text-white">
          <Link
            href="/shop"
            className="flex flex-row items-center justify-between w-full"
          >
            <h1 className="text-[28px] md:text-[45px] font-semibold uppercase md:mb-4">
              ALL PRODUCTS
            </h1>
            <span className="text-[22px] md:hidden font-light">→</span>
          </Link>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-2 text-xs sm:text-sm md:text-base font-medium uppercase tracking-wide text-white hover:text-white/80 transition-colors"
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
