import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import Image from "next/image";
import { ArrowLeft, Share2, Bookmark, User } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, postsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

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

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts: BlogPost[] = await client.fetch(postsQuery);
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const post: BlogPost = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  return (
    <main className="w-full text-black">
      <Navbar
        textClass="text-gray-700 font-medium"
        iconClass="text-gray-700"
        logoSrc="/logo-2.png"
      />

      {/* Back Button */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-24 pb-8 md:px-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </section>

      {/* Article Header */}
      <article className="mx-auto w-full max-w-4xl px-6 pb-12 md:px-12">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
          {post.title}
        </h1>

        {/* Author and Date */}
        <div className="flex items-center gap-2 mb-8 pb-8 border-b border-gray-200">
          <User className="w-5 h-5 text-gray-600" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 font-semibold">
              {post.author}
            </span>
            <span className="text-xs text-gray-500">
              {formatDate(post.publishedAt)}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <button
              aria-label="Share"
              className="text-gray-500 hover:text-black transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              aria-label="Bookmark"
              className="text-gray-500 hover:text-black transition-colors"
            >
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="relative w-full h-96 md:h-[500px] mb-12 rounded-lg overflow-hidden">
            <Image
              src={urlFor(post.image).width(1200).height(800).url()}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* Description */}
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          {post.description}
        </p>

        {/* Article Body */}
        {post.body && post.body.length > 0 && (
          <div className="article-content text-gray-700 leading-relaxed space-y-6">
            <PortableText
              value={post.body}
              components={{
                block: {
                  h1: ({ children }) => (
                    <h1 className="text-4xl font-bold text-black mt-8 mb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl font-bold text-black mt-6 mb-3">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-semibold text-black mt-4 mb-2">
                      {children}
                    </h3>
                  ),
                  normal: ({ children }) => (
                    <p className="text-lg mb-4">{children}</p>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
                      {children}
                    </ol>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold text-black">{children}</strong>
                  ),
                  link: ({ children, value }) => (
                    <a
                      href={value?.href}
                      className="text-black underline hover:text-gray-600"
                      target={value?.blank ? "_blank" : undefined}
                      rel={value?.blank ? "noopener noreferrer" : undefined}
                    >
                      {children}
                    </a>
                  ),
                },
              }}
            />
          </div>
        )}
      </article>

      <Footer />
    </main>
  );
};

export default Page;
