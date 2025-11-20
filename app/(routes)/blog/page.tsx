import React from "react";
import Link from "next/link";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import Image from "next/image";
import { Share2, Bookmark, User } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";
import { type PortableTextBlock } from "@portabletext/react";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  publishedAt: string;
  author: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  body?: PortableTextBlock[];
}

const Page = async () => {
  const blogPosts: BlogPost[] = (await client.fetch(postsQuery)) || [];

  if (blogPosts.length === 0) {
    return (
      <main className="w-full text-black">
        <Navbar
          textClass="text-gray-700 font-medium"
          iconClass="text-gray-700"
          logoSrc="/logo-2.png"
        />
        <section className="mx-auto w-full max-w-7xl px-6 pt-32 pb-12 md:px-12">
          <p className="text-center text-gray-600">
            No blog posts found. Create your first post in Sanity Studio!
          </p>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full text-black">
      <Navbar
        textClass="text-gray-700 font-medium"
        iconClass="text-gray-700"
        logoSrc="/logo-2.png"
      />
      {/* Hero Section with Featured Blog */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-20 sm:pt-24 md:pt-32 pb-8 md:pb-12 md:px-12">
        {/* <h1 className="text-4xl md:text-5xl font-bold mb-8 text-black">
          Blogs
        </h1>
        <div className="border-b border-gray-200 mb-8"></div> */}

        {/* Featured Blog Card */}
        <Link href={`/blog/${blogPosts[0]?.slug.current}`}>
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="relative w-full md:w-1/2 h-64 md:h-112">
                {blogPosts[0]?.image && (
                  <Image
                    src={urlFor(blogPosts[0].image)
                      .width(800)
                      .height(600)
                      .url()}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover "
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                )}
              </div>

              {/* Text Content Section */}
              <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-black">
                    {blogPosts[0]?.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-4 md:mb-6">
                    {blogPosts[0]?.description}
                  </p>
                </div>

                {/* Author, Date, and Icons */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{blogPosts[0]?.author}</span>
                    <span>•</span>
                    <span>
                      {blogPosts[0]?.publishedAt &&
                        formatDate(blogPosts[0].publishedAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <button
                      aria-label="Share"
                      className="text-gray-500 hover:text-black transition-colors"
                    >
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      aria-label="Bookmark"
                      className="text-gray-500 hover:text-black transition-colors"
                    >
                      <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Link>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 pb-16 md:pb-24 md:px-12">
        <div className="mb-8 md:mb-12">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25rem] text-muted-foreground">
            Latest Posts
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1).map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <article className="bg-white rounded-lg overflow-hidden cursor-pointer flex flex-col transition-transform duration-500 hover:scale-97">
                {/* Image Section */}
                <div className="relative w-full h-64 overflow-hidden rounded-xl">
                  {post.image && (
                    <Image
                      src={urlFor(post.image).width(600).height(400).url()}
                      alt={post.title}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-4 sm:py-5">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-black leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mb-3 sm:mb-4 font-light">
                    {post.description}
                  </p>

                  {/* Author and Date */}
                  <div className="flex items-start gap-2 mt-auto">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mt-0.5 shrink-0" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] sm:text-xs text-gray-700 font-semibold">
                        {post.author || "KAGEARCHVS"}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-500">
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Page;
