"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { useCart } from "@/contexts/cart-context";
import { getProductBySlug } from "@/lib/products";
import { Minus, Plus, X, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const ProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>("M");
  // const [selectedColor, setSelectedColor] = useState<string>("Black");
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  if (!product) {
    return (
      <main className="w-full bg-white min-h-screen">
        <Navbar
          textClass="text-gray-700 font-medium"
          iconClass="text-gray-700"
          logoSrc="/logo-2.png"
        />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h2 className="text-2xl font-bold text-black mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-black text-white uppercase text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const handleAddToCart = () => {
    // Add the product multiple times based on quantity
    // The cart context will merge them into one item with correct quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        image: product.image,
        badge: product.badge,
        size: selectedSize,
        // color: selectedColor,
      });
    }

    // Show success toast
    toast.success(
      `${quantity} ${quantity > 1 ? "items" : "item"} added to cart! (${selectedSize})`,
      {
        duration: 3000,
        icon: "🛒",
      }
    );

    // Reset quantity after adding
    setQuantity(1);
  };

  const handleBuyNow = () => {
    // Add to cart first
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        image: product.image,
        badge: product.badge,
        size: selectedSize,
        // color: selectedColor,
      });
    }

    // Show toast and redirect
    toast.success("Redirecting to checkout...", {
      duration: 2000,
      icon: "⚡",
    });

    // Then redirect to checkout
    router.push("/checkout");
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <main className="w-full bg-white min-h-screen">
      <Navbar
        textClass="text-gray-700 font-medium"
        iconClass="text-gray-700"
        logoSrc="/logo-2.png"
      />

      <div className="max-w-6xl mx-auto px-4 pt-24 md:pt-28 pb-8 md:pb-12">
        {/* Back Button */}
        {/* <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {/* {product.badge && (
                <span className="absolute top-4 left-4 text-[10px] font-semibold text-black bg-white px-2 py-1">
                  {product.badge}
                </span>
              )}
              <button
                aria-label="Save product"
                className="absolute top-4 right-4 p-2 bg-white hover:bg-gray-100 transition-colors"
              >
                <Bookmark className="w-5 h-5 text-black" strokeWidth={1} />
              </button> */}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold text-black uppercase">
              {product.title}
            </h1>

            <p className="text-2xl font-semibold text-black mb-6">
              {product.price}
            </p>
            {/* 
            {product.description && (
              <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>
            )} */}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-14 mb-1">
                  <label className="block text-sm font-medium text-black uppercase">
                    Size
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs text-gray-600 hover:text-black underline cursor-pointer"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 text-black hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-3 uppercase">
                  Color
                </label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border text-sm font-medium transition-colors ${
                        selectedColor === color
                          ? "border-black bg-black text-white"
                          : "border-gray-300 text-black hover:border-black"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )} */}

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-black mb-1 uppercase">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-sm font-medium min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="cursor-pointer w-3/4 bg-white border border-black text-black py-4 uppercase text-sm font-bold hover:bg-gray-50 transition-colors mb-3"
            >
              Add to Cart
            </button>

            {/* Buy it Now Button */}
            <button
              onClick={handleBuyNow}
              className="cursor-pointer w-3/4 bg-black text-white py-4 uppercase text-sm font-bold hover:bg-gray-800 transition-colors mb-8"
            >
              Buy it now
            </button>

            {/* Accordion Sections */}
            <div className="border-t border-gray-200">
              {/* BESCHREIBUNG (Description) */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion("description")}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-sm font-medium uppercase">
                    PRODUCT DETAILS
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openAccordion === "description" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "description" && (
                  <div className="pb-4 text-sm text-gray-600 leading-relaxed">
                    {product.description ||
                      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship."}
                  </div>
                )}
              </div>

              {/* SIZE & FIT */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion("sizefit")}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-sm font-medium uppercase">
                    SIZE & FIT
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openAccordion === "sizefit" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "sizefit" && (
                  <div className="pb-4 text-sm text-gray-600 space-y-2">
                    <p>True to size fit</p>
                    <p>100% Cotton</p>
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="text-black underline hover:no-underline"
                    >
                      View Size Guide
                    </button>
                  </div>
                )}
              </div>

              {/* SHIPPING & RETURNS */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-sm font-medium uppercase">
                    SHIPPING & RETURNS
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openAccordion === "shipping" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "shipping" && (
                  <div className="pb-4 text-sm text-gray-600 space-y-2">
                    <p>
                    Please confirm by reading the delivery information of each item. Also, ensure you provide a valid email and phone number when placing an order to avoid communication issues.
                    </p>
                    <p>All preordered items typically take 2-3 weeks for production. Shipping commences after.</p>
                    <p>
                    Progress of pre-ordered items will be shared via kagearchvs™ instagram story @prxjectkage.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="fixed right-0 top-0 h-full bg-white w-full sm:w-[400px] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold uppercase mb-1">Size Guide</h2>
                <p className="text-sm text-gray-600 uppercase">
                  {product.title}
                </p>
              </div>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="p-1 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button className="pb-3 px-1 border-b-2 border-black font-semibold text-sm uppercase">
                  CM
                </button>
              </div>

              {/* Size Table */}
              <div className="overflow-x-auto">
                {product.sizeGuide && product.sizeGuide.length > 0 ? (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-bold uppercase">
                          Size
                        </th>
                        <th className="text-center py-3 px-4 font-bold uppercase">
                          Length
                        </th>
                        <th className="text-center py-3 px-4 font-bold uppercase">
                          {product.sizeGuide[0].chest ? "Chest" : "Bust Size"}
                        </th>
                        <th className="text-center py-3 px-4 font-bold uppercase">
                          {product.sizeGuide[0].shoulderWidth
                            ? "Shoulder Width"
                            : "Shoulder"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.sizeGuide.map((item) => (
                        <tr
                          key={item.size}
                          className="border-b border-gray-100"
                        >
                          <td className="py-4 px-4 font-semibold">
                            {item.size}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {item.length}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {item.chest || item.chest}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {item.shoulderWidth || item.shoulder}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-sm text-gray-600">
                    Size guide not available for this product.
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setShowSizeGuide(false)}
                className="w-full mt-8 bg-black text-white py-4 uppercase text-sm font-bold transition-colors"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductPage;
