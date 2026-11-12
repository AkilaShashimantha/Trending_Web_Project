import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  newsArticles,
  getNewsArticleBySlug,
  getRecentNewsArticles,
} from "../../../lib/data/newsArticles";
import { FaqAccordion } from "../../../components/news/FaqAccordion";
import { NewsCard } from "../../../components/news/NewsCard";
import { AdSlot } from "../../../components/ads/AdSlot";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  HelpCircle,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const url = `https://taxestimator.online/news/${article.slug}`;
  const imageUrl = article.image || "https://taxestimator.online/icon-512.png";

  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.headline,
      description: article.summary,
      url,
      siteName: "TaxEstimator Online",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: imageUrl,
          width: 512,
          height: 512,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.headline,
      description: article.summary,
      images: [imageUrl],
    },
  };
}

function renderContentParagraph(text: string, pIdx: number) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const elements: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];

    if (href.startsWith("/")) {
      elements.push(
        <Link
          key={`${pIdx}-${match.index}`}
          href={href}
          className="font-semibold text-emeraldTactile-700 underline decoration-emeraldTactile-300 underline-offset-2 transition hover:text-emeraldTactile-800 hover:decoration-emeraldTactile-600"
        >
          {label}
        </Link>
      );
    } else {
      elements.push(
        <a
          key={`${pIdx}-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-emeraldTactile-700 underline decoration-emeraldTactile-300 underline-offset-2 transition hover:text-emeraldTactile-800 hover:decoration-emeraldTactile-600 inline-flex items-center gap-0.5"
        >
          <span>{label}</span>
          <ExternalLink className="h-3 w-3 inline" />
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return <p key={pIdx}>{elements}</p>;
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRecentNewsArticles(3, article.slug);

  const formattedPublished = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedUpdated = new Date(article.updatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Structured Data Schemas
  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.headline,
    description: article.summary,
    image: [
      article.image || "https://taxestimator.online/icon-512.png",
      "https://taxestimator.online/apple-touch-icon.png",
    ],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://taxestimator.online/news/${article.slug}`,
    },
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
      url: "https://taxestimator.online/about",
    },
    publisher: {
      "@type": "Organization",
      name: "TaxEstimator Online",
      url: "https://taxestimator.online",
      logo: {
        "@type": "ImageObject",
        url: "https://taxestimator.online/icon-512.png",
      },
    },
    articleSection: article.category,
    keywords: article.tags.join(", "),
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://taxestimator.online",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "News Desk",
        item: "https://taxestimator.online/news",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://taxestimator.online/news/${article.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Structured Data Script Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
          <li>
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          </li>
          <li>
            <Link href="/news" className="hover:text-slate-900 transition-colors">
              News Desk
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          </li>
          <li className="font-medium text-slate-900 truncate max-w-[280px] sm:max-w-md">
            {article.title}
          </li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="border-b border-[#EAEAE3] pb-8">
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="rounded-full bg-emeraldTactile-50 px-3 py-1 font-semibold text-emeraldTactile-800 border border-emeraldTactile-200">
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            <span>{article.readTime}</span>
          </div>
          <span className="text-slate-300">&bull;</span>
          <div className="flex items-center gap-1 text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            <span>Published {formattedPublished}</span>
          </div>
          {article.updatedAt !== article.publishedAt && (
            <>
              <span className="text-slate-300">&bull;</span>
              <span className="text-slate-500 font-mono text-[11px]">Updated {formattedUpdated}</span>
            </>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
          {article.headline}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
          {article.summary}
        </p>

        {/* Author Bio Chip & Credentials */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#EAEAE3] bg-white p-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-spruce-800 font-mono text-sm font-bold text-white shadow-xs">
              {article.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{article.author.name}</span>
                <span className="inline-flex items-center gap-1 rounded bg-emeraldTactile-50 px-1.5 py-0.5 text-[10px] font-medium text-emeraldTactile-700">
                  <UserCheck className="h-3 w-3" />
                  Verified Author
                </span>
              </div>
              <div className="text-xs text-slate-500">{article.author.role}</div>
              <div className="text-[11px] text-slate-400 font-mono">{article.author.credentials}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-[#F4F4F0] px-2.5 py-1 text-xs font-mono text-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Primary Source Box */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-dashed border-[#DCDCD2] bg-[#FBFBF9] p-4 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emeraldTactile-600 shrink-0" />
            <div>
              <span className="font-semibold text-slate-900">Verified Primary Source: </span>
              <span className="text-slate-600">{article.primarySource.name}</span>
            </div>
          </div>
          <a
            href={article.primarySource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-emeraldTactile-700 hover:text-emeraldTactile-800 hover:underline shrink-0"
          >
            <span>View Official Publication</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* Top Banner AdSlot */}
      <AdSlot slotId={`article-${article.slug}-top`} format="horizontal" label="Advertisement" />

      {/* Main Article Content */}
      <main className="mt-8 space-y-10">
        {/* TL;DR Executive Brief Callout Box */}
        <div className="rounded-2xl border-l-4 border-l-spruce-800 border border-[#EAEAE3] bg-gradient-to-r from-[#F4F4F0] to-[#FBFBF9] p-6 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-spruce-800">
            <Sparkles className="h-4 w-4 text-emeraldTactile-600" />
            <span>Executive Brief &bull; TL;DR</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 font-medium">
            {article.summary}
          </p>
        </div>

        {/* Detailed Sections */}
        {article.sections.map((section) => (
          <section key={section.id} id={section.id} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {section.title}
            </h2>

            <div className="text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
              {section.content.split("\n\n").map((para, pIdx) =>
                renderContentParagraph(para, pIdx)
              )}
            </div>

            {/* Key Points Callout if present */}
            {section.keyPoints && section.keyPoints.length > 0 && (
              <div className="rounded-xl border border-emeraldTactile-200 bg-emeraldTactile-50/60 p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emeraldTactile-900">
                  Key Takeaways
                </span>
                <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {section.keyPoints.map((pt, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emeraldTactile-700 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tabular Data Table if present */}
            {section.table && (
              <div className="overflow-hidden rounded-xl border border-[#EAEAE3] bg-white shadow-xs my-4">
                {section.table.caption && (
                  <div className="border-b border-[#EAEAE3] bg-[#FBFBF9] px-4 py-2.5 text-xs font-bold text-slate-800">
                    {section.table.caption}
                  </div>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#EAEAE3] bg-[#F4F4F0] text-slate-700 font-semibold">
                        {section.table.headers.map((hdr, hIdx) => (
                          <th key={hIdx} className="px-4 py-3">
                            {hdr}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4F4F0] text-slate-600">
                      {section.table.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className={rIdx % 2 === 0 ? "bg-white" : "bg-[#FBFBF9]/60"}
                        >
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`px-4 py-2.5 ${
                                cIdx === 0
                                  ? "font-semibold text-slate-900"
                                  : cIdx === row.length - 1
                                  ? "font-mono font-medium text-emeraldTactile-700"
                                  : "font-mono"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Worked Persona Example */}
        {article.personaExample && (
          <section className="rounded-2xl border border-spruce-800/30 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAEAE3] pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-spruce-800 px-3 py-0.5 text-xs font-semibold text-emeraldTactile-300">
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>Worked Real-World Persona</span>
                </span>
                <h3 className="mt-2 text-lg sm:text-xl font-bold text-slate-900">
                  {article.personaExample.personaName}: {article.personaExample.title}
                </h3>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600">
              {article.personaExample.scenario}
            </p>

            {/* Persona Numbers Breakdown Grid */}
            <div className="mt-6 overflow-hidden rounded-xl border border-[#EAEAE3] bg-[#FBFBF9]">
              <div className="divide-y divide-[#EAEAE3]">
                {article.personaExample.breakdown.map((item, bIdx) => (
                  <div
                    key={bIdx}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3.5 text-xs sm:text-sm gap-1 sm:gap-4"
                  >
                    <div>
                      <span className="font-semibold text-slate-800">{item.label}</span>
                      {item.detail && (
                        <p className="text-[11px] text-slate-500 mt-0.5">{item.detail}</p>
                      )}
                    </div>
                    <span className="font-mono font-bold text-slate-900 sm:text-right shrink-0">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Line */}
            <div className="mt-4 rounded-xl border border-emeraldTactile-300 bg-emeraldTactile-50 p-4 text-xs sm:text-sm text-emeraldTactile-900 leading-relaxed font-medium">
              <strong className="font-bold">The Bottom Line: </strong>
              {article.personaExample.bottomLine}
            </div>
          </section>
        )}

        {/* Embedded Interactive Calculator Callout Widget */}
        <section className="overflow-hidden rounded-3xl border border-emeraldTactile-500/40 bg-gradient-to-br from-spruce-900 via-spruce-800 to-spruce-950 p-6 sm:p-10 text-white shadow-md">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emeraldTactile-600/30 px-3 py-1 text-xs font-semibold text-emeraldTactile-300 border border-emeraldTactile-400/30">
                <Calculator className="h-3.5 w-3.5 text-emeraldTactile-400" />
                <span>Interactive TaxEstimator Online Engine</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {article.relatedTool.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {article.relatedTool.description ||
                  "Run your customized revenue numbers through our zero-tracking calculation engine to calibrate your exact numbers."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href={article.relatedTool.href}
                className="inline-flex items-center gap-2 rounded-xl bg-emeraldTactile-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-emeraldTactile-500 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emeraldTactile-400"
              >
                <span>{article.relatedTool.ctaText}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              {article.relatedTool.secondaryHref && article.relatedTool.secondaryCtaText && (
                <Link
                  href={article.relatedTool.secondaryHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-emeraldTactile-400/50 bg-white/10 backdrop-blur-sm px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-white/20 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emeraldTactile-400"
                >
                  <span>{article.relatedTool.secondaryCtaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Mid-Article AdSlot */}
        <AdSlot slotId={`article-${article.slug}-mid`} format="horizontal" label="Advertisement" />

        {/* Frequently Asked Questions */}
        <section aria-labelledby="faqs-heading" className="space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-spruce-800" />
            <h2 id="faqs-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>
          <FaqAccordion faqs={article.faqs} />
        </section>

        {/* Editorial Disclosure Box */}
        <div className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-4 text-xs text-slate-500 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="mt-0.5 h-4 w-4 text-amberWarm-600 shrink-0" />
            <div>
              <strong className="text-slate-700">Editorial &amp; Regulatory Notice: </strong>
              The TaxEstimator Online News Desk publishes journalistic and quantitative analysis based on public IRS schedules, Federal Reserve policy statements, and statutory legal publications. This content is for informational purposes and does not constitute Certified Public Accountant (CPA) advice or formal legal representation. Always consult a licensed CPA or tax attorney for your individual filings.{" "}
              <Link href="/about#editorial-standards" className="font-semibold text-emeraldTactile-700 underline underline-offset-2 hover:text-emeraldTactile-800">
                View Editorial &amp; Verification Standards
              </Link>
              .
            </div>
          </div>
        </div>
      </main>

      {/* Related News Articles */}
      <aside aria-labelledby="related-heading" className="mt-16 border-t border-[#EAEAE3] pt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 id="related-heading" className="text-xl font-bold tracking-tight text-slate-900">
            More from the Tax &amp; Money News Desk
          </h2>
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emeraldTactile-700 hover:text-emeraldTactile-800"
          >
            <span>View All Reports</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedArticles.map((rel) => (
            <NewsCard key={rel.slug} article={rel} />
          ))}
        </div>
      </aside>

      {/* Back to News Hub */}
      <div className="mt-12 text-center">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 rounded-xl border border-[#DCDCD2] bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-[#F4F4F0] hover:text-slate-900 transition shadow-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All News Desk Reports</span>
        </Link>
      </div>
    </div>
  );
}
