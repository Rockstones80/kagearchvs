"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/landing/navbar";
// import Footer from "@/components/landing/footer";
import { useCart } from "@/contexts/cart-context";
import { getProductBySlug, isComingSoon } from "@/lib/products";
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

  // Live per-size stock for stock-managed products (null = not loaded/unknown)
  const [sizeStock, setSizeStock] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    if (!product?.stockManaged) return;
    const sizes = product.sizes;
    let cancelled = false;
    fetch(`/api/stock?slug=${encodeURIComponent(product.slug)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { sizes?: Record<string, number> } | null) => {
        if (cancelled || !data?.sizes) return;
        const stock = data.sizes;
        setSizeStock(stock);
        // Make sure a sold-out size isn't preselected
        setSelectedSize((prev) => {
          if ((stock[prev] ?? 0) > 0) return prev;
          return sizes?.find((s) => (stock[s] ?? 0) > 0) ?? prev;
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [product?.stockManaged, product?.slug, product?.sizes]);

  const comingSoon = product ? isComingSoon(product) : false;
  const stockOf = (size: string): number | undefined =>
    product?.stockManaged && sizeStock ? sizeStock[size] ?? 0 : undefined;
  const soldOut =
    !!product?.stockManaged &&
    !!sizeStock &&
    (product.sizes ?? []).every((s) => (sizeStock[s] ?? 0) === 0);
  const selectedStock = stockOf(selectedSize);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  if (!product) {
    return (
      <main className="w-full bg-white min-h-screen">
        <Navbar variant="dark" />
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
        {/* <Footer /> */}
      </main>
    );
  }

  const handleAddToCart = () => {
    if (selectedStock !== undefined && quantity > selectedStock) {
      toast.error(
        selectedStock === 0
          ? `Size ${selectedSize} is sold out`
          : `Only ${selectedStock} left in size ${selectedSize}`
      );
      return;
    }

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
    if (selectedStock !== undefined && quantity > selectedStock) {
      toast.error(
        selectedStock === 0
          ? `Size ${selectedSize} is sold out`
          : `Only ${selectedStock} left in size ${selectedSize}`
      );
      return;
    }

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
    setQuantity((prev) => {
      if (selectedStock !== undefined && prev >= selectedStock) return prev;
      return prev + 1;
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <main className="w-full bg-white min-h-screen">
      <Navbar variant="dark" />

      <div className="max-w-6xl mx-auto px-4 pt-24 md:pt-20 pb-8 md:pb-12">
        {/* Back Button */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-gray-700 hover:text-black uppercase mb-8 transition-colors"
        >
          <span aria-hidden="true">←</span> Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative w-full bg-gray-100 overflow-hidden" style={{ aspectRatio: "4/5" }}>
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
            <h1 className="text-2xl md:text-3xl font-extrabold text-black uppercase">
              {product.title}
            </h1>

            <p className="text-xl font-medium text-gray-800 mt-1 mb-6">
              {product.price}
            </p>

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
                  {product.sizes.map((size) => {
                    const sizeSoldOut = stockOf(size) === 0;
                    return (
                      <button
                        key={size}
                        onClick={() => !sizeSoldOut && setSelectedSize(size)}
                        disabled={sizeSoldOut}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                          sizeSoldOut
                            ? "border-gray-200 text-gray-300 line-through cursor-not-allowed"
                            : selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-300 text-black hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
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
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
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

            {comingSoon ? (
              <button
                disabled
                className="w-full bg-black text-white py-4 uppercase text-sm font-bold rounded-lg cursor-not-allowed mb-8"
              >
                Drops July 16 · 7PM
              </button>
            ) : product.outOfStock || soldOut ? (
              <button
                disabled
                className="w-full bg-gray-200 border border-gray-300 text-gray-500 py-4 uppercase text-sm font-bold rounded-lg cursor-not-allowed mb-8"
              >
                Sold Out
              </button>
            ) : (
              <div className="flex gap-3 w-full mb-8">
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="cursor-pointer flex-1 bg-white border border-black text-black py-4 uppercase text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Add to Cart
                </button>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="cursor-pointer flex-1 bg-black text-white py-4 uppercase text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            )}

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
                  <div className="pb-4 text-sm text-gray-600 leading-relaxed space-y-2">
                    {product.details ? (
                      product.details.map((line) => <p key={line}>{line}</p>)
                    ) : (
                      <p>
                        {product.description ||
                          "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship."}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* DELIVERY INFORMATION */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-sm font-medium uppercase">
                    DELIVERY INFORMATION
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openAccordion === "shipping" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "shipping" && (
                  <div className="pb-4 text-sm text-gray-600 space-y-2">
                    {product.delivery ? (
                      product.delivery.map((line) => <p key={line}>{line}</p>)
                    ) : (
                      <>
                        <p>
                        Please confirm by reading the delivery information of each item. Also, ensure you provide a valid email and phone number when placing an order to avoid communication issues.
                        </p>
                        <p>All preordered items typically take 2-3 weeks for production. Shipping commences after.</p>
                        <p>
                        Progress of pre-ordered items will be shared via kagearchvs™ instagram story @prxjectkage.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 bg-black/50 z-[200]"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="fixed right-0 top-0 h-full bg-white w-full sm:w-[400px] overflow-y-auto shadow-2xl z-[201]"
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
