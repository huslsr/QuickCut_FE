"use client";

import { NewsArticle } from "@/types/news";
import { formatDate } from "@/app/utils/dateFormatter";
import Image from "next/image";
import Link from "next/link";
import { bookmarkService } from "@/app/api/services/bookmarkService";
import { useAuth } from "@/app/context/AuthProvider";
import { useState } from "react";
import { getFallbackImage } from "@/app/config/fallbacks";

interface StoryCardProps {
  article: NewsArticle;
  priority?: boolean;
}

const CATEGORY_MAP: Record<string, string> = {
  "1": "Cricket",
  "2": "Football",
  "3": "Movies",
  "4": "Politics",
  "5": "Tech",
  "6": "Business",
  "7": "World",
  "8": "General",
  "9": "Health",
  "10": "Stocks",
};

export default function StoryCard({
  article,
  priority = false,
}: StoryCardProps) {
  const { user } = useAuth();
  const categoryName = CATEGORY_MAP[article.category] || article.category;
  const [imgSrc, setImgSrc] = useState(article.imageUrl);

  return (
    <Link
      href={`/article/${article.id}`}
      className="group cursor-pointer flex flex-col h-full"
    >
      <article className="flex flex-col h-full bg-card text-card-foreground border border-border/50 shadow-md hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/30 hover:-translate-y-2 transition-all duration-300 ease-out rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
        <div className="relative w-full aspect-video overflow-hidden bg-muted">
          <Image
            src={imgSrc}
            alt={article.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => {
              setImgSrc(getFallbackImage(categoryName));
            }}
          />
          <div className="absolute top-4 left-4 bg-white text-black dark:bg-black dark:text-white px-3 py-1 text-xs font-bold uppercase tracking-widest border border-black dark:border-white">
            {categoryName}
          </div>

          <div
            className="absolute top-4 right-16 bg-white/90 dark:bg-black/80 p-2 rounded-full cursor-pointer hover:scale-110 active:scale-90 transition-transform shadow-md z-10"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!user) {
                // Optional: router.push('/login') or alert
                alert("Please login to bookmark stories!");
                return;
              }
              try {
                if (user?.id) {
                  await bookmarkService.addBookmark(user.id, article.id);
                  alert("Story bookmarked!");
                }
              } catch (err) {
                alert("Failed to bookmark.");
              }
            }}
            title="Bookmark this story"
          >
            <svg
              className="w-4 h-4 text-black dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>

          <div
            className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 p-2 rounded-full cursor-pointer hover:scale-110 active:scale-90 transition-transform shadow-md z-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const url = `${window.location.origin}/article/${article.id}`;
              navigator.clipboard.writeText(url);

              // GA4 Tracking
              if (typeof window !== "undefined" && (window as any).gtag) {
                (window as any).gtag("event", "share", {
                  method: "clipboard",
                  content_type: "article",
                  item_id: url,
                });
              }

              alert("Link copied to clipboard!");
            }}
            title="Share this story"
          >
            <svg
              className="w-4 h-4 text-black dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-6">
          <h2 className="text-2xl font-bold font-serif leading-tight mb-3 group-hover:text-accent transition-colors text-card-foreground">
            {article.title}
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 font-serif">
            {article.summary}
          </p>

          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {article.author && <span>{article.author}</span>}
            <span>{formatDate(article.timestamp)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
