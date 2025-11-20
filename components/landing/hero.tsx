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
        <div className="w-full px-2 md:px-3 text-white">
            <h1 className="text-[16px] md:text-[32px] font-extrabold md:font-bold uppercase tracking-tight">
              ALL PRODUCTS
            </h1>
          <Link
            href="/shop"
            className="items-center gap-2 text-xs font-medium uppercase tracking-wide text-white hover:text-white/80 transition-colors"
          >
            Shop now
            <span className="text-base sm:text-lg md:text-xl hidden md:inline-flex">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
