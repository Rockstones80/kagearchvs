"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { Bookmark } from "lucide-react";
import { products } from "@/lib/products";

const ShopPage = () => {
  return (
    <main className="w-full bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-[365px] overflow-hidden">
        <Image
          src="/hero-2.jpg"
          alt="ComplexCon Drop"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </section>

      {/* Products Meta Bar */}
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 pt-6 md:pt-10 gap-3 md:gap-4">
        <div className="text-xs uppercase tracking-wide text-gray-700">
          {products.length} products
        </div>
        <button className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-700 hover:text-black transition-colors">
          Filters &amp; Sorting
          <span className="text-lg">≡</span>
        </button>
      </section>

      {/* Products Grid */}
      <section className="py-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-px">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="relative bg-white group"
            >
              <div className="relative w-full aspect-3/4 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  quality={100}
                />

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-4 left-4 text-[10px] font-semibold text-black">
                    {product.badge}
                  </span>
                )}

                {/* Bookmark icon */}
                <button
                  aria-label="Save product"
                  className="absolute top-4 right-4 p-1 transition-colors z-10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Bookmark className="w-6 h-6 text-black/50" strokeWidth={1} />
                </button>
              </div>

              <div className="px-3 md:px-4 pt-1 pb-4 md:pb-7">
                <h3 className="text-xs sm:text-sm font-extrabold text-black line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-xs sm:text-sm text-black mt-1">
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ShopPage;
