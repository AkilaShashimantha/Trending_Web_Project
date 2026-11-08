"use client";

import { useState } from "react";
import { NewsArticle } from "../../models/news.model";
import { NewsCard } from "./NewsCard";
import { Filter, Newspaper, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { AdSlot } from "../ads/AdSlot";

interface NewsHubViewProps {
  articles: NewsArticle[];
  featuredArticle: NewsArticle;
}

export function NewsHubView({ articles, featuredArticle }: NewsHubViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Topics");

  const categories = [
    "All Topics",
    "IRS Regulations",
    "Banking & Rates",
    "Merchant Fees",
    "State Taxes",
  ];

  const filteredArticles =
    selectedCategory === "All Topics"
      ? articles
      : articles.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-12">
      {/* Featured Article Hero */}
      <section aria-labelledby="featured-article-heading">
        <h2 id="featured-article-heading" className="sr-only">
          Featured Analysis
        </h2>
        <NewsCard article={featuredArticle} featured />
      </section>

      {/* AdSlot Unit */}
      <AdSlot slotId="news-hub-top" format="horizontal" label="Editorial Sponsor" />

      {/* Category Pills Filter */}
      <section aria-label="Topic Filter">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#EAEAE3] pb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Filter by Topic
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    isSelected
                      ? "bg-spruce-800 text-white shadow-xs"
                      : "bg-[#F4F4F0] text-slate-700 hover:bg-[#EAEAE3]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section aria-labelledby="latest-articles-heading">
        <div className="flex items-center justify-between mb-6">
          <h2 id="latest-articles-heading" className="text-xl font-bold tracking-tight text-slate-900">
            {selectedCategory === "All Topics" ? "Latest Regulatory & Financial Reports" : `${selectedCategory} Reports`}
          </h2>
          <span className="text-xs font-mono text-slate-500">
            Showing {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Mid-Page AdSlot */}
      <AdSlot slotId="news-hub-mid" format="horizontal" label="Market Analysis Sponsor" />

      {/* Editorial Standards & Methodology Box */}
      <section className="rounded-3xl border border-[#EAEAE3] bg-gradient-to-br from-white to-[#FBFBF9] p-8 sm:p-10 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emeraldTactile-200 bg-emeraldTactile-50 px-3 py-1 text-xs font-semibold text-emeraldTactile-800">
            <ShieldCheck className="h-3.5 w-3.5 text-emeraldTactile-600" />
            <span>CashPulse Editorial Charter</span>
          </div>
          <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Pure Primary-Source Journalism. Zero Sponsored Opinions.
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every analysis published on the CashPulse News Desk is verified against official primary government sources—including IRS Revenue Procedures, Federal Reserve FOMC statements, and state tax authority codes. We embed pure mathematical calculators so you can verify the numbers against your own business ledger.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 pt-6 border-t border-[#F4F4F0] text-xs">
          <div className="flex items-start gap-2.5">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-spruce-800 text-emeraldTactile-400 font-mono font-bold text-[10px]">
              01
            </div>
            <div>
              <span className="font-bold text-slate-900">Official Citations</span>
              <p className="mt-0.5 text-slate-500 text-[11px]">Direct public links to statutory tax codes and bulletins.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-spruce-800 text-emeraldTactile-400 font-mono font-bold text-[10px]">
              02
            </div>
            <div>
              <span className="font-bold text-slate-900">Worked Personas</span>
              <p className="mt-0.5 text-slate-500 text-[11px]">Real solopreneur scenarios with dollar-for-dollar balance sheets.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-spruce-800 text-emeraldTactile-400 font-mono font-bold text-[10px]">
              03
            </div>
            <div>
              <span className="font-bold text-slate-900">Live Calculators</span>
              <p className="mt-0.5 text-slate-500 text-[11px]">Interactive models running client-side with zero tracking.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
