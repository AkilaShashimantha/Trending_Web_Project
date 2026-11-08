import { getAllNewsArticles } from "../../lib/data/newsArticles";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export async function GET() {
  const baseUrl = "https://taxestimator.online";
  const articles = getAllNewsArticles();
  const buildDate = new Date().toUTCString();

  const itemsXml = articles
    .map((article) => {
      const link = `${baseUrl}/news/${article.slug}`;
      const pubDate = new Date(article.publishedAt).toUTCString();
      const title = escapeXml(article.title);
      const summary = escapeXml(article.summary);
      const author = escapeXml(article.author.name);
      const category = escapeXml(article.category);

      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${summary}</description>
      <category>${category}</category>
      <author>${author}</author>
    </item>`;
    })
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TaxEstimator Online | Tax &amp; Solopreneur Money News Desk</title>
    <link>${baseUrl}/news</link>
    <description>Actionable regulatory intelligence, IRS bracket updates, processor fee breakdowns, and real yield models for independent solopreneurs.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${buildDate}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
