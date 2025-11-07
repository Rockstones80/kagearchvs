import React from "react";
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
    </section>
  );
};

export default Hero;
