"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Calculator, DollarSign, Menu, Newspaper, ShieldCheck, TrendingUp, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      href: "/tools/freelance-tax-estimator",
      label: "1099 Tax Estimator",
      icon: Calculator,
      tag: "IRS 2024/25",
    },
    {
      href: "/tools/stripe-fee-calculator",
      label: "Stripe & PayPal Fee Optimizer",
      icon: DollarSign,
      tag: "Reverse Calc",
    },
    {
      href: "/tools/hysa-compound-calculator",
      label: "HYSA Wealth vs Inflation",
      icon: TrendingUp,
      tag: "Real Yield",
    },
    {
      href: "/news",
      label: "News Desk",
      icon: Newspaper,
      tag: "Editorial",
    },
    {
      href: "/about",
      label: "Methodology",
      icon: ShieldCheck,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#EAEAE3] bg-[#FBFBF9]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-spruce-800 text-white shadow-sm transition-transform group-hover:scale-105">
            <span className="font-mono text-base font-bold text-emeraldTactile-500">C</span>
            <span className="font-mono text-base font-bold text-amberWarm-500">P</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-slate-900">CashPulse</span>
              <span className="inline-flex items-center rounded-full bg-emeraldTactile-50 px-2 py-0.5 text-[10px] font-medium text-emeraldTactile-700">
                FinTech Suite
              </span>
            </div>
            <span className="text-[11px] text-slate-500">Solopreneur Wealth & Tax Engines</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-spruce-800 text-white"
                    : "text-slate-700 hover:bg-[#F4F4F0] hover:text-slate-900"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-emeraldTactile-500" : "text-slate-500"}`} />
                <span>{link.label}</span>
                {link.tag && (
                  <span
                    className={`ml-1 rounded px-1.5 py-0.2 text-[9px] font-semibold ${
                      isActive
                        ? "bg-emeraldTactile-700 text-emerald-100"
                        : "bg-[#EAEAE3] text-slate-600"
                    }`}
                  >
                    {link.tag}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emeraldTactile-600 animate-pulse" />
            <span>Updated for 2025 IRS Code</span>
          </div>
          <Link
            href="/tools/freelance-tax-estimator"
            className="rounded-lg bg-spruce-800 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-spruce-700 focus:outline-none focus:ring-2 focus:ring-spruce-800 focus:ring-offset-2"
          >
            Calculate Taxes
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-md p-2 text-slate-600 hover:bg-[#F4F4F0] md:hidden"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-[#EAEAE3] bg-[#FBFBF9] px-4 pt-2 pb-4 md:hidden">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-spruce-800 text-white"
                      : "text-slate-700 hover:bg-[#F4F4F0]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.tag && (
                    <span className="rounded bg-[#EAEAE3] px-2 py-0.5 text-[10px] text-slate-600 font-mono">
                      {link.tag}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
