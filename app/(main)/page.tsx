import React from "react";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";
import IntroScreen from "@/components/ui/intro-screen";
// import BlogSection from "@/components/landing/blog-section";
// import Footer from "@/components/landing/footer";
// import { client } from "@/sanity/lib/client";
// import { postsQuery } from "@/sanity/lib/queries";
// import { type PortableTextBlock } from "@portabletext/react";

// interface BlogPost {
//   _id: string;
//   title: string;
//   slug: { current: string };
//   description: string;
//   publishedAt: string;
//   author: string;
//   image: {
//     asset: {
//       _ref: string;
//       _type: string;
//     };
//   };
//   body?: PortableTextBlock[];
// }

const page = async () => {
  // const blogPosts: BlogPost[] = (await client.fetch(postsQuery)) || [];

  return (
    <div className="relative">
      <IntroScreen />
      <Navbar />
      <Hero />
      {/* <BlogSection posts={blogPosts} /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default page;
