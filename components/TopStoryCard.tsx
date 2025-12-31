"use client";

import { NewsArticle } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getFallbackImage } from "@/app/config/fallbacks";
import { useCategories } from "@/app/context/CategoryContext";

interface TopStoryCardProps {
  article: NewsArticle;
}

export default function TopStoryCard({ article }: TopStoryCardProps) {
  const { categoryMap } = useCategories();
  const categoryName = categoryMap[article.category] || article.category;
  const [imgSrc, setImgSrc] = useState(article.imageUrl);

  return (
    <Link
      href={`/article/${article.id}`}
      className="block mb-16 group cursor-pointer border-b border-gray-200 pb-12"
    >
      <article className="flex flex-col gap-8">
        {/* Header: Label & Title */}
        <div className="w-full text-center max-w-5xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="w-3 h-3 bg-accent rounded-full"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Top Story
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-serif leading-tight mb-8 group-hover:text-accent transition-all duration-300 text-foreground bg-clip-text bg-gradient-to-r from-primary to-slate-600 dark:from-white dark:to-gray-400">
            {article.title}
          </h1>
        </div>

        {/* Image */}
        <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5 dark:ring-white/10 bg-gray-100 dark:bg-gray-800 group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500">
          <Image
            src={imgSrc}
            alt={article.title}
            fill
            className="object-contain transition-all duration-700 ease-out"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            onError={() => setImgSrc(getFallbackImage(categoryName))}
          />
          {article.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 bg-white/90 flex items-center justify-center rounded-full shadow-xl">
                <svg
                  className="w-8 h-8 text-black ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Metadata/Summary (Below Image) */}
        <div className="w-full text-center max-w-3xl mx-auto">
          <p className="text-xl text-muted-foreground mb-6 font-serif leading-relaxed">
            {categoryName}
          </p>

          <div className="flex items-center justify-center text-sm font-bold uppercase tracking-wider space-x-4">
            <span className="text-foreground border-b-2 border-primary pb-1 group-hover:border-accent group-hover:text-accent transition-colors">
              Read Full Story
            </span>
            {article.sourceUrl && (
              <>
                <span className="text-muted-foreground">•</span>
                <span
                  className="text-muted-foreground border-b-2 border-transparent hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(
                      article.sourceUrl,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  Source
                </span>
              </>
            )}
            {article.author && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{article.author}</span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
