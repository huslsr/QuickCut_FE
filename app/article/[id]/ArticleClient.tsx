"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
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
  const { categoryMap } = useCategories();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Local state for image source to handle fallbacks
  const [imgSrc, setImgSrc] = useState(
    article?.imageUrl ||
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2070"
  );

  // Update state when article changes & handle view count
  useEffect(() => {
    if (article?.imageUrl) {
      setImgSrc(article.imageUrl);
    }

    if (article?.id) {
      import("../../api/services/articleService").then(({ articleService }) => {
        articleService.incrementViewCount(article.id);
      });
    }
  }, [article]);

  // Handle Scroll Progress - Replaced by Framer Motion's useScroll and useSpring
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const totalHeight =
  //       document.documentElement.scrollHeight - window.innerHeight;
  //     const progress = (window.scrollY / totalHeight) * 100;
  //     setScrollProgress(progress);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background transition-colors selection:bg-accent selection:text-white overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      {/* Reading Progress Bar - Using Framer Motion for smoothness */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      <Header />

      <main className="flex-1 w-full relative z-10">
        <article className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* 1. Hero Section: Centered & Cinematic */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Meta Top */}
              <div className="flex items-center justify-center space-x-3 mb-6 text-sm font-bold tracking-widest text-muted-foreground uppercase">
                <span className="text-accent bg-accent/5 px-2 py-1 rounded-full">
                  {categoryMap[article.categoryId] || categoryName || "General"}
                </span>
                <span>•</span>
                <span>{formatDate(article.publishedAt)}</span>
                {article.viewCount !== undefined && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      {article.viewCount.toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Huge Serif Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-serif leading-tight text-foreground mb-8 text-balance drop-shadow-sm">
                {article.title}
              </h1>

              {/* Author / Source (Optional, kept minimal) */}
              {article.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                >
                  <span>Synced from Source</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </motion.div>
          </div>

          {/* 2. Featured Image: Wide & Immersive */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full aspect-[21/9] md:aspect-[2/1] mb-16 overflow-hidden rounded-2xl shadow-2xl bg-gray-100 dark:bg-gray-900 group"
          >
            <Image
              src={imgSrc}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              onError={() =>
                setImgSrc(
                  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2070"
                )
              }
            />
            {/* Subtle Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>

          {/* 3. Action Bar: Sticky or Clean */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/50">
              <AudioPlayer
                text={`${article.title}. ${article.summary}. ${article.content}`}
              />
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <LikeButton articleId={article.id} />
                <BookmarkButton articleId={article.id} />
                <div className="h-6 w-px bg-border/50" />
                <ShareButtons
                  title={article.title}
                  url={`https://quickcut.info/article/${article.id}`}
                />
              </div>
            </div>
          </motion.div>

          {/* 4. Content Body: Highly Readable */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            {/* Summary / Lead Paragraph */}
            <div className="prose prose-xl md:prose-2xl max-w-none mb-12 dark:prose-invert font-serif leading-relaxed">
              <p className="font-bold text-foreground/80 border-l-4 border-accent pl-6 italic">
                {article.summary}
              </p>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg md:prose-xl max-w-none font-serif text-gray-800 dark:text-gray-200 leading-loose dark:prose-invert">
              {article.content.split("\n").map((paragraph, index) => {
                if (!paragraph.trim()) return null;

                // Drop Cap for the very first paragraph
                const isFirst = index === 0;

                return (
                  <p
                    key={index}
                    className={`mb-8 opacity-90 hover:opacity-100 transition-opacity ${
                      isFirst
                        ? "first-letter:float-left first-letter:text-7xl first-letter:font-bold first-letter:text-accent first-letter:mr-3 first-letter:mt-2"
                        : ""
                    }`}
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Divider */}
            <hr className="my-16 border-t font-serif text-center relative after:content-['***'] after:bg-background after:px-4 after:relative after:top-[-14px] after:text-muted-foreground" />

            <CommentSection articleId={article.id} />
          </motion.div>
        </article>

        {/* Read Next Section - Full Width Background */}
        <div className="bg-muted/30 py-16 border-t border-border">
          <div className="max-w-screen-xl mx-auto px-4">
            <h3 className="text-2xl font-bold font-serif mb-8 text-center">
              Continue Reading
            </h3>
            <RelatedArticles
              currentArticleId={article.id}
              categoryId={article.categoryId}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
