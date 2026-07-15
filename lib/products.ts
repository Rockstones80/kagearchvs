export interface SizeGuide {
  size: string;
  length: string;
  chest?: string;
  shoulder?: string;
  shoulderWidth?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: string;
  image: string;
  badge?: string;
  description?: string;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  sizeGuide?: SizeGuide[];
  outOfStock?: boolean;
  /** ISO date — product is not purchasable before this moment */
  releaseDate?: string;
  /** true = per-size stock lives in Supabase (product_stock table) */
  stockManaged?: boolean;
  /** bullet lines for the PRODUCT DETAILS accordion */
  details?: string[];
  /** bullet lines for the DELIVERY INFORMATION accordion */
  delivery?: string[];
}

/** July 16, 2026 · 7:00 PM WAT
 *  Currently set to the past — the gate is OPEN and products are purchasable.
 *  Set back to "2026-07-16T19:00:00+01:00" to re-arm the countdown gate. */
export const SALE_START = "2026-07-01T00:00:00+01:00";

export const isComingSoon = (product: Product): boolean =>
  !!product.releaseDate && Date.now() < new Date(product.releaseDate).getTime();

export const products: Product[] = [
  {
    id: "10",
    slug: "kagearchvs-dreaming-tank-top",
    title: "KAGEARCHVS DREAMING TANK TOP",
    price: "₦24,999.99",
    image: "/shop/dreaming-tank/tank.png",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: ["/shop/dreaming-tank/tank.png"],
    sizes: ["S", "M", "L"],
    releaseDate: SALE_START,
    stockManaged: true,
    details: [
      "Premium quality Direct-To-Garment (DTG) print.",
      "Women's Sizing",
    ],
    delivery: [
      "Ready to ship.",
      "For Domestic Orders, 5-7 Business Days after order processing.",
    ],
  },
  {
    id: "11",
    slug: "kagearchvs-wordmark-tee",
    title: "KAGEARCHVS WORDMARK TEE",
    price: "₦29,999.99",
    image: "/shop/wordmark/wordmark.png",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: ["/shop/wordmark/wordmark.png"],
    sizes: ["S", "M", "L", "XL"],
    sizeGuide: [
      { size: "S", length: "68", chest: "53", shoulderWidth: "42" },
      { size: "M", length: "71", chest: "56", shoulderWidth: "45" },
      { size: "L", length: "74", chest: "59", shoulderWidth: "48" },
      { size: "XL", length: "77", chest: "62", shoulderWidth: "51" },
    ],
    releaseDate: SALE_START,
    stockManaged: true,
    details: [
      "Premium quality Direct-To-Garment (DTG) print.",
      "Men's Sizing",
    ],
    delivery: [
      "Ready to ship.",
      "For Domestic Orders, 5-7 Business Days after order processing.",
    ],
  },
];

