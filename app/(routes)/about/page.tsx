import React from "react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import Image from "next/image";

const Page = () => {
  return (
    <main className="flex flex-col">
      <Navbar />
      <section className="relative h-screen w-full overflow-hidden pt-16">
        <Image
          src="/hero-2.2.jpg"
          alt="Kage Arch Visual Studio hero background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full max-w-3xl flex-col justify-center gap-4 px-6 text-white md:px-12">
          <p className="text-sm uppercase tracking-[0.3rem] text-white/70">
            About Kagearchvs™
          </p>
          <h1 className="text-3xl font-semibold md:text-4xl">
          KAGEARCHVS™ is a streetwear movement built on identity, grit, and rebellion.
          </h1>
          <p className="text-base text-white/80 md:text-lg">
          Inspired by grunge culture the brand represents those who move differently, those who don’t follow the crowd but carve their own lane.
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pb-20 pt-16 md:flex-row md:items-start md:justify-between md:gap-16 md:px-12">
        <div className="md:max-w-sm text-justify">
          <p className="mt-6 text-lg text-muted-foreground">
          KAGEARCHVS™ is more than a streetwear label — it’s an underground movement built on identity, grit, and rebellion. Inspired by grunge culture and the shadows that shape who we are, the brand represents those who move differently, those who don’t follow the crowd but carve their own lane.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
          Every piece is designed with intention — blending raw energy with refined quality. Our drops are limited, our releases are scarce, and that’s the point: we’re not for everyone. We’re for the ones who understand.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
          Born in Nigeria, built for the world, KAGEARCHVS™ carries the spirit of global street culture while staying true to its roots. We believe luxury can be dark, and authenticity will always outlive trends.
          This is not just clothing. This is archive material.
          </p>
        </div>

        <div className="grid flex-1 gap-8 ">
          <div className="relative h-80 w-full overflow-hidden bg-muted md:h-148">
            <Image
              src="/collection-1.jpeg"
              alt="Collection lifestyle moment"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
          {/* <div className="relative h-80 w-full overflow-hidden bg-muted md:h-112">
            <Image
              src="/collection-2.jpeg"
              alt="Street culture photography at night"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div> */}
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pb-24 md:flex-row md:items-start md:justify-between md:gap-16 md:px-12">
        <div className="grid flex-1 gap-8">
          <div className="relative h-80 w-full overflow-hidden bg-muted md:h-148">
            <Image
              src="/blog-1.png"
              alt="Community gathering on city stoop"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        <div className="md:max-w-sm text-justify">
          <p className="text-sm font-semibold uppercase tracking-[0.25rem] text-muted-foreground">
          The Art of Emotion
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
          Every KAGEARCHVS™ concept begins as a feeling — fragments of emotion, chaos, or clarity translated into visual form. Each design tells a story rooted in the mind’s darker corners: resilience, conflict, growth, and rebirth. I design not just to create clothing, but to document what words can’t always express.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
          Through photo manipulation, distorted textures, and symbolic details, I channel emotion into form — turning moments of vulnerability into wearable art. Every collection captures a different state of mind, preserved like an entry in a visual archive.
            <br />
            <br />
          For me, creation is catharsis. Every piece becomes a reflection of what it means to feel deeply in a world that often doesn’t.
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 md:flex-row md:items-start md:justify-between md:gap-16 md:px-12">
        {/* <div className="md:max-w-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25rem] text-muted-foreground">
            Based On A True Story
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            Live Fast Die Young grew with an independent and selfmade approach.
            What started in a backyard in 2013 has turned into Germany&apos;s
            biggest streetwear brand, rooted in the culture of our generation.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Our collections are inspired by massive movements, open-minded
            thoughts, and street culture. We are driven to become a brand that
            defines today’s generation, while never stopping and straying from
            the path.
          </p>
        </div> */}

        <div className="grid flex-1 gap-8 md:grid-cols-3">
          <div className="relative h-80 w-full overflow-hidden bg-muted md:h-112">
            <Image
              src="/collection-1.jpeg"
              alt="Collection lifestyle moment"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
          <div className="relative h-80 w-full overflow-hidden bg-muted md:h-112">
            <Image
              src="/collection-1.jpeg"
              alt="Collection lifestyle moment"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
          <div className="relative h-80 w-full overflow-hidden bg-muted md:h-112">
            <Image
              src="/collection-2.jpeg"
              alt="Street culture photography at night"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Page;
