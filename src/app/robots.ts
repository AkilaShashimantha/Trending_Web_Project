import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      "https://taxestimator.online/sitemap.xml",
      "https://taxestimator.online/news-sitemap.xml",
      "https://taxestimator.online/rss.xml",
    ],
  };
}
