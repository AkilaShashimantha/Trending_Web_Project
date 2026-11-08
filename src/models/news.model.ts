import { z } from "zod";

export const NewsAuthorSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  credentials: z.string().min(2),
  avatar: z.string().optional(),
});
export type NewsAuthor = z.infer<typeof NewsAuthorSchema>;

export const PrimarySourceSchema = z.object({
  name: z.string().min(2),
  url: z.string().url(),
});
export type PrimarySource = z.infer<typeof PrimarySourceSchema>;

export const RelatedToolSchema = z.object({
  href: z.string().min(1),
  name: z.string().min(2),
  ctaText: z.string().min(2),
  description: z.string().optional(),
  secondaryHref: z.string().optional(),
  secondaryName: z.string().optional(),
  secondaryCtaText: z.string().optional(),
});
export type RelatedTool = z.infer<typeof RelatedToolSchema>;

export const NewsFAQSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(10),
});
export type NewsFAQ = z.infer<typeof NewsFAQSchema>;

export const NewsSectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2),
  content: z.string().min(10),
  keyPoints: z.array(z.string()).optional(),
  table: z
    .object({
      caption: z.string().optional(),
      headers: z.array(z.string()),
      rows: z.array(z.array(z.string())),
    })
    .optional(),
});
export type NewsSection = z.infer<typeof NewsSectionSchema>;

export const PersonaExampleSchema = z.object({
  personaName: z.string().min(2),
  title: z.string().min(2),
  scenario: z.string().min(10),
  breakdown: z.array(
    z.object({
      label: z.string().min(1),
      value: z.string().min(1),
      detail: z.string().optional(),
    })
  ),
  bottomLine: z.string().min(10),
});
export type PersonaExample = z.infer<typeof PersonaExampleSchema>;

export const NewsArticleSchema = z.object({
  slug: z.string().min(3),
  title: z.string().min(5),
  headline: z.string().min(5),
  summary: z.string().min(20),
  publishedAt: z.string(), // ISO 8601 string
  updatedAt: z.string(),   // ISO 8601 string
  author: NewsAuthorSchema,
  tags: z.array(z.string()).min(1),
  category: z.string().default("Tax Updates"),
  readTime: z.string().min(2), // e.g., "6 min read"
  image: z.string().optional(),
  primarySource: PrimarySourceSchema,
  relatedTool: RelatedToolSchema,
  personaExample: PersonaExampleSchema.optional(),
  sections: z.array(NewsSectionSchema).min(1),
  faqs: z.array(NewsFAQSchema).min(1),
  featured: z.boolean().default(false),
});

export type NewsArticle = z.infer<typeof NewsArticleSchema>;

