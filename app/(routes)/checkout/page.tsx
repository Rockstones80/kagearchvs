"use client";

import React, { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { useCart } from "@/contexts/cart-context";
import { ArrowLeft, Lock } from "lucide-react";

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(".", ",") + " €";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear cart after successful checkout
    clearCart();
    setIsProcessing(false);

    // In a real app, you would redirect to a success page
    alert("Order placed successfully! (This is a demo)");
  };

  useEffect(() => {
    startTransition(() => {
      setIsMounted(true);
    });
  }, []);

  // Show loading during hydration to prevent mismatch
  if (!isMounted) {
    return (
      <main className="w-full min-h-screen">
        <Navbar
          textClass="text-gray-700 font-medium"
          iconClass="text-gray-700"
          logoSrc="/logo-2.png"
          // logoWidth={120}
          // logoHeight={120}
        />
        <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-28 pb-8 md:pb-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-96 bg-gray-200 rounded"></div>
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
          <h2 className="text-2xl font-bold text-black mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Add items to your cart before checkout.
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
        {/* Back Button */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-black mb-8 uppercase">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <section>
              <h2 className="text-lg font-bold text-black mb-4 uppercase">
                Contact Information
              </h2>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-lg font-bold text-black mb-4 uppercase">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="ES">Spain</option>
                  <option value="IT">Italy</option>
                </select>
              </div>
            </section>

            {/* Payment Information */}
            <section>
              <h2 className="text-lg font-bold text-black mb-4 uppercase flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Payment Information
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  maxLength={19}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    maxLength={5}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    maxLength={3}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 sticky top-4">
              <h2 className="text-lg font-bold text-black mb-6 uppercase">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 shrink-0 bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-black truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        Qty: {item.quantity} × {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6 border-t border-gray-300 pt-4">
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

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-black text-white py-4 uppercase text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Place Order
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
};

export default CheckoutPage;
