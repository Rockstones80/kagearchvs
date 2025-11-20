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
}

export const products: Product[] = [
  {
    id: "1",
    slug: "kagearchvs-retail-therapy-tee",
    title: "KAGEARCHVS RETAIL THERAPY TEE",
    price: "₦22,999.99",
    image: "/shop/shop1.png",
    badge: "New",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: ["/shop/shop1.png"],
    sizes: ["S", "M", "L"],
    sizeGuide: [
      { size: "S", length: "48", chest: "40", shoulder: "33" },
      { size: "M", length: "50", chest: "42", shoulder: "34" },
      { size: "L", length: "52", chest: "44", shoulder: "35" },
    ],
  },
  {
    id: "2",
    slug: "kagearchvs-broken-angels-sleeveless",
    title: "KAGEARCHVS BROKEN ANGELS SLEEVELESS",
    price: "₦25,999.99",
    image: "/shop/shop2.png",
    badge: "New",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: ["/shop/shop2.png"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    sizeGuide: [
      { size: "S", length: "68", chest: "53", shoulderWidth: "42" },
      { size: "M", length: "71", chest: "56", shoulderWidth: "45" },
      { size: "L", length: "74", chest: "59", shoulderWidth: "48" },
      { size: "XL", length: "77", chest: "62", shoulderWidth: "51" },
      { size: "2XL", length: "80", chest: "65", shoulderWidth: "54" },
      { size: "3XL", length: "83", chest: "68", shoulderWidth: "57" },
    ],
  },
  {
    id: "3",
    slug: "kagearchvs-the-dreaming-tee",
    title: "KAGEARCHVS THE DREAMING TEE",
    price: "₦22,999.99",
    image: "/shop/shop3.png",
    badge: "New",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: ["/shop/shop3.png"],
    sizes: ["S", "M", "L"],
    sizeGuide: [
      { size: "S", length: "48", chest: "40", shoulder: "33" },
      { size: "M", length: "50", chest: "42", shoulder: "34" },
      { size: "L", length: "52", chest: "44", shoulder: "35" },
    ],
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getAllProductSlugs = (): string[] => {
  return products.map((product) => product.slug);
};
