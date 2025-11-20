"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { useCart } from "@/contexts/cart-context";
import { getProductBySlug } from "@/lib/products";
import { Bookmark, Minus, Plus, ArrowLeft } from "lucide-react";

const ProductPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>("Black");
  const [quantity, setQuantity] = useState<number>(1);

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
      });
    }
    // Reset quantity after adding
    setQuantity(1);
    // You could add a toast notification here
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

      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-28 pb-8 md:pb-12">
        {/* Back Button */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

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
              {product.badge && (
                <span className="absolute top-4 left-4 text-[10px] font-semibold text-black bg-white px-2 py-1">
                  {product.badge}
                </span>
              )}
              <button
                aria-label="Save product"
                className="absolute top-4 right-4 p-2 bg-white hover:bg-gray-100 transition-colors"
              >
                <Bookmark className="w-5 h-5 text-black" strokeWidth={1} />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 uppercase">
              {product.title}
            </h1>

            <p className="text-2xl md:text-3xl font-bold text-black mb-6">
              {product.price}
            </p>

            {product.description && (
              <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-3 uppercase">
                  Size
                </label>
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

            {/* Color Selection */}
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
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-black mb-3 uppercase">
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
              className="w-full bg-black text-white py-4 uppercase text-sm font-medium hover:bg-gray-800 transition-colors mb-4"
            >
              Add to Cart
            </button>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-200 space-y-4 text-sm text-gray-600">
              <div>
                <strong className="text-black">Free Shipping</strong> on orders
                over 100€
              </div>
              <div>
                <strong className="text-black">Returns</strong> within 30 days
              </div>
              <div>
                <strong className="text-black">Secure Payment</strong> with SSL
                encryption
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ProductPage;
