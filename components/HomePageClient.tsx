"use client";

import Header from "@/components/Header";
import SubNav from "@/components/SubNav";
import NewsFeed from "@/components/NewsFeed";
import Footer from "@/components/Footer";
import SkeletonStoryCard from "@/components/SkeletonStoryCard";
import dynamic from "next/dynamic";

const RightSidebar = dynamic(() => import("@/components/RightSidebar"), {
  loading: () => (
    <aside className="hidden lg:block w-[350px] flex-shrink-0 border-l border-gray-100 dark:border-gray-800 lg:pl-12 space-y-12">
      <div className="h-[600px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl" />
    </aside>
  ),
});

import { articleService, Article } from "@/app/api/services/articleService";
import { NewsArticle } from "@/types/news";
import { useEffect, useState, useRef } from "react";

import { useCategories } from "@/app/context/CategoryContext";
import { APP_CONFIG } from "@/app/config/constants";

interface HomePageClientProps {
  initialArticles: Article[];
  initialTotalPages: number;
}

export default function HomePageClient({
  initialArticles,
  initialTotalPages,
}: HomePageClientProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [videos, setVideos] = useState<Article[]>([]);
  const { categoryMap } = useCategories();

  // Granular Loading States
  // Start false for articles because we have initial data
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const pageSize = APP_CONFIG.PAGINATION.HOME_PAGE_SIZE;

  const [inputPage, setInputPage] = useState("1");
  const isFirstRun = useRef(true);

  useEffect(() => {
    // 2. Fetch Featured Videos (Independent)
    setLoadingVideos(false); // Ensure loading state is cleared (disabled feature)
  }, []); // Run once on mount

  useEffect(() => {
    // 3. Fetch Main Articles (Dependent on Page)
    const fetchArticles = async () => {
      // Logic to skip the initial fetch if we already have data from SSR
      if (isFirstRun.current) {
        isFirstRun.current = false;
        if (initialArticles.length > 0 && page === 0) {
          return;
        }
      }

      setLoadingArticles(true);
      try {
        const response = await articleService.getAllArticles(
          undefined,
          undefined,
          page,
          pageSize
        );
        setArticles(response.content);
        setTotalPages(response.totalPages);
      } catch (e) {
        console.error("Failed articles", e);
      } finally {
        setLoadingArticles(false);
      }
    };

    fetchArticles();
  }, [page, pageSize, initialArticles]); // Re-run when page changes

  // Sync inputPage when page changes
  useEffect(() => {
    setInputPage((page + 1).toString());
  }, [page]);

  const handlePageInputSubmit = () => {
    const val = parseInt(inputPage);
    if (!isNaN(val) && val >= 1 && val <= totalPages) {
      setPage(val - 1);
    } else {
      setInputPage((page + 1).toString());
    }
  };

  const topStory = articles.length > 0 ? articles[0] : null;
  const newsArticles = articles.length > 1 ? articles.slice(1) : [];

  // Fallback Images by Category
  const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
    Business:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    Technology:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800",
    World:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800",
    Politics:
      "https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=800",
    Entertainment:
      "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&q=80&w=800",
    Science:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
    Health:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
    Sports:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
    General:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
  };

  const mapToNewsArticle = (article: Article): NewsArticle => {
    // Create Map on the fly (efficient enough for small list)
    const catName =
      categoryMap[article.categoryId || ""] || article.categoryId || "General";

    // Use article image -> Category Fallback -> General Fallback
    const fallback =
      CATEGORY_FALLBACK_IMAGES[catName] || CATEGORY_FALLBACK_IMAGES["General"];

    return {
      id: article.id.toString(),
      title: article.title,
      summary: article.summary,
      imageUrl: article.imageUrl || fallback,
      category: catName,
      timestamp: article.publishedAt,
      sourceUrl: article.url || "#",
      viewCount: article.viewCount,
    };
  };

  const adaptedTopStory: NewsArticle | null = topStory
    ? mapToNewsArticle(topStory)
    : null;
  const adaptedArticles: NewsArticle[] = newsArticles.map(mapToNewsArticle);
  const adaptedVideos: NewsArticle[] = videos.map(mapToNewsArticle);

  /* Structured Data for SEO */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "QuickCut News",
    url: "https://quickcut.info",
    logo: {
      "@type": "ImageObject",
      url: "https://ibb.co/S1jGJWc",
    },
    sameAs: [
      "https://x.com/QuicCut",
      "https://www.facebook.com/profile.php?id=61584552434821",
      "https://www.instagram.com/quickcut_official_news/",
    ],
    description:
      "Your trusted source for global news, expert perspectives, and timely updates.",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <SubNav />
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* LEFT COLUMN: Main Feed */}
            <div className="flex-1">
              {loadingArticles ? (
                <div className="flex-1 animate-pulse">
                  {/* Top Story Skeleton */}
                  <div className="w-full aspect-[2/1] bg-muted rounded-2xl mb-12" />

                  <div className="border-t-4 border-primary pt-8 mb-12">
                    <div className="h-8 w-64 bg-muted mb-8 rounded" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonStoryCard key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {adaptedTopStory ? (
                    <NewsFeed
                      topStory={adaptedTopStory}
                      articles={adaptedArticles}
                    />
                  ) : (
                    <div className="flex-1 flex items-center justify-center min-h-[400px] border-t-4 border-black dark:border-white">
                      <div className="text-center">
                        <h2 className="text-4xl font-black font-serif mb-4 dark:text-white">
                          No Stories Found
                        </h2>
                        <p className="text-gray-500 font-serif text-lg">
                          Please seed the database to see content here.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-12 mb-8 border-t border-gray-100 dark:border-gray-800 pt-8">
                      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                        <button
                          onClick={() => setPage((p) => Math.max(0, p - 1))}
                          disabled={page === 0}
                          className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 border-2 border-primary font-bold uppercase tracking-widest transition-all duration-300 rounded-lg text-sm sm:text-base ${
                            page === 0
                              ? "cursor-not-allowed bg-muted text-muted-foreground border-border"
                              : "text-primary hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 hover:shadow-lg shadow-sm"
                          }`}
                        >
                          Previous
                        </button>

                        <button
                          onClick={() =>
                            setPage((p) => Math.min(totalPages - 1, p + 1))
                          }
                          disabled={page >= totalPages - 1}
                          className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 border-2 border-primary font-bold uppercase tracking-widest transition-all duration-300 rounded-lg text-sm sm:text-base sm:hidden ${
                            page >= totalPages - 1
                              ? "cursor-not-allowed bg-muted text-muted-foreground border-border"
                              : "text-primary hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 hover:shadow-lg shadow-sm"
                          }`}
                        >
                          Next
                        </button>
                      </div>

                      <div className="flex items-center space-x-2 font-serif italic text-gray-500 dark:text-gray-400">
                        <span>Page</span>
                        <input
                          type="number"
                          min={1}
                          max={totalPages}
                          value={inputPage}
                          onChange={(e) => setInputPage(e.target.value)}
                          onBlur={handlePageInputSubmit}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handlePageInputSubmit();
                              (e.target as HTMLInputElement).blur();
                            }
                          }}
                          className="w-16 text-center border-b-2 border-gray-300 focus:border-black dark:border-gray-600 dark:focus:border-white outline-none bg-transparent font-sans font-bold not-italic text-black dark:text-white"
                        />
                        <span>of {totalPages}</span>
                      </div>

                      <button
                        onClick={() =>
                          setPage((p) => Math.min(totalPages - 1, p + 1))
                        }
                        disabled={page >= totalPages - 1}
                        className={`hidden sm:block px-6 py-3 border-2 border-primary font-bold uppercase tracking-widest transition-all duration-300 rounded-lg ${
                          page >= totalPages - 1
                            ? "cursor-not-allowed bg-muted text-muted-foreground border-border"
                            : "text-primary hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 hover:shadow-lg shadow-sm"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* RIGHT COLUMN: Sidebar (Independent Loading) */}
            <RightSidebar
              featuredVideos={adaptedVideos}
              trendingArticles={adaptedArticles.slice(0, 5)}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