/* Previous collection — removed from the shop (restore from git history if needed)
  {
    id: "1",
    slug: "kagearchvs-broken-angels-tee",
    title: "KAGEARCHVS BROKEN ANGELS TEE",
    price: "₦29,999.99",
    image: "/shop/broken/L4.jpg",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: [
      "/shop/broken/L4.jpg",
      "/shop/broken/jp.png",
      "/shop/broken/IMG_3349.png",
      "/shop/broken/IMG_3350.png",
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    sizeGuide: [
      { size: "S", length: "68", chest: "53", shoulderWidth: "42" },
      { size: "M", length: "71", chest: "56", shoulderWidth: "45" },
      { size: "L", length: "74", chest: "59", shoulderWidth: "48" },
      { size: "XL", length: "77", chest: "62", shoulderWidth: "51" },
      { size: "2XL", length: "80", chest: "65", shoulderWidth: "54" },
      { size: "3XL", length: "83", chest: "68", shoulderWidth: "57" },
    ],
    outOfStock: true,
  },
  {
    id: "2",
    slug: "kagearchvs-broken-angels-sleeveless",
    title: "KAGEARCHVS BROKEN ANGELS SLEEVELESS",
    price: "₦27,999.99",
    image: "/shop/sleeveless/IMG_1978.jpg",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: [
      "/shop/sleeveless/IMG_1978.jpg",
      "/shop/sleeveless/IMG_1984.jpg",
      "/shop/sleeveless/IMG_0811.png",
      "/shop/sleeveless/IMG_0812.png",

    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    sizeGuide: [
      { size: "S", length: "68", chest: "53", shoulderWidth: "42" },
      { size: "M", length: "71", chest: "56", shoulderWidth: "45" },
      { size: "L", length: "74", chest: "59", shoulderWidth: "48" },
      { size: "XL", length: "77", chest: "62", shoulderWidth: "51" },
      { size: "2XL", length: "80", chest: "65", shoulderWidth: "54" },
      { size: "3XL", length: "83", chest: "68", shoulderWidth: "57" },
    ],
    outOfStock: true,
  },
  {
    id: "3",
    slug: "kagearchvs-broken-angels-hoodie",
    title: "KAGEARCHVS BROKEN ANGELS HOODIE",
    price: "₦49,999.99",
    image: "/shop/kagehoodie/hoodie.jpg",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: [
      "/shop/kagehoodie/hoodie.jpg",
      "/shop/kagehoodie/hoodie_1.jpg",
      "/shop/shop-6.jpg",
    ],
    sizes: ["S", "M", "L"],
    sizeGuide: [
      { size: "S", length: "48", chest: "40", shoulder: "33" },
      { size: "M", length: "50", chest: "42", shoulder: "34" },
      { size: "L", length: "52", chest: "44", shoulder: "35" },
    ],
    outOfStock: true,
  },
  {
    id: "4",
    slug: "kagearchvs-time-tee",
    title: "KAGEARCHVS TIME TEE",
    price: "₦29,999.99",
    image: "/shop/time/time.jpg",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: [
      "/shop/time/time.jpg",
      "/shop/time/IMG_3343.png",
      "/shop/time/IMG_3344.png",
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    sizeGuide: [
      { size: "S", length: "68", chest: "53", shoulderWidth: "42" },
      { size: "M", length: "71", chest: "56", shoulderWidth: "45" },
      { size: "L", length: "74", chest: "59", shoulderWidth: "48" },
      { size: "XL", length: "77", chest: "62", shoulderWidth: "51" },
      { size: "2XL", length: "80", chest: "65", shoulderWidth: "54" },
      { size: "3XL", length: "83", chest: "68", shoulderWidth: "57" },
    ],
    outOfStock: true,
  },
  {
    id: "5",
    slug: "kagearchvs-world-domination-tee",
    title: "KAGEARCHVS WORLD DOMINATION TEE",
    price: "₦24,999.99",
    image: "/shop/world/world.jpg",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: [
      "/shop/world/world.jpg",
      "/shop/world/IMG_3342.png",
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    sizeGuide: [
      { size: "S", length: "68", chest: "53", shoulderWidth: "42" },
      { size: "M", length: "71", chest: "56", shoulderWidth: "45" },
      { size: "L", length: "74", chest: "59", shoulderWidth: "48" },
      { size: "XL", length: "77", chest: "62", shoulderWidth: "51" },
      { size: "2XL", length: "80", chest: "65", shoulderWidth: "54" },
      { size: "3XL", length: "83", chest: "68", shoulderWidth: "57" },
    ],
    outOfStock: true,
  },
  {
    id: "6",
    slug: "kagearchvs-the-dreaming-tee",
    title: "KAGEARCHVS THE DREAMING TEE",
    price: "₦22,999.99",
    image: "/shop/dream/dream.jpg",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: [
      "/shop/dream/dream.jpg",
      "/shop/dream/IMG_0806.png",
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    sizeGuide: [
      { size: "S", length: "68", chest: "53", shoulderWidth: "42" },
      { size: "M", length: "71", chest: "56", shoulderWidth: "45" },
      { size: "L", length: "74", chest: "59", shoulderWidth: "48" },
      { size: "XL", length: "77", chest: "62", shoulderWidth: "51" },
      { size: "2XL", length: "80", chest: "65", shoulderWidth: "54" },
      { size: "3XL", length: "83", chest: "68", shoulderWidth: "57" },
    ],
    outOfStock: true,
  },
  {
    id: "7",
    slug: "kagearchvs-psycho-tee",
    title: "KAGEARCHVS PSYCHO TEE",
    price: "₦24,999.99",
    image: "/shop/pyscho/IMG_2045.jpg",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: [
      "/shop/pyscho/IMG_2045.jpg",
      "/shop/pyscho/IMG_3341.png",
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    sizeGuide: [
      { size: "S", length: "68", chest: "53", shoulderWidth: "42" },
      { size: "M", length: "71", chest: "56", shoulderWidth: "45" },
      { size: "L", length: "74", chest: "59", shoulderWidth: "48" },
      { size: "XL", length: "77", chest: "62", shoulderWidth: "51" },
      { size: "2XL", length: "80", chest: "65", shoulderWidth: "54" },
      { size: "3XL", length: "83", chest: "68", shoulderWidth: "57" },
    ],
    outOfStock: true,
  },
  {
    id: "8",
    slug: "kagearchvs-retail-therapy-tee",
    title: "KAGEARCHVS RETAIL THERAPY TEE",
    price: "₦22,999.99",
    image: "/shop/retail/retail.jpg",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: [
      "/shop/retail/retail.jpg",
      "/shop/retail/IMG_0805.png",
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    sizeGuide: [
      { size: "S", length: "68", chest: "53", shoulderWidth: "42" },
      { size: "M", length: "71", chest: "56", shoulderWidth: "45" },
      { size: "L", length: "74", chest: "59", shoulderWidth: "48" },
      { size: "XL", length: "77", chest: "62", shoulderWidth: "51" },
      { size: "2XL", length: "80", chest: "65", shoulderWidth: "54" },
      { size: "3XL", length: "83", chest: "68", shoulderWidth: "57" },
    ],
    outOfStock: true,
  },
  {
    id: "9",
    slug: "kagearchvs-surfer-tee",
    title: "KAGEARCHVS SURFER TEE",
    price: "₦24,999.99",
    image: "/shop/surfer/sur.jpg",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: [
      "/shop/surfer/sur.jpg",
      "/shop/surfer/IMG_3340.png",
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    sizeGuide: [
      { size: "S", length: "68", chest: "53", shoulderWidth: "42" },
      { size: "M", length: "71", chest: "56", shoulderWidth: "45" },
      { size: "L", length: "74", chest: "59", shoulderWidth: "48" },
      { size: "XL", length: "77", chest: "62", shoulderWidth: "51" },
      { size: "2XL", length: "80", chest: "65", shoulderWidth: "54" },
      { size: "3XL", length: "83", chest: "68", shoulderWidth: "57" },
    ],
    outOfStock: true,
  },
];
*/

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getAllProductSlugs = (): string[] => {
  return products.map((product) => product.slug);
};
