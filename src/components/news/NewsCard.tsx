import Link from "next/link";
import { ArrowRight, Calendar, Clock, ExternalLink, Sparkles } from "lucide-react";
import { NewsArticle } from "../../models/news.model";

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (featured) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-[#DCDCD2] bg-gradient-to-br from-white via-[#FBFBF9] to-[#F4F4F0] p-6 sm:p-10 shadow-sm transition hover:border-emeraldTactile-500 hover:shadow-md">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-spruce-800 px-3 py-1 font-semibold text-emeraldTactile-300">
            <Sparkles className="h-3 w-3" />
            <span>Featured Analysis</span>
          </span>
          <span className="rounded-full bg-emeraldTactile-50 px-2.5 py-0.5 font-medium text-emeraldTactile-800 border border-emeraldTactile-200">
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            <span>{article.readTime}</span>
          </div>
        </div>

        <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl leading-tight">
          <Link href={`/news/${article.slug}`} className="hover:text-spruce-800 transition-colors">
            {article.headline}
          </Link>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
          {article.summary}
        </p>

        {/* Primary Source Badge */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">Primary Source:</span>
          <span className="truncate text-slate-600">{article.primarySource.name}</span>
        </div>

        {/* Action Row */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#EAEAE3] pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-spruce-800 font-mono text-xs font-bold text-white shadow-xs">
              {article.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">{article.author.name}</div>
              <div className="text-[11px] text-slate-500">{article.author.role}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={article.relatedTool.href}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCDCD2] bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-[#F4F4F0] transition"
            >
              <span>{article.relatedTool.name}</span>
            </Link>
            <Link
              href={`/news/${article.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-spruce-800 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-spruce-700 transition"
            >
              <span>Read Full Breakdown</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-[#EAEAE3] bg-white p-6 shadow-xs transition hover:border-emeraldTactile-500 hover:shadow-md">
      <div>
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="rounded-full bg-emeraldTactile-50 px-2.5 py-0.5 font-medium text-emeraldTactile-800 border border-emeraldTactile-200">
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <Clock className="h-3 w-3" />
            <span>{article.readTime}</span>
          </div>
        </div>

        <h3 className="mt-3 text-base font-bold text-slate-900 leading-snug group-hover:text-spruce-800">
          <Link href={`/news/${article.slug}`} className="hover:text-spruce-800 transition-colors">
            {article.title}
          </Link>
        </h3>

        <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
          {article.summary}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded bg-[#F4F4F0] px-2 py-0.5 text-[10px] font-mono text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-[#F4F4F0] pt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500">{formattedDate}</span>
          <Link
            href={`/news/${article.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-emeraldTactile-700 hover:text-emeraldTactile-800"
          >
            <span>Read Article</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
