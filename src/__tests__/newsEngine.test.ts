import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { NewsArticleSchema } from "../models/news.model";
import {
  newsArticles,
  getAllNewsArticles,
  getNewsArticleBySlug,
  getFeaturedNewsArticle,
  getRecentNewsArticles,
  getAllNewsTags,
  getArticlesByTag,
} from "../lib/data/newsArticles";
import { GET as getRssFeed } from "../app/rss.xml/route";
import sitemap from "../app/sitemap";
import robots from "../app/robots";

describe("News Desk Engine & Data Model Tests", () => {
  it("validates that at least 20 articles exist and strictly conform to NewsArticleSchema", () => {
    expect(newsArticles.length).toBeGreaterThanOrEqual(20);

    newsArticles.forEach((article) => {
      const parsed = NewsArticleSchema.safeParse(article);
      expect(parsed.success).toBe(true);
    });
  });

  it("verifies all 5 required core slugs exist and all slugs are unique kebab-case", () => {
    const requiredSlugs = [
      "2025-2026-irs-tax-brackets-freelancers",
      "fed-rate-decision-hysa-wealth-impact",
      "stripe-paypal-merchant-fee-hikes-how-to-pass-fees",
      "irs-form-1099k-threshold-rules-guide",
      "lowest-tax-states-for-freelancers-2025",
    ];

    const slugSet = new Set<string>();
    newsArticles.forEach((article) => {
      expect(slugSet.has(article.slug)).toBe(false);
      slugSet.add(article.slug);
      expect(article.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    });

    requiredSlugs.forEach((reqSlug) => {
      expect(slugSet.has(reqSlug)).toBe(true);
    });
  });

  it("enforces unified TaxEstimator Online branding, honest research-desk authorship, post-launch dates, and article visuals", () => {
    const domainLaunchMs = Date.parse("2026-11-02T00:00:00Z");

    newsArticles.forEach((article) => {
      const serialized = JSON.stringify(article).toLowerCase();
      expect(serialized).not.toContain("cashpulse");
      expect(serialized).not.toContain("marcus vance");
      expect(serialized).not.toContain("claire takahashi");

      expect(article.author.name).toBe("TaxEstimator Online Research Desk");

      const pubMs = Date.parse(article.publishedAt);
      expect(pubMs).toBeGreaterThanOrEqual(domainLaunchMs);

      expect(article.image).toBeDefined();
      expect(article.image).toMatch(/^https:\/\/taxestimator\.online\/news\/.+\/opengraph-image$/);
      expect(article.image).not.toContain("icon-512.png");

      expect(article.visual).toBeDefined();
      if (article.visual) {
        expect(article.visual.src).toMatch(/^\/images\/guides\/.+\.svg$/);
        const diskPath = path.join(process.cwd(), "public", article.visual.src.replace(/^\//, ""));
        expect(fs.existsSync(diskPath), `Missing visual asset on disk: ${diskPath}`).toBe(true);
      }
    });
  });

  it("ensures 2025–2026 editorial freshness and a 2026 flagship featured article", () => {
    const featuredArticles = newsArticles.filter((a) => a.featured);
    expect(featuredArticles.length).toBe(1);

    const flagship = getFeaturedNewsArticle();
    expect(flagship.featured).toBe(true);
    expect(new Date(flagship.publishedAt).getUTCFullYear()).toBeGreaterThanOrEqual(2026);
    expect(new Date(flagship.updatedAt).getUTCFullYear()).toBeGreaterThanOrEqual(2026);

    const articlesUpdatedIn2026 = newsArticles.filter(
      (a) => new Date(a.updatedAt).getUTCFullYear() >= 2026
    );
    expect(articlesUpdatedIn2026.length).toBeGreaterThanOrEqual(15);

    newsArticles.forEach((article) => {
      const pubTime = new Date(article.publishedAt).getTime();
      const updTime = new Date(article.updatedAt).getTime();
      expect(Number.isNaN(pubTime)).toBe(false);
      expect(Number.isNaN(updTime)).toBe(false);
      expect(updTime).toBeGreaterThanOrEqual(pubTime);
    });
  });

  it("ensures all primary sources have valid HTTPS URLs and accredited names", () => {
    newsArticles.forEach((article) => {
      expect(article.primarySource.name.length).toBeGreaterThan(5);
      expect(article.primarySource.url).toMatch(/^https:\/\/.+/);
    });
  });

  it("ensures all related tools link to valid internal calculator routes", () => {
    newsArticles.forEach((article) => {
      expect(article.relatedTool.href).toMatch(/^\/tools\/.+/);
      expect(article.relatedTool.name.length).toBeGreaterThan(3);
      expect(article.relatedTool.ctaText.length).toBeGreaterThan(5);
      if (article.relatedTool.secondaryHref) {
        expect(article.relatedTool.secondaryHref).toMatch(/^\/tools\/.+/);
      }
    });
  });

  it("verifies comprehensive content depth: sections, persona examples, and FAQs", () => {
    newsArticles.forEach((article) => {
      // Must have at least 3 deep analytical sections
      expect(article.sections.length).toBeGreaterThanOrEqual(3);
      article.sections.forEach((sec) => {
        expect(sec.id).toBeTruthy();
        expect(sec.title.length).toBeGreaterThan(5);
        expect(sec.content.length).toBeGreaterThan(50);
      });

      // Must have at least 3 actionable FAQs
      expect(article.faqs.length).toBeGreaterThanOrEqual(3);
      article.faqs.forEach((faq) => {
        expect(faq.question).toMatch(/\?$/);
        expect(faq.answer.length).toBeGreaterThan(20);
      });

      // Must have persona example with numerical breakdown
      expect(article.personaExample).toBeDefined();
      if (article.personaExample) {
        expect(article.personaExample.personaName.length).toBeGreaterThan(1);
        expect(article.personaExample.breakdown.length).toBeGreaterThanOrEqual(4);
        expect(article.personaExample.bottomLine.length).toBeGreaterThan(20);
      }

      // Valid read time format
      expect(article.readTime).toMatch(/^\d+\s+min read$/);
    });
  });

  it("verifies query helper functions: sorting, retrieval, categories, and filtering", () => {
    const all = getAllNewsArticles();
    expect(all.length).toBe(newsArticles.length);
    expect(all.length).toBeGreaterThanOrEqual(20);

    // Verify chronological descending sort
    for (let i = 0; i < all.length - 1; i++) {
      const currentTime = new Date(all[i].publishedAt).getTime();
      const nextTime = new Date(all[i + 1].publishedAt).getTime();
      expect(currentTime).toBeGreaterThanOrEqual(nextTime);
    }

    // Categories cover breadth of solopreneur topics
    const categories = new Set(all.map((a) => a.category));
    expect(categories.has("IRS Regulations")).toBe(true);
    expect(categories.has("Tax Deductions")).toBe(true);
    expect(categories.has("Business Structure")).toBe(true);
    expect(categories.has("Banking & Rates")).toBe(true);
    expect(categories.has("Merchant Fees")).toBe(true);
    expect(categories.has("State Taxes")).toBe(true);

    // Lookup by slug
    const firstArticle = all[0];
    const retrieved = getNewsArticleBySlug(firstArticle.slug);
    expect(retrieved).toBeDefined();
    expect(retrieved?.slug).toBe(firstArticle.slug);

    // Non-existent slug
    const missing = getNewsArticleBySlug("non-existent-slug-xyz");
    expect(missing).toBeUndefined();

    // Featured article
    const featured = getFeaturedNewsArticle();
    expect(featured).toBeDefined();
    expect(featured.featured).toBe(true);

    // Recent articles limit & exclusion
    const recents = getRecentNewsArticles(4, firstArticle.slug);
    expect(recents.length).toBe(4);
    expect(recents.some((a) => a.slug === firstArticle.slug)).toBe(false);

    // Tags
    const tags = getAllNewsTags();
    expect(tags.length).toBeGreaterThan(0);
    const taggedArticles = getArticlesByTag(tags[0]);
    expect(taggedArticles.length).toBeGreaterThan(0);
  });
});

describe("News Syndication Feeds & SEO Integration", () => {
  it("generates a valid RSS 2.0 XML feed with channel and items", async () => {
    const response = await getRssFeed();
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("application/xml");

    const xml = await response.text();
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">');
    expect(xml).toContain("<channel>");
    expect(xml).toContain("<title>TaxEstimator Online | Tax &amp; Solopreneur Money News Desk</title>");
    expect(xml).toContain("https://taxestimator.online/news");
    expect(xml).toContain("<item>");

    // Ensure all article items are included
    newsArticles.forEach((article) => {
      expect(xml).toContain(`https://taxestimator.online/news/${article.slug}`);
    });
  });

  it("verifies sitemap.ts includes /news and all news article routes", () => {
    const siteRoutes = sitemap();
    const urls = siteRoutes.map((r) => r.url);

    expect(urls).toContain("https://taxestimator.online/news");

    newsArticles.forEach((article) => {
      expect(urls).toContain(`https://taxestimator.online/news/${article.slug}`);
    });
  });

  it("verifies robots.ts declares sitemap.xml and rss.xml and omits deprecated news-sitemap.xml", () => {
    const robotsConfig = robots();
    expect(robotsConfig.sitemap).toBeDefined();

    const sitemaps = Array.isArray(robotsConfig.sitemap)
      ? robotsConfig.sitemap
      : [robotsConfig.sitemap];

    expect(sitemaps).toContain("https://taxestimator.online/sitemap.xml");
    expect(sitemaps).toContain("https://taxestimator.online/rss.xml");
    expect(sitemaps).not.toContain("https://taxestimator.online/news-sitemap.xml");
  });
});
