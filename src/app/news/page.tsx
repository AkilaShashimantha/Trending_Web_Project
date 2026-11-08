import { Metadata } from "next";
import Link from "next/link";
import { getAllNewsArticles, getFeaturedNewsArticle } from "../../lib/data/newsArticles";
import { NewsHubView } from "../../components/news/NewsHubView";
import { Newspaper, Rss, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Tax & Money News Desk | TaxEstimator Online",
  description:
    "Actionable regulatory intelligence, IRS bracket updates, processor fee breakdowns, and real yield models for independent solopreneurs and freelancers.",
  alternates: {
    canonical: "https://taxestimator.online/news",
    types: {
      "application/rss+xml": "https://taxestimator.online/rss.xml",
    },
  },
  openGraph: {
    title: "Tax & Money News Desk | TaxEstimator Online",
    description:
      "Actionable regulatory intelligence, IRS bracket updates, processor fee breakdowns, and real yield models for independent solopreneurs and freelancers.",
    url: "https://taxestimator.online/news",
    siteName: "TaxEstimator Online",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tax & Money News Desk | TaxEstimator Online",
    description:
      "Actionable tax policy, IRS updates, processor fee breakdowns, and real yield models for independent creators.",
  },
};

export default function NewsHubPage() {
  const articles = getAllNewsArticles();
  const featuredArticle = getFeaturedNewsArticle();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tax & Money News Desk | TaxEstimator Online",
    description:
      "Actionable regulatory intelligence, IRS bracket updates, processor fee breakdowns, and real yield models for independent solopreneurs.",
    url: "https://taxestimator.online/news",
    publisher: {
      "@type": "Organization",
      name: "TaxEstimator Online",
      url: "https://taxestimator.online",
      logo: {
        "@type": "ImageObject",
        url: "https://taxestimator.online/icon.svg",
      },
    },
    hasPart: articles.map((article) => ({
      "@type": "NewsArticle",
      headline: article.headline,
      url: `https://taxestimator.online/news/${article.slug}`,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: {
        "@type": "Person",
        name: article.author.name,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Banner */}
      <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#EAEAE3] pb-8 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emeraldTactile-200 bg-emeraldTactile-50 px-3 py-1 text-xs font-semibold text-emeraldTactile-800 mb-3">
            <span className="h-2 w-2 rounded-full bg-emeraldTactile-600 animate-pulse" />
            <span>Tax &amp; Solopreneur Money News Desk</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Regulatory Intelligence for Independent Builders
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
            Unpacking IRS tax bracket revisions, merchant processor fee schedules, and central bank interest rate decisions into rigorous mathematical balance sheets.
          </p>
        </div>

        {/* RSS Feed Link */}
        <div className="flex items-center gap-3">
          <Link
            href="/rss.xml"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCDCD2] bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-[#F4F4F0] hover:text-slate-900 transition shadow-xs"
          >
            <Rss className="h-3.5 w-3.5 text-amberWarm-600" />
            <span>RSS 2.0 Feed</span>
          </Link>
          <Link
            href="/news-sitemap.xml"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCDCD2] bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-[#F4F4F0] hover:text-slate-900 transition shadow-xs"
          >
            <Newspaper className="h-3.5 w-3.5 text-spruce-800" />
            <span>News Sitemap</span>
          </Link>
        </div>
      </div>

      {/* News Hub Interactive View */}
      <NewsHubView articles={articles} featuredArticle={featuredArticle} />
    </div>
  );
}
