"use client";

import React, { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { useCart } from "@/contexts/cart-context";
import { ArrowLeft, Lock } from "lucide-react";
import toast from "react-hot-toast";

// Dynamically import PaystackButton to avoid SSR issues
const PaystackButton = dynamic(
  () =>
    import("@/components/checkout/paystack-button").then(
      (mod) => mod.PaystackButton
    ),
  { ssr: false }
);

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
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Paystack configuration
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: Math.round(getTotalPrice() * 100), // Amount in kobo (multiply by 100)
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: `${formData.firstName} ${formData.lastName}`,
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: formData.phone,
        },
        {
          display_name: "Shipping Address",
          variable_name: "address",
          value: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
        },
      ],
    },
  };

  // Success handler - Verify payment before completing
  const onSuccess = async (reference: {
    reference: string;
    trans: string;
    status: string;
    message: string;
    transaction: string;
    trxref: string;
  }) => {
    console.log("Payment callback received:", reference);

    try {
      // Verify payment with our backend
      const verifyResponse = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference: reference.reference }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyResponse.ok && verifyData.success) {
        console.log("Payment verified successfully:", verifyData);

        // Save order to database
        try {
          const orderResponse = await fetch("/api/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentReference: verifyData.data.reference,
              customerEmail: formData.email,
              customerName: `${formData.firstName} ${formData.lastName}`,
              customerPhone: formData.phone,
              shippingAddress: {
                address: formData.address,
                city: formData.city,
                postalCode: formData.postalCode,
                country: formData.country,
              },
              items: cartItems.map((item) => ({
                productId: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                size: item.size,
                color: item.color,
              })),
              totalAmount: verifyData.data.amount,
              currency: verifyData.data.currency,
              paidAt: verifyData.data.paidAt,
            }),
          });

          const orderData = await orderResponse.json();

          if (orderResponse.ok && orderData.success) {
            console.log("Order saved successfully:", orderData);
          } else {
            console.error("Failed to save order:", orderData);
          }
        } catch (orderError) {
          console.error("Error saving order:", orderError);
          // Don't fail the checkout if order save fails
        }

        // Clear cart only after verification
        clearCart();
        setIsProcessing(false);

        // Show success toast
        toast.success(
          `Payment verified! ₦${verifyData.data.amount.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} received. Order confirmed!`,
          {
            duration: 6000,
            style: {
              minWidth: "300px",
            },
          }
        );

        // You can redirect to a success page here
        // router.push('/order-success');
      } else {
        console.error("Payment verification failed:", verifyData);
        setIsProcessing(false);

        toast.error(
          `Payment verification failed. Please contact support with reference: ${reference.reference}`,
          {
            duration: 8000,
          }
        );
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setIsProcessing(false);

      toast.error(
        `Error verifying payment. Reference: ${reference.reference}. Please contact support.`,
        {
          duration: 8000,
        }
      );
    }
  };

  // Close handler
  const onClose = () => {
    console.log("Payment closed");
    setIsProcessing(false);
    toast.error("Payment cancelled. Your cart is still available.", {
      icon: "ℹ️",
    });
  };

  const formatPrice = (price: number) => {
    return (
      "₦" +
      price.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.firstName &&
      formData.lastName &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.postalCode &&
      formData.country
    );
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
        {/* <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link> */}

        <h1 className="text-2xl md:text-3xl font-bold text-black mb-8 uppercase">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  <option value="NG">Nigeria</option>
                  <option value="GH">Ghana</option>
                  <option value="KE">Kenya</option>
                  <option value="ZA">South Africa</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                </select>
              </div>
            </section>

            {/* Payment Note */}
            <section>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-black mb-1">
                      Secure Payment with Paystack
                    </h3>
                    <p className="text-sm text-gray-600">
                      You&apos;ll be redirected to Paystack&apos;s secure
                      payment gateway to complete your purchase. We accept all
                      major cards, bank transfers, and mobile money.
                    </p>
                  </div>
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

              {isMounted && (
                <PaystackButton
                  config={paystackConfig}
                  onSuccess={onSuccess}
                  onClose={onClose}
                  isProcessing={isProcessing}
                  disabled={!isFormValid()}
                />
              )}

              {!isMounted && (
                <button
                  disabled
                  className="w-full bg-black text-white py-4 uppercase text-sm font-medium opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span className="animate-spin">⏳</span>
                  Loading...
                </button>
              )}

              <p className="text-xs text-gray-500 mt-4 text-center">
                Secured by Paystack - Your payment information is encrypted
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CheckoutPage;
