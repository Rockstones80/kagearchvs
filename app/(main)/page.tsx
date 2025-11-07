import React from "react";
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Collection from "@/components/landing/collection";
import Hero2 from "@/components/landing/hero2";
import BlogSection from "@/components/landing/blog-section";

const page = () => {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Collection />
      <Hero2 />
      <BlogSection />
    </div>
  );
};

export default page;
