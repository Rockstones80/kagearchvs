import Link from "next/link";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export default function NotFound() {
  return (
    <main className="w-full bg-white min-h-screen">
      <Navbar
        textClass="text-gray-700 font-medium"
        iconClass="text-gray-700"
        logoSrc="/logo-2.png"
        // logoWidth={120}
        // logoHeight={120}
      />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h2 className="text-2xl font-bold text-black mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8 text-center">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-black text-white uppercase text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
      <Footer />
    </main>
  );
}

