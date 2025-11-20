"use client";

import Image from "next/image";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { useEffect, useState, useCallback } from "react";

const lookbookImages = [
  { src: "/lookbook/sober-01.jpg", alt: "Sober 01 lookbook shot" },
  {
    src: "/lookbook/streetsoukxhomecomingfinal-01.jpg",
    alt: "Street Souk x Homecoming lookbook shot",
  },
  {
    src: "/lookbook/time+-ig-portrait-1080-1350.jpeg",
    alt: "Time plus portrait lookbook",
  },
  {
    src: "/lookbook/handsandsTime1-ig-portrait-1080-1350.jpeg",
    alt: "Hands and time portrait lookbook",
  },
  {
    src: "/lookbook/boutUfullposter-ig-portrait-1080-1350.jpeg",
    alt: "Bout U Full poster",
  },
  {
    src: "/lookbook/surfernew-ig-portrait-1080-1350.jpeg",
    alt: "Surfer new portrait",
  },
  {
    src: "/lookbook/vigilante1-ig-portrait-1080-1350.jpeg",
    alt: "Vigilante portrait 1",
  },
  {
    src: "/lookbook/vigilante2-ig-portrait-1080-1350.jpeg",
    alt: "Vigilante portrait 2",
  },
  { src: "/lookbook/solitudeS.jpg", alt: "Solitude lookbook" },
  { src: "/lookbook/dragonsigilig-02.jpg", alt: "Dragon sigil 02" },
  { src: "/lookbook/dragonsigilig-03.jpg", alt: "Dragon sigil 03" },
  { src: "/lookbook/boutUfullposter.jpg", alt: "Bout U Full poster" },
  { src: "/lookbook/backDesign.jpg", alt: "Back design" },
  { src: "/lookbook/facesdesign.jpg", alt: "Faces design" },
  { src: "/lookbook/psychodesign.jpg", alt: "Psycho design" },
  { src: "/lookbook/designB.jpg", alt: "Design B" },
  { src: "/lookbook/jj.jpg", alt: "JJ lookbook" },
  { src: "/lookbook/ll.jpg", alt: "LL lookbook" },
  { src: "/lookbook/kagethread.jpg", alt: "Kage thread" },
  { src: "/lookbook/designma.jpg", alt: "Design MA" },
  { src: "/lookbook/WorldDomDesign.jpg", alt: "World domination design" },
  { src: "/lookbook/holy.jpg", alt: "Holy design" },
  { src: "/lookbook/frontDesign.jpg", alt: "Front design" },
  { src: "/lookbook/back.jpg", alt: "Back lookbook" },
  { src: "/lookbook/surfer2.jpg", alt: "Surfer 2" },
  { src: "/lookbook/surfernew.jpg", alt: "Surfer new" },
  { src: "/lookbook/kdalien-02.jpg", alt: "Alien design" },
  { src: "/lookbook/handsandsTime.jpg", alt: "Hands and time" },
  { src: "/lookbook/time+.jpg", alt: "Time plus" },
  { src: "/lookbook/designart.jpg", alt: "Design art" },
  { src: "/lookbook/vigilante1.jpg", alt: "Vigilante lookbook 1" },
  { src: "/lookbook/vigilante2.jpg", alt: "Vigilante lookbook 2" },
  { src: "/lookbook/normal.jpg", alt: "Normal design" },
  { src: "/lookbook/rusted.jpg", alt: "Rusted design" },
  { src: "/lookbook/ART.jpg", alt: "Art lookbook" },
  { src: "/lookbook/loneliness1.jpg", alt: "Loneliness design" },
  { src: "/lookbook/macho-01.jpg", alt: "Macho design" },
  { src: "/lookbook/design.jpg", alt: "Design" },
  { src: "/lookbook/HBAT11.jpg", alt: "HBAT 11" },
  { src: "/lookbook/HBAT1.jpg", alt: "HBAT 1" },
  { src: "/lookbook/Artboard 1.jpg", alt: "Artboard 1" },
  { src: "/lookbook/ntg1-01.jpg", alt: "NTG 1" },
  { src: "/lookbook/ntg2-02.jpg", alt: "NTG 2" },
  { src: "/lookbook/asapnew.jpg", alt: "ASAP new" },
  { src: "/lookbook/b_w.jpg", alt: "Black and white design" },
  { src: "/lookbook/l.jpg", alt: "Lookbook L" },
  { src: "/lookbook/lkk.jpg", alt: "Lookbook LKK" },
];

const LookbookPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeViewer = useCallback(() => setSelectedIndex(null), []);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      return prev === 0 ? lookbookImages.length - 1 : prev - 1;
    });
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      return prev === lookbookImages.length - 1 ? 0 : prev + 1;
    });
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeViewer();
      } else if (event.key === "ArrowLeft") {
        showPrev();
      } else if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, closeViewer, showPrev, showNext]);

  const heightPattern = [220, 400, 300, 520, 260, 460, 340, 200];

  return (
    <main className="w-full  text-black">
      <Navbar
        textClass="text-gray-700 font-medium"
        iconClass="text-gray-700"
        logoSrc="/logo-2.png"
        // logoWidth={120}
        // logoHeight={120}
      />

      {/* Intro Section */}
      <section className="mx-auto px-4 sm:px-6 pt-20 sm:pt-28 md:pt-36 pb-12 md:pb-20 md:px-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold uppercase tracking-tight">
          WELCOME TO KAGEARCHVS
        </h1>
        {/* <p className="mt-4 text-base font-medium md:text-lg">
          Released Sat. June 29th 2024 – 11 AM (CEST)
        </p> */}
        <p className="mt-4 sm:mt-6 md:mt-8 max-w-3xl text-sm sm:text-base leading-relaxed text-gray-700 md:text-lg">
          This is my little world of fashion, emotion, and raw expression — a
          space where every design tells a story, every texture mirrors a
          feeling, and every detail reflects a piece of who I am. KAGEARCHVS is
          more than clothing; it’s how I translate what I can’t always say into
          something you can see, feel, and wear.
        </p>
      </section>

      {/* Image Grid */}
      <section className="px-2 sm:px-4 pb-16 md:pb-32 md:px-8">
        <div className="columns-2 gap-4 sm:gap-7 space-y-4 sm:space-y-7 sm:columns-2 lg:columns-3 xl:columns-5">
          {lookbookImages.map((image, index) => (
            <div
              key={index}
              className="group relative mb-7 block w-full cursor-pointer break-inside-avoid overflow-hidden  border border-black/5 bg-[#f7f1ea] shadow-[0_15px_35px_rgba(31,31,31,0.08)] transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(31,31,31,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              style={{
                height: `${heightPattern[index % heightPattern.length]}px`,
              }}
              onClick={() => setSelectedIndex(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedIndex(index);
                }
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                quality={100}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </section>

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 sm:px-10">
          <button
            aria-label="Close viewer"
            onClick={closeViewer}
            className="absolute top-6 right-6 text-white text-2xl font-light hover:opacity-80"
          >
            ×
          </button>

          <button
            aria-label="Previous image"
            onClick={showPrev}
            className="hidden sm:flex absolute left-6 text-white text-4xl font-light hover:opacity-80"
          >
            ‹
          </button>

          <button
            aria-label="Next image"
            onClick={showNext}
            className="hidden sm:flex absolute right-6 text-white text-4xl font-light hover:opacity-80"
          >
            ›
          </button>

          <div className="relative w-full max-w-5xl aspect-3/4 sm:aspect-4/3">
            <Image
              src={lookbookImages[selectedIndex].src}
              alt={lookbookImages[selectedIndex].alt}
              fill
              className="object-contain"
              quality={100}
              priority
            />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm md:text-base text-center max-w-3xl px-4">
            <p className="font-semibold uppercase tracking-wide">
              {lookbookImages[selectedIndex].alt}
            </p>
            <p className="mt-1 text-xs md:text-sm opacity-80">
              Image {selectedIndex + 1} of {lookbookImages.length}
            </p>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
};

export default LookbookPage;
