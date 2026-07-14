"use client";

import React, { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/landing/navbar";
import { useCart } from "@/contexts/cart-context";
import { Minus, Plus, ShoppingBag } from "lucide-react";

const BACKGROUND_IMAGE = "/shop/banner.jpg";

/** "₦22,999.99" -> 22999.99 */
const parsePrice = (price: string) =>
  parseFloat(price.replace(/[₦,]/g, "").trim()) || 0;

const formatPrice = (price: number) =>
  "₦" +
  price.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/** Full-viewport banner background with floating navbar */
const CartShell = ({ children }: { children: React.ReactNode }) => (
  <main className="relative w-full min-h-screen">
    {/* Background */}
    <div className="fixed inset-0 z-0">
      <Image
        src={BACKGROUND_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>

    {/* Navbar floating over the background */}
    <div className="relative z-20">
      <Navbar variant="banner" />
    </div>

    {/* Centered panel */}
    <div className="relative z-10 flex justify-center px-4 pt-6 pb-16 md:pt-10">
      <div className="w-full max-w-3xl bg-white/75 backdrop-blur-md shadow-2xl p-6 md:p-12">
        {children}
      </div>
    </div>
  </main>
);

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
  } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setIsMounted(true);
    });
  }, []);

  // Show loading during hydration to prevent mismatch
  if (!isMounted) {
    return (
      <CartShell>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-16 mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="h-24 bg-gray-200 rounded mb-8"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </CartShell>
    );
  }

  if (cartItems.length === 0) {
    return (
      <CartShell>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-gray-700 hover:text-black uppercase mb-8 transition-colors"
        >
          <span aria-hidden="true">←</span> Back
        </Link>

        <div className="flex flex-col items-center text-center py-10">
          <ShoppingBag className="w-14 h-14 text-black mb-4" />
          <h1 className="text-2xl font-bold text-black uppercase mb-2">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link
            href="/shop"
            className="inline-block whitespace-nowrap px-8 py-3 bg-black text-white! uppercase text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </CartShell>
    );
  }

  return (
    <CartShell>
      {/* Back */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-gray-700 hover:text-black uppercase mb-8 transition-colors"
      >
        <span aria-hidden="true">←</span> Back
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold text-black uppercase mb-8">
        Your Cart
      </h1>

      {/* Items */}
      <div className="space-y-8">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size ?? ""}`} className="flex gap-4 md:gap-6">
            {/* Thumbnail */}
            <Link
              href={`/shop/${item.slug}`}
              className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 bg-gray-100 overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="112px"
                className="object-cover"
              />
            </Link>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <Link
                    href={`/shop/${item.slug}`}
                    className="block text-sm md:text-base font-bold text-black hover:underline leading-snug"
                  >
                    {item.title}
                  </Link>
                  {(item.size || item.color) && (
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      {item.size && `Size ${item.size}`}
                      {item.size && item.color && " · "}
                      {item.color}
                    </p>
                  )}
                </div>
                <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">
                  {formatPrice(parsePrice(item.price) * item.quantity)}
                </p>
              </div>

              {/* Quantity + remove */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-sm font-medium min-w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-gray-500 hover:text-black underline-offset-2 hover:underline transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-8" />

      {/* Total */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-lg font-bold text-black">Total</span>
        <span className="text-lg font-bold text-black">
          {formatPrice(getTotalPrice())}
        </span>
      </div>

      {/* Checkout */}
      <Link
        href="/checkout"
        className="block w-full bg-black text-white! text-center py-4 uppercase text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
      >
        Checkout
      </Link>
    </CartShell>
  );
};

export default CartPage;
