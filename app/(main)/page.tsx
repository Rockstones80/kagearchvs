import React from "react";
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import BlogSection from "@/components/landing/blog-section";
import Footer from "@/components/landing/footer";

const page = () => {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default page;
