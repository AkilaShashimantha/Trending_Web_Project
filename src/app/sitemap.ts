import { MetadataRoute } from "next";
import { getAllStates } from "../lib/engines/stateTaxEngine";
import { getAllNewsArticles } from "../lib/data/newsArticles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://taxestimator.online";
  const coreUpdatedAt = "2026-02-15T00:00:00.000Z";
  const legalUpdatedAt = "2025-01-15T00:00:00.000Z";
  const flagshipStateUpdatedAt = "2026-02-15T00:00:00.000Z";

  const articles = getAllNewsArticles();
  const latestNewsUpdatedAt = articles.reduce(
    (latest, article) => (article.updatedAt > latest ? article.updatedAt : latest),
    coreUpdatedAt
  );

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: coreUpdatedAt,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: latestNewsUpdatedAt,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/freelance-tax-estimator`,
      lastModified: coreUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/stripe-fee-calculator`,
      lastModified: coreUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/hysa-compound-calculator`,
      lastModified: coreUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: legalUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: legalUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: legalUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: legalUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: legalUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // Include ONLY deeply custom-written, indexed flagship state guides (`hasCustomGuide === true`).
  // Secondary state calculator pages remain user-accessible with `noindex, follow` and are excluded
  // from sitemap.xml to prevent AdSense programmatic/doorway thin-content flags.
  const stateRoutes: MetadataRoute.Sitemap = getAllStates()
    .filter((state) => state.hasCustomGuide === true)
    .map((state) => ({
      url: `${baseUrl}/tools/freelance-tax-estimator/${state.slug}`,
      lastModified: flagshipStateUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const newsRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...coreRoutes, ...stateRoutes, ...newsRoutes];
}
