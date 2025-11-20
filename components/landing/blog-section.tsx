import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface BlogSectionPost {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

interface BlogSectionProps {
  posts: BlogSectionPost[];
}

const BlogSection = ({ posts }: BlogSectionProps) => {
  const blogCards = posts.slice(0, 3);

  if (blogCards.length === 0) return null;

  return (
    <section className="relative w-full bg-white border-t-2 border-b-2 border-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px h-[400px] sm:h-[500px] md:h-[600px]">
        {blogCards.map((card) => (
          <Link
            key={card._id}
            href={`/blog/${card.slug.current}`}
            className="relative w-full overflow-hidden group cursor-pointer"
          >
            {/* Image */}
            {card.image && (
              <Image
                src={urlFor(card.image).width(800).height(600).url()}
                alt={card.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                quality={100}
              />
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>

            {/* Text Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 md:pt-8 md:px-4 z-10 md:pb-4">
              <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase mb-2 md:mb-0">
                {card.title}
              </h3>
              <p className="text-white text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-md mb-2 md:mb-4 flex items-end justify-between gap-2">
                <span className="flex-1">
                  {typeof card.description === "string" &&
                  card.description.length > 100
                    ? `${card.description.slice(0, 100)}...`
                    : typeof card.description === "string" &&
                        card.description.length > 140
                      ? `${card.description.slice(0, 140)}...`
                      : card.description}
                </span>
                <ArrowRight className="w-6 h-5 sm:w-8 sm:h-6 md:w-10 md:h-7 shrink-0 group-hover/link:translate-x-1 transition-transform" />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
