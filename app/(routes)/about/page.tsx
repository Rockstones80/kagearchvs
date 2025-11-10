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
            About Kage Arch Visuals
          </p>
          <h1 className="text-3xl font-semibold md:text-5xl">
            Architectural storytelling that transforms spaces into experiences.
          </h1>
          <p className="text-base text-white/80 md:text-lg">
            We craft immersive visual narratives for visionary architects,
            developers, and brands. From concept renders to interactive
            architectural journeys, every project is a canvas for innovation.
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pb-20 pt-16 md:flex-row md:items-start md:justify-between md:gap-16 md:px-12">
        <div className="md:max-w-sm">
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
        </div>

        <div className="grid flex-1 gap-8 md:grid-cols-2">
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

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pb-24 md:flex-row md:items-start md:justify-between md:gap-16 md:px-12">
        <div className="grid flex-1 gap-8 md:grid-cols-2">
          <div className="relative h-80 w-full overflow-hidden bg-muted md:h-112">
            <Image
              src="/blog-1.png"
              alt="Community gathering on city stoop"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="relative h-80 w-full overflow-hidden bg-muted md:h-112">
            <Image
              src="/blog-2.png"
              alt="Street scene showcasing LFDY community"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        <div className="md:max-w-sm md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.25rem] text-muted-foreground">
            Rooted In Community
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            Headquartered in our hometown Düsseldorf, West End Germany, we
            operate stores across Europe.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Find our LFDY flagship stores in Amsterdam, Berlin, Cologne,
            Düsseldorf, Hamburg, Munich and London.
          </p>
          <a
            href="/stores"
            className="mt-6 inline-block text-base font-semibold text-primary underline underline-offset-4 transition hover:text-primary/80"
          >
            Check out our Stores
          </a>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 md:flex-row md:items-start md:justify-between md:gap-16 md:px-12">
        <div className="md:max-w-sm">
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
        </div>

        <div className="grid flex-1 gap-8 md:grid-cols-2">
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
