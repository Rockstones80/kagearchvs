"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface SlideImage {
  src: string;
  alt: string;
}

interface SlideshowProps {
  images: SlideImage[];
  interval?: number;
  transitionDuration?: number;
  className?: string;
}

const Slideshow: React.FC<SlideshowProps> = ({
  images,
  interval = 5000,
  transitionDuration = 1000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ transitionDuration: `${transitionDuration}ms` }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            className="object-cover object-top md:object-center"
            quality={100}
          />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
