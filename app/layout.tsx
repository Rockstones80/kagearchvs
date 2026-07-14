import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/ui/custom-cursor";
import { Analytics } from "@vercel/analytics/react";

const metropolis = localFont({
  variable: "--font-grotesk",
  display: "swap",
  src: [
    {
      path: "./fonts/Metropolis/metropolis-latin-300-normal.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Metropolis/metropolis-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Metropolis/metropolis-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Metropolis/metropolis-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Metropolis/metropolis-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});


const fraunces = localFont({
  variable: "--font-fraunces",
  display: "swap",
  src: [
    {
      path: "./fonts/Fraunces/Fraunces72pt-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Fraunces/Fraunces72pt-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "KAGEARCHVS",
    template: "%s | KAGEARCHVS",
  },
  description:
    "KAGEARCHVS is more than clothing — it's how I translate emotion into design. Explore raw, expressive fashion that tells a story.",
  keywords: ["KAGEARCHVS", "fashion", "streetwear", "clothing", "lookbook"],
  authors: [{ name: "KAGEARCHVS" }],
  creator: "KAGEARCHVS",
  metadataBase: new URL("https://kagearchvs.xyz"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kagearchvs.xyz",
    siteName: "KAGEARCHVS",
    title: "KAGEARCHVS",
    description:
      "KAGEARCHVS is more than clothing : it's how I translate emotion into design. Explore raw, expressive fashion that tells a story.",
    images: [
      {
        url: "/hero-9.2.jpg",
        width: 1200,
        height: 630,
        alt: "KAGEARCHVS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAGEARCHVS",
    description:
      "KAGEARCHVS is more than clothing — it's how I translate emotion into design.",
    images: ["/hero-9.2.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${metropolis.variable} ${fraunces.variable} antialiased`}>
        <CartProvider>
          <CustomCursor />
          {children}
          <Analytics />
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
              duration: 3500,
              style: {
                background:    "#111",
                color:         "#fff",
                padding:       "14px 20px",
                borderRadius:  "999px",
                fontSize:      "0.82rem",
                fontWeight:    500,
                letterSpacing: "0.02em",
                boxShadow:     "0 8px 32px rgba(0,0,0,0.18)",
                fontFamily:    "var(--font-grotesk), sans-serif",
                maxWidth:      "360px",
              },
              success: {
                duration: 3500,
                iconTheme: {
                  primary: "#fff",
                  secondary: "#111",
                },
              },
              error: {
                duration: 4500,
                iconTheme: {
                  primary: "#fff",
                  secondary: "#e53e3e",
                },
                style: {
                  background: "#e53e3e",
                },
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
