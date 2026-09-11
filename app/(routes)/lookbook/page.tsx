"use client";

import Image from "next/image";
import Navbar from "@/components/landing/navbar";
// import Footer from "@/components/landing/footer";
import { useEffect, useState, useCallback } from "react";

interface LookbookImage {
  src: string;
  alt: string;
  /** Intrinsic pixel size — every tile is drawn at its own aspect ratio, so
   *  these drive the grid height as well as the lightbox, and prevent CLS. */
  width: number;
  height: number;
}

const lookbookImages: LookbookImage[] = [
  /* ── 2026 identity work ─────────────────────────────────────────────── */
  { src: "/lookbook/poster.jpg", alt: "Rooted in Design & Identity — Issue 01 cover", width: 1080, height: 1350 },
  { src: "/lookbook/Untitled-5-07.jpg", alt: "Certified Kage and Red Summer marks", width: 8000, height: 4800 },
  { src: "/lookbook/ka.jpg", alt: "Kagearchvs wordmark", width: 1350, height: 810 },
  { src: "/lookbook/red.jpg", alt: "Kage monogram on red", width: 1080, height: 1350 },
  { src: "/lookbook/emblem.jpg", alt: "Crossed-flag emblem in oxblood", width: 1080, height: 1350 },
  { src: "/lookbook/hm.jpg", alt: "Crossed-flag emblem in gold", width: 1350, height: 1080 },
  { src: "/lookbook/bl.jpg", alt: "Flag emblem and wordmark lockups", width: 1350, height: 810 },
  { src: "/lookbook/r_w.jpg", alt: "Kage monogram flag", width: 1350, height: 810 },
  { src: "/lookbook/flag1.jpg", alt: "Winged figure over the Kage flag", width: 1350, height: 810 },

  /* ── Prints ─────────────────────────────────────────────────────────── */
  { src: "/lookbook/blue.jpg", alt: "Gold tiger on indigo", width: 1080, height: 1350 },
  { src: "/lookbook/samurai.jpg", alt: "Samurai riders wordmark print", width: 1080, height: 1350 },
  { src: "/lookbook/playlist.jpg", alt: "Red Summer cover art", width: 1080, height: 1080 },
  { src: "/lookbook/Untitled-1.jpg", alt: "Kage in Tokyo night-drive print", width: 1080, height: 1350 },
  { src: "/lookbook/ss.jpg", alt: "Future Havvn presents — Lagos, Nigeria", width: 1080, height: 1350 },
  { src: "/lookbook/sleeve.jpg", alt: "Green star runner sleeve art", width: 1080, height: 1350 },

  /* ── Pop-up ─────────────────────────────────────────────────────────── */
  { src: "/lookbook/popup.jpg", alt: "Uni Pop-Up flyers, Covenant University", width: 1350, height: 810 },
  { src: "/lookbook/tent.jpg", alt: "Kagearchvs pop-up tent, angled view", width: 4000, height: 3000 },
  { src: "/lookbook/tent1.jpg", alt: "Kagearchvs pop-up tent, canopy detail", width: 4000, height: 3000 },
  { src: "/lookbook/tent2.jpg", alt: "Kagearchvs pop-up tent, front view", width: 4000, height: 3000 },

  /* ── Archive ────────────────────────────────────────────────────────── */
  { src: "/lookbook/sober-01.jpg", alt: "Sober 01 lookbook shot", width: 4500, height: 5625 },
  { src: "/lookbook/streetsoukxhomecomingfinal-01.jpg", alt: "Street Souk x Homecoming lookbook shot", width: 4501, height: 5626 },
  { src: "/lookbook/boutUfullposter-ig-portrait-1080-1350.jpeg", alt: "Bout U Full poster", width: 1080, height: 1350 },
  { src: "/lookbook/surfernew-ig-portrait-1080-1350.jpeg", alt: "Surfer new portrait", width: 1080, height: 1350 },
  { src: "/lookbook/solitudeS.jpg", alt: "Solitude lookbook", width: 4800, height: 6000 },
  { src: "/lookbook/dragonsigilig-02.jpg", alt: "Dragon sigil 02", width: 4501, height: 5626 },
  { src: "/lookbook/dragonsigilig-03.jpg", alt: "Dragon sigil 03", width: 4501, height: 5626 },
  { src: "/lookbook/boutUfullposter.jpg", alt: "Bout U Full poster", width: 4800, height: 6000 },
  { src: "/lookbook/backDesign.jpg", alt: "Back design", width: 1080, height: 1350 },
  { src: "/lookbook/facesdesign.jpg", alt: "Faces design", width: 1080, height: 1350 },
  { src: "/lookbook/psychodesign.jpg", alt: "Psycho design", width: 1080, height: 1350 },
  { src: "/lookbook/designB.jpg", alt: "Design B", width: 1080, height: 1350 },
  { src: "/lookbook/jj.jpg", alt: "JJ lookbook", width: 2700, height: 3375 },
  { src: "/lookbook/ll.jpg", alt: "LL lookbook", width: 1080, height: 1350 },
  { src: "/lookbook/kagethread.jpg", alt: "Kage thread", width: 1080, height: 1350 },
  { src: "/lookbook/designma.jpg", alt: "Design MA", width: 1080, height: 1350 },
  { src: "/lookbook/WorldDomDesign.jpg", alt: "World domination design", width: 1080, height: 1350 },
  { src: "/lookbook/holy.jpg", alt: "Holy design", width: 1080, height: 1350 },
  { src: "/lookbook/frontDesign.jpg", alt: "Front design", width: 1080, height: 1350 },
  { src: "/lookbook/back.jpg", alt: "Back lookbook", width: 1080, height: 1350 },
  { src: "/lookbook/surfer2.jpg", alt: "Surfer 2", width: 4800, height: 6000 },
  { src: "/lookbook/surfernew.jpg", alt: "Surfer new", width: 4800, height: 6000 },
  { src: "/lookbook/kdalien-02.jpg", alt: "Alien design", width: 4501, height: 5625 },
  { src: "/lookbook/handsandsTime.jpg", alt: "Hands and time", width: 4800, height: 6000 },
  { src: "/lookbook/time+.jpg", alt: "Time plus", width: 4800, height: 6000 },
  { src: "/lookbook/designart.jpg", alt: "Design art", width: 1080, height: 1350 },
  { src: "/lookbook/vigilante1.jpg", alt: "Vigilante lookbook 1", width: 4800, height: 6000 },
  { src: "/lookbook/vigilante2.jpg", alt: "Vigilante lookbook 2", width: 4800, height: 6000 },
  { src: "/lookbook/normal.jpg", alt: "Normal design", width: 1080, height: 1350 },
  { src: "/lookbook/rusted.jpg", alt: "Rusted design", width: 1080, height: 1350 },
  { src: "/lookbook/ART.jpg", alt: "Art lookbook", width: 1080, height: 1350 },
  { src: "/lookbook/loneliness1.jpg", alt: "Loneliness design", width: 1080, height: 1350 },
  { src: "/lookbook/macho-01.jpg", alt: "Macho design", width: 4500, height: 5625 },
  { src: "/lookbook/design.jpg", alt: "Design", width: 1080, height: 1350 },
  { src: "/lookbook/HBAT11.jpg", alt: "HBAT 11", width: 1080, height: 1350 },
  { src: "/lookbook/HBAT1.jpg", alt: "HBAT 1", width: 1080, height: 1350 },
  { src: "/lookbook/Artboard 1.jpg", alt: "Artboard 1", width: 1080, height: 1350 },
  { src: "/lookbook/ntg1-01.jpg", alt: "NTG 1", width: 4500, height: 5625 },
  { src: "/lookbook/ntg2-02.jpg", alt: "NTG 2", width: 1080, height: 1350 },
  { src: "/lookbook/asapnew.jpg", alt: "ASAP new", width: 1080, height: 1350 },
  { src: "/lookbook/b_w.jpg", alt: "Black and white design", width: 1080, height: 1350 },
  { src: "/lookbook/l.jpg", alt: "Lookbook L", width: 1080, height: 1350 },
  { src: "/lookbook/lkk.jpg", alt: "Lookbook LKK", width: 1080, height: 1350 },
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

  return (
    <main className="w-full  text-black">
      <Navbar variant="dark" />

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
        <div className="columns-2 gap-4 sm:gap-7 lg:columns-3 xl:columns-5">
          {lookbookImages.map((image, index) => (
            <div
              key={index}
              className="group relative mb-4 block w-full cursor-pointer overflow-hidden border border-black/5 shadow-[0_15px_35px_rgba(31,31,31,0.08)] transition-transform duration-500 ease-out break-inside-avoid hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(31,31,31,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black sm:mb-7"
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
                width={image.width}
                height={image.height}
                sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, 50vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
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

          <div className="flex w-full max-w-5xl items-center justify-center">
            <Image
              src={lookbookImages[selectedIndex].src}
              alt={lookbookImages[selectedIndex].alt}
              width={lookbookImages[selectedIndex].width}
              height={lookbookImages[selectedIndex].height}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="h-auto max-h-[74vh] w-auto max-w-full object-contain"
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
      {/* <Footer /> */}
    </main>
  );
};

export default LookbookPage;
