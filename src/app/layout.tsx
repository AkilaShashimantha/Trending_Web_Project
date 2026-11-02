import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://taxestimator.online"),
  title: {
    default: "TaxEstimator Online | 1099 Freelance, Fee & Wealth Engines",
    template: "%s | TaxEstimator Online",
  },
  description:
    "Precision financial calculators for solopreneurs, independent creators, and freelancers. 1099 Self-Employment Tax Estimator, Stripe/PayPal Fee Optimizer, and HYSA Compound Wealth vs Inflation Shield.",
  keywords: [
    "1099 tax calculator",
    "freelance tax estimator",
    "stripe fee calculator",
    "paypal fee calculator",
    "reverse invoice calculator",
    "hysa compound interest calculator",
    "inflation calculator",
    "solopreneur finance",
  ],
  authors: [{ name: "TaxEstimator Online Engineering Team" }],
  openGraph: {
    title: "TaxEstimator Online | 1099 Freelance, Fee & Wealth Engines",
    description:
      "Engineered for modern freelancers and creators. Accurate Schedule SE calculations, reverse invoice fee pass-through, and inflation-adjusted HYSA compounding.",
    url: "https://taxestimator.online",
    siteName: "TaxEstimator Online",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxEstimator Online | 1099 Freelance, Fee & Wealth Engines",
    description:
      "Calculators for 1099 self-employment taxes, Stripe/PayPal processor cuts, and HYSA real purchasing power.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseClientId =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-0000000000000000";

  return (
    <html lang="en" className="h-full">
      <head>
        {/* Google AdSense Script - Client Verification */}
        <Script
          id="adsense-script"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="flex min-h-full flex-col bg-[#FBFBF9] text-slate-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
