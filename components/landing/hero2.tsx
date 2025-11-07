import React from "react";
import Image from "next/image";

const Hero2 = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/hero-2.2.jpg"
          alt="Hero 2"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
      </div>

      {/* Dark overlay to reduce image brightness */}
      <div className="absolute inset-0 bg-black/40"></div>
    </section>
  );
};

export default Hero2;
