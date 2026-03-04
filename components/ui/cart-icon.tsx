"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import AnimatedLink from "@/components/ui/animated-link";

/** Cart icon with live item count — client component so useCart() works */
export default function CartIcon() {
  const { getTotalItems } = useCart();
  const count = getTotalItems();

  return (
    <Link
      href="/cart"
      className="group relative flex items-center gap-1"
      aria-label="Cart"
      style={{ fontSize: "15px", fontWeight: 500, textTransform: "uppercase" }}
    >
      <AnimatedLink bezier>
        {count > 0 ? `Cart (${count})` : "Cart"}
      </AnimatedLink>
    </Link>
  );
}
