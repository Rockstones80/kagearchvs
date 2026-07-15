"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import Navbar from "@/components/landing/navbar";
import { products, isComingSoon, type Product } from "@/lib/products";

export default function ShopPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  // Live stock for stock-managed products: slug → size → qty
  const [stock, setStock] = useState<Record<string, Record<string, number>> | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/stock")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.stock) setStock(data.stock);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const badgeFor = (product: Product): string | null => {
    if (isComingSoon(product)) return "Drops July 16";
    if (product.outOfStock) return "Sold Out";
    if (product.stockManaged && stock) {
      const sizes = stock[product.slug];
      const total = sizes
        ? Object.values(sizes).reduce((sum, n) => sum + n, 0)
        : null;
      if (total === 0) return "Sold Out";
    }
    return null;
  };

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".product-card");

    gsap.set(headerRef.current, { y: 30, opacity: 0 });
    gsap.set(cards ?? [],       { y: 40, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.to(headerRef.current, { y: 0, opacity: 1, duration: 1 })
      .to(cards ?? [],       { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, "-=0.5");
  }, []);

  return (
    <main
      className="shop-page"
      style={{
        background: "#fff",
        minHeight:  "100vh",
        fontFamily: "var(--font-grotesk)",
      }}
    >
      <Navbar variant="dark" />

      {/* ── Page header ──────────────────────────────────────────────── */}
      <div
        ref={headerRef}
        style={{
          paddingTop:    "40px",
          paddingBottom: "40px",
          textAlign:     "center",
        }}
      >
        <h1
          style={{
            fontSize:      "clamp(1.6rem, 3vw, 3.0rem)",
            fontWeight:    600,
            letterSpacing: "0.01em",
            color:         "#111",
            margin:        "0 0",
          }}
        >
          Products
        </h1>

        {/* Breadcrumb */}
        <p
          style={{
            fontSize:   "0.78rem",
            color:      "#888",
            margin:     0,
            display:    "flex",
            alignItems: "center",
            justifyContent: "center",
            gap:        "6px",
          }}
        >
          <Link href="/" style={{ color: "#888", textDecoration: "none" }}>
            Home
          </Link>
          <span style={{ fontSize: "0.65rem" }}>›</span>
          <span>Products</span>
        </p>
      </div>

      {/* ── Products grid ─────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "1400px",
          margin:   "0 auto",
          padding:  "0 24px 80px",
        }}
      >
        <div
          ref={gridRef}
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap:                 "32px 16px",
          }}
          className="shop-grid"
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="product-card"
              style={{ display: "block", textDecoration: "none" }}
            >
              {/* Image */}
              <div
                className="product-img-wrap"
                style={{
                  position:    "relative",
                  width:       "100%",
                  aspectRatio: "3/4",
                  overflow:    "hidden",
                  background:  "#fff",
                }}
              >
                {/* Front image */}
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  quality={100}
                  style={{
                    objectFit:      "cover",
                    objectPosition: "center top",
                  }}
                  className="product-img product-img-front"
                />

                {badgeFor(product) && (
                  <span
                    style={{
                      position:      "absolute",
                      top:           "12px",
                      left:          "12px",
                      background:    "#111",
                      color:         "#fff",
                      fontSize:      "0.65rem",
                      fontWeight:    600,
                      letterSpacing: "0.08em",
                      padding:       "5px 9px",
                      textTransform: "uppercase",
                      zIndex:        2,
                    }}
                  >
                    {badgeFor(product)}
                  </span>
                )}
              </div>

              {/* Info — centered */}
              <div
                style={{
                  paddingTop: "14px",
                  textAlign:  "center",
                }}
              >
                <p
                  style={{
                    fontSize:      "1rem",
                    fontWeight:    600,
                    color:         "#111",
                    margin:        "0 0 6px",
                    letterSpacing: "0.01em",
                    lineHeight:    1.4,
                  }}
                >
                  {product.title}
                </p>
                <p
                  style={{
                    fontSize:   "0.95rem",
                    fontWeight: 500,
                    color:      "#555",
                    margin:     0,
                  }}
                >
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .shop-page, .shop-page *,
        .shop-page h1, .shop-page p, .shop-page a, .shop-page span {
          font-family: var(--font-grotesk), "HK Grotesk", "Source Sans Pro", sans-serif !important;
        }
        @media (min-width: 768px) {
          .shop-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 40px 24px !important;
          }
        }
      `}</style>
    </main>
  );
}
