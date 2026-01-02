import React from "react";
import Link from "next/link";
// import Image from "next/image";
import Slideshow from "../ui/slideshow";

const heroImages = [
  { src: "/1.jpg", alt: "Hero 1" },
  { src: "/5.jpg", alt: "Hero 2" },
  { src: "/4.jpg", alt: "Hero 3" },
];

const heroImagesMobile = [
  { src: "/D10.jpg", alt: "Hero 3" },
  { src: "/D9.jpg", alt: "Hero 2" },
  { src: "/D7.jpg", alt: "Hero 4" },
];


const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden pt-10">
      {/* {/* Mobile/Tablet: Single static image */}
      <div className="absolute inset-0 w-full h-full md:hidden block">
      <Slideshow
          images={heroImagesMobile}
          interval={5000}
          transitionDuration={1000}
        />
      </div> 

      {/* Desktop: Slideshow */}
      <div className=" absolute inset-0 w-full h-full hidden md:block">
        <Slideshow
          images={heroImages}
          interval={5000}
          transitionDuration={1000}
        />
      </div>

      {/* Dark overlay to reduce image brightness */}
      <div className="absolute inset-0 bg-black/20 z-20"></div>

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