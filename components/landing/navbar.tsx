"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { navItems } from "@/constants/nav-items";
import { navIcons } from "@/constants/nav-icons";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  textClass?: string;
  iconClass?: string;
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
}

const Navbar: React.FC<NavbarProps> = ({
  textClass = "text-gray-300",
  iconClass = "text-gray-300",
  logoSrc = "/navbar.png",
  logoWidth = 200,
  logoHeight = 150,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm md:bg-transparent transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${iconClass}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Left Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`${textClass} text-[12px] uppercase hover:opacity-70 transition-opacity ${
                  item.visibilityClass || ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Center Logo */}
          <Link
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer"
          >
            <Image
              src={logoSrc}
              alt="KAGEARCHVS"
              width={logoWidth}
              height={logoHeight}
              className="w-32 h-auto md:w-[170px] md:h-auto"
              priority
            />
          </Link>

          {/* Right Utility Icons */}
          <div className="flex items-center gap-3 md:gap-4 lg:gap-8">
            {navIcons.map((item, index) => (
              <button
                key={index}
                className={`hover:opacity-70 transition-opacity ${iconClass}`}
              >
                <item.Icon
                  {...item.iconProps}
                  className="w-5 h-5 md:w-6 md:h-6"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden ">
            <div className="flex flex-col py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${textClass} text-sm uppercase px-4 py-2 hover:opacity-70 transition-opacity ${
                    item.visibilityClass || ""
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
