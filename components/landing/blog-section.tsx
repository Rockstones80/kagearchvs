import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface BlogCard {
  image: string;
  title: string;
  description: string;
}

const blogCards: BlogCard[] = [
  {
    image: "/blog-1.png",
    title: "THE NEW WINTER COLLECTION",
    description:
      "The new Winter Collection styled by Veneda Carter features a wide variety of new styles, as well as reinvented classics.",
  },
  {
    image: "/blog-2.png",
    title: "GREETINGS FROM PARIS",
    description:
      "The Greetings from Paris Drop features new knit pieces like knit sweaters, knit jackets, and rib-knit beanies, along with a selection of other pieces.",
  },
  {
    image: "/blog-3.jpg",
    title: "NEW SUMMER COLLECTION",
    description:
      "We flew out to Mexico to shoot the latest collection – over 100 new pieces, including Rivet Tees, Boxy Jerseys, Cargo Shorts, Flannel Shirts and much more.",
  },
];

const BlogSection = () => {
  return (
    <section className="relative w-full bg-white border-t-2 border-b-2 border-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px h-[600px]">
        {blogCards.map((card, index) => (
          <div
            key={index}
            className="relative w-full overflow-hidden group cursor-pointer"
          >
            {/* Image */}
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              quality={100}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>

            {/* Text Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0  md:pt-8 md:px-4 z-10 pb-4">
              <h3 className="text-white text-2xl md:text-3xl font-bold uppercase">
                {card.title}
              </h3>
              <p className="text-white text-[15px] leading-relaxed max-w-md mb-4 flex items-end justify-between">
                {card.description}
                <ArrowRight className="w-10 h-7 group-hover/link:translate-x-1 transition-transform" />
              </p>
             
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
