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
}

export const products: Product[] = [
  {
    id: "1",
    slug: "kagearchvs-surfer-tee",
    title: "KAGEARCHVS SURFER TEE",
    price: "89,90 €",
    image: "/shop/shop-1.png",
    badge: "New",
    description:
      "A premium quality t-shirt featuring our signature surfer design. Made from 100% organic cotton for ultimate comfort and style.",
    images: ["/shop/shop-1.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
  },
  {
    id: "2",
    slug: "kagearchvs-psycho-tee",
    title: "KAGEARCHVS PSYCHO TEE",
    price: "54,90 €",
    image: "/shop/shop-2.png",
    badge: "New",
    description:
      "Bold and edgy design that makes a statement. Crafted with attention to detail and premium materials.",
    images: ["/shop/shop-2.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
  },
  {
    id: "3",
    slug: "kagearchvs-broken-tee",
    title: "KAGEARCHVS BROKEN TEE",
    price: "89,90 €",
    image: "/shop/shop-3.png",
    badge: "New",
    description:
      "Unique broken design pattern that stands out from the crowd. Premium quality construction.",
    images: ["/shop/shop-3.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
  },
  {
    id: "4",
    slug: "kagearchvs-time-tee",
    title: "KAGEARCHVS TIME TEE",
    price: "24,90 €",
    image: "/shop/shop-4.png",
    badge: "New",
    description:
      "Classic design with a modern twist. Perfect for everyday wear with timeless appeal.",
    images: ["/shop/shop-4.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
  },
  {
    id: "5",
    slug: "kagearchvs-world-domination-tee",
    title: "KAGEARCHVS WORLD DOMINATION TEE",
    price: "129,90 €",
    image: "/shop/shop-5.jpg",
    badge: "New",
    description:
      "Premium limited edition design. Bold statement piece for those who dare to stand out.",
    images: ["/shop/shop-5.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getAllProductSlugs = (): string[] => {
  return products.map((product) => product.slug);
};

