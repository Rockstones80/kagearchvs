"use client";

import React, { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/components/landing/navbar";
import { useCart } from "@/contexts/cart-context";
import toast from "react-hot-toast";

// Dynamically import PaystackButton to avoid SSR issues
const PaystackButton = dynamic(
  () =>
    import("@/components/checkout/paystack-button").then(
      (mod) => mod.PaystackButton
    ),
  { ssr: false }
);

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

/** "₦22,999.99" -> 22999.99 */
const parsePrice = (price: string) =>
  parseFloat(price.replace(/[₦,]/g, "").trim()) || 0;

const formatPrice = (price: number) =>
  "₦" +
  price.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const CheckoutShell = ({ children }: { children: React.ReactNode }) => (
  <main className="w-full min-h-screen bg-white">
    <Navbar variant="dark" />

    {/* Centered content */}
    <div className="flex justify-center px-4 pt-6 pb-16 md:pt-10">
      <div className="w-full max-w-5xl p-2 md:p-6">{children}</div>
    </div>
  </main>
);

const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/70 focus:outline-none focus:border-black transition-colors";

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    town: "",
    state: "",
    notes: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate shipping fee based on state
  const getShippingFee = () => {
    if (!formData.state) return 0;
    const state = formData.state.toLowerCase().trim();
    // Check if state is Lagos
    if (state === "lagos" || state.includes("lagos")) {
      return 5500;
    }
    // Outside Lagos
    return 8000;
  };

  const shippingFee = getShippingFee();
  const subtotal = getTotalPrice();
  const totalWithShipping = subtotal + shippingFee;

  // Paystack configuration
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: Math.round(totalWithShipping * 100), // Amount in kobo (multiply by 100)
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: formData.fullName,
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: formData.phone,
        },
        {
          display_name: "Shipping Address",
          variable_name: "address",
          value: `${formData.address}, ${formData.town}, ${formData.state}`,
        },
        {
          display_name: "Notes",
          variable_name: "notes",
          value: formData.notes,
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
              customerName: formData.fullName,
              customerPhone: formData.phone,
              shippingAddress: {
                address: formData.address,
                city: formData.town,
                state: formData.state,
                country: "Nigeria",
                notes: formData.notes,
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
              subtotal: subtotal,
              shippingFee: shippingFee,
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.town &&
      formData.state
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
      <CheckoutShell>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-16 mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </CheckoutShell>
    );
  }

  if (cartItems.length === 0) {
    return (
      <CheckoutShell>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-gray-700 hover:text-black uppercase mb-8 transition-colors"
        >
          <span aria-hidden="true">←</span> Back
        </Link>

        <div className="flex flex-col items-center text-center py-10">
          <h1 className="text-2xl font-bold text-black uppercase mb-2">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add items to your cart before checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block whitespace-nowrap px-8 py-3 bg-black text-white! uppercase text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </CheckoutShell>
    );
  }

  return (
    <CheckoutShell>
      {/* Back */}
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-gray-700 hover:text-black uppercase mb-8 transition-colors"
      >
        <span aria-hidden="true">←</span> Back
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold text-black uppercase mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        {/* ── Delivery details ─────────────────────────────────────── */}
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-5">
            Delivery details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Full name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Delivery address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className={`${inputClass} resize-y`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Town
                </label>
                <input
                  type="text"
                  name="town"
                  value={formData.town}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select state</option>
                  {NIGERIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Notes (optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={2}
                placeholder="Landmark, delivery instructions, etc."
                className={`${inputClass} resize-y`}
              />
            </div>
          </div>

          {/* Place order */}
          <div className="mt-8">
            <PaystackButton
              config={paystackConfig}
              onSuccess={onSuccess}
              onClose={onClose}
              isProcessing={isProcessing}
              disabled={!isFormValid()}
              label={`Place order · ${formatPrice(totalWithShipping)}`}
            />

            <p className="text-xs text-gray-500 mt-3 text-center">
              Secured by Paystack — Your payment information is encrypted
            </p>
          </div>
        </div>

        {/* ── Order summary ────────────────────────────────────────── */}
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-5">
            Order summary
          </h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size ?? ""}`}
                className="flex items-start gap-4"
              >
                <div className="relative w-16 h-16 shrink-0 bg-gray-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-black leading-snug">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.size && `Size ${item.size}`}
                    {item.size && " · "}
                    Qty {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-bold text-black whitespace-nowrap">
                  {formatPrice(parsePrice(item.price) * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 mt-6 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery</span>
              <span className="font-medium">
                {shippingFee > 0 ? formatPrice(shippingFee) : "Select a state"}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between">
            <span className="font-bold text-black">Total</span>
            <span className="font-bold text-black text-lg">
              {formatPrice(totalWithShipping)}
            </span>
          </div>
        </div>
      </div>
    </CheckoutShell>
  );
};

export default CheckoutPage;
