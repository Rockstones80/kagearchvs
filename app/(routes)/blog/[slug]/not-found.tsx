import Link from "next/link";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="w-full text-black">
      <Navbar
        textClass="text-gray-700 font-medium"
        iconClass="text-gray-700"
        logoSrc="/logo-2.png"
      />
      <section className="mx-auto w-full max-w-4xl px-6 pt-32 pb-24 md:px-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist
           has been removed.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </section>
      <Footer />
    </main>
  );
}
