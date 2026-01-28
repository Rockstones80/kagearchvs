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
    slug: "kagearchvs-broken-angels-tee",
    title: "KAGEARCHVS BROKEN ANGELS TEE",
    price: "₦29,999.99",
    image: "/shop/89.JPG",
    badge: "New",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: [
      "/shop/23.JPG",
      "/shop/24.JPG",
      "/shop/L4.jpg",
      "/shop/89.JPG",
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
  },
  {
    id: "2",
    slug: "kagearchvs-broken-angels-sleeveless",
    title: "KAGEARCHVS BROKEN ANGELS SLEEVELESS",
    price: "₦27,999.99",
    image: "/shop/shop2.PNG",
    badge: "New",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images: [
      "/shop/L9.jpg",
      "/shop/29.JPG",
      "/shop/30.JPG",
      "/shop/D1.JPG",
      "/shop/shop2.png",
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
  },
  {
    id: "3",
    slug: "kagearchvs-broken-angels-hoodie",
    title: "KAGEARCHVS BROKEN ANGELS HOODIE",
    price: "₦49,999.99",
    image: "/shop/shop-6.jpg",
    badge: "New",
    description:
      "Premium quality Direct-To-Garment (DTG) print made with attention to detail and craftsmanship.",
    images:
     [
       "/shop/L1.jpg",
       "/shop/27.jpg",
       "/shop/28.jpg",
      "/shop/D1.JPG",
      "/public/D10.jpg",
      "/shop/shop-6.jpg", 
      
    ],
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
