"use client";

import { ArrowRight } from "lucide-react";
import { FaInstagram, FaTiktok, FaPinterestP } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <div className="mx-auto px-4 flex flex-col gap-16 pt-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-black">
              Subscribe
            </h3>
            <p className="mt-4 text-sm sm:text-base text-gray-600">
              Be the first to know about new drops, lookbooks, and events.
            </p>

            <form className="max-w-xl">
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <div className="flex items-center border border-gray-300 focus-within:border-black transition-colors">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-transparent px-5 py-4 text-base sm:text-lg placeholder:text-gray-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-4 text-gray-700 hover:text-black transition-colors"
                  aria-label="Submit email"
                >
                  <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center gap-6 text-2xl text-black">
            <Link
              href="https://instagram.com"
              aria-label="Instagram"
              className="hover:opacity-70 transition-opacity"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://tiktok.com"
              aria-label="TikTok"
              className="hover:opacity-70 transition-opacity"
            >
              <FaTiktok />
            </Link>
            <Link
              href="https://pinterest.com"
              aria-label="Pinterest"
              className="hover:opacity-70 transition-opacity"
            >
              <FaPinterestP />
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-sm text-black font-bold">
          © {currentYear}, kagearchvs
        </div>
      </div>
    </footer>
  );
};

export default Footer;
