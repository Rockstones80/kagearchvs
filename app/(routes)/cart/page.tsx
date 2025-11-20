"use client";

import React, { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { useCart } from "@/contexts/cart-context";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(".", ",") + " €";
  };

  useEffect(() => {
    startTransition(() => {
      setIsMounted(true);
    });
  }, []);

  // Show loading during hydration to prevent mismatch
  if (!isMounted) {
    return (
      <main className="w-full bg-white min-h-screen">
        <Navbar
          textClass="text-gray-700 font-medium"
          iconClass="text-gray-700"
          logoSrc="/logo-2.png"
        />
        <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-28 pb-8 md:pb-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
              <div className="lg:w-96">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="w-full bg-white min-h-screen">
        <Navbar
          textClass="text-gray-700 font-medium"
          iconClass="text-gray-700"
          logoSrc="/logo-2.png"
        />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-black mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-black text-white uppercase text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full bg-white min-h-screen">
      <Navbar
        textClass="text-gray-700 font-medium"
        iconClass="text-gray-700"
        logoSrc="/logo-2.png"
      />

      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-28 pb-8 md:pb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-8 uppercase">
          Shopping Cart ({getTotalItems()}{" "}
          {getTotalItems() === 1 ? "item" : "items"})
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-200"
                >
                  {/* Product Image */}
                  <Link
                    href={`/shop/${item.slug}`}
                    className="relative w-full sm:w-32 h-48 sm:h-32 shrink-0 bg-gray-100"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-4">
                    <div className="flex-1">
                      <Link
                        href={`/shop/${item.slug}`}
                        className="text-sm md:text-base font-bold text-black hover:underline mb-1"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-gray-600 mb-4">{item.price}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs uppercase text-gray-600">
                          Quantity:
                        </span>
                        <div className="flex items-center border border-gray-300">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 text-sm font-medium min-w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <div className="flex items-start justify-between sm:flex-col sm:items-end sm:justify-start">
                      <p className="text-base md:text-lg font-bold text-black">
                        {formatPrice(
                          parseFloat(
                            item.price.replace(/[^\d.,]/g, "").replace(",", ".")
                          ) * item.quantity
                        )}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-gray-50 p-6 sticky top-4">
              <h2 className="text-lg font-bold text-black mb-6 uppercase">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-black">Total</span>
                    <span className="font-bold text-black text-lg">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-black text-white text-center py-3 uppercase text-sm font-medium hover:bg-gray-800 transition-colors mb-4"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="block w-full text-center py-3 uppercase text-sm font-medium text-black border border-black hover:bg-black hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CartPage;
