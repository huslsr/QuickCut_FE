"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/app/utils/dateFormatter";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Article } from "../../api/services/articleService";
import LikeButton from "@/components/LikeButton";
import BookmarkButton from "@/components/BookmarkButton";
import CommentSection from "@/components/CommentSection";
import RelatedArticles from "@/components/RelatedArticles";
import ShareButtons from "@/components/ShareButtons";
import AudioPlayer from "@/components/AudioPlayer";

import { useCategories } from "@/app/context/CategoryContext";

interface ArticleClientProps {
  article: Article;
  categoryName: string;
}

export default function ArticleClient({
  article,
  categoryName,
}: ArticleClientProps) {
  // Removed internal loading state as data is passed from Server Component
  const { categoryMap } = useCategories();

  // Local state for image source to handle fallbacks
  const [imgSrc, setImgSrc] = useState(
    article?.imageUrl ||
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2070"
  );

  // Update state when article changes
  useEffect(() => {
    if (article?.imageUrl) {
      setImgSrc(article.imageUrl);
    }
  }, [article]);

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background transition-colors">
      <Header />

      <main className="flex-1 w-full">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category & Date */}
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-serif leading-tight mb-6 text-gray-900 dark:text-white">
            {article.title}
          </h1>

          {/* Metadata & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
            <div className="flex items-center space-x-4 flex-wrap">
              <span className="bg-accent/10 text-accent px-3 py-1 text-xs font-bold uppercase tracking-widest">
                {categoryMap[article.categoryId] || categoryName || "General"}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-serif whitespace-nowrap">
                {formatDate(article.publishedAt)}
              </span>
            </div>
            <div className="flex items-center space-x-2 flex-wrap">
              <AudioPlayer
                text={`${article.title}. ${article.summary}. ${article.content}`}
              />
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-2"></div>
              <ShareButtons
                title={article.title}
                url={`https://quickcut.info/article/${article.id}`}
              />
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-2"></div>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-2"></div>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch(imgSrc);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${article.title
                      .slice(0, 20)
                      .trim()
                      .replace(/[^a-z0-9]/gi, "_")}_image.jpg`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  } catch (e) {
                    // Fallback to simple link method if fetch fails (e.g. CORS specific issue unlikely here though)
                    window.open(imgSrc, "_blank");
                  }
                }}
                className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Download Image"
              >
                <div className="p-2">
                  <svg
                    className="w-5 h-5 fill-none stroke-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </div>
              </button>
              <BookmarkButton articleId={article.id} />
              <LikeButton articleId={article.id} />
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-[50vh] min-h-[400px] mb-12 overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner">
            <Image
              src={imgSrc}
              alt={article.title}
              fill
              className="object-contain"
              priority
              onError={() =>
                setImgSrc(
                  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2070"
                )
              }
            />
          </div>

          {/* Summary / Lead */}
          <div className="prose prose-lg max-w-none mb-10 dark:prose-invert">
            <p className="text-xl md:text-2xl font-serif text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-accent pl-6 py-2">
              {article.summary}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none font-serif text-gray-800 dark:text-gray-200 leading-loose dark:prose-invert">
            {article.content.split("\n").map(
              (paragraph, index) =>
                paragraph.trim() && (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                )
            )}
          </div>

          <CommentSection articleId={article.id} />

          <RelatedArticles
            currentArticleId={article.id}
            categoryId={article.categoryId}
          />
        </article>
      </main>

      <Footer />
    </div>
  );
}
