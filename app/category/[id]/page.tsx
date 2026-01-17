"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "@/components/SubNav";
import StoryCard from "@/components/StoryCard";
import SkeletonStoryCard from "@/components/SkeletonStoryCard";
import { articleService, Article } from "@/app/api/services/articleService";
import { categoryService, Category } from "@/app/api/services/categoryService";
import { NewsArticle } from "@/types/news";

import { APP_CONFIG } from "@/app/config/constants";

export default function CategoryPage() {
  const params = useParams();
  const id = params.id as string;
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = APP_CONFIG.PAGINATION.CATEGORY_PAGE_SIZE;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch Articles
      try {
        console.log(
          `[CategoryPage] Requesting articles for category ${id}, page ${page}`
        );
        const response = await articleService.getAllArticles(
          id,
          undefined,
          page,
          pageSize
        );
        console.log(
          `[CategoryPage] Fetched ${response.content.length} articles`
        );
        setArticles(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("[CategoryPage] Failed to fetch articles:", error);
      }

      // Fetch Category Details
      try {
        console.log(`[CategoryPage] Requesting category details for ${id}`);
        const categoryData = await categoryService.getCategoryById(id);
        console.log(`[CategoryPage] Fetched category:`, categoryData);
        setCategory(categoryData);
      } catch (error) {
        console.error(
          "[CategoryPage] Failed to fetch category details:",
          error
        );
      }

      setLoading(false);
    };

    if (id) {
      fetchData();
    }
  }, [id, page, pageSize]);

  // Update Page Title for UX/SEO
  useEffect(() => {
    if (category?.name) {
      document.title = `${category.name} News | QuickCut`;
    }
  }, [category]);

  const mapToNewsArticle = (article: Article): NewsArticle => ({
    id: article.id.toString(),
    title: article.title,
    summary: article.summary,
    imageUrl:
      article.imageUrl ||
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2070",
    category: category?.name || article.categoryId || "General",
    author: "QuickCut Team",
    timestamp: article.publishedAt,
    sourceUrl: article.url || "#",
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-background transition-colors">
        <Header />
        <SubNav />
        <main className="flex-1 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12 border-b-4 border-black dark:border-white pb-4">
              <h1 className="text-5xl font-black font-serif uppercase tracking-tighter text-black dark:text-white">
                {category?.name || "Loading..."}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonStoryCard key={i} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background transition-colors">
      <Header />
      <SubNav />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12 border-b-4 border-black dark:border-white pb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h1 className="text-5xl font-black font-serif uppercase tracking-tighter text-black dark:text-white">
                  {category?.name || "Category"}
                </h1>
                {category?.description && (
                  <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 font-serif max-w-3xl">
                    {category.description}
                  </p>
                )}
              </div>

              {/* Jefferies Link for Stocks Page */}
              {(id === "10" || category?.name === "Stocks") && (
                <a
                  href="https://jefferies.streamlit.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest hover:opacity-80 transition-opacity mb-2"
                >
                  <span>Analyze stock with Professionals</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                {articles.map((article) => (
                  <StoryCard
                    key={article.id}
                    article={mapToNewsArticle(article)}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-8 mt-16 border-t border-gray-100 dark:border-gray-800 pt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className={`px-6 py-3 border-2 border-black dark:border-white font-bold uppercase tracking-widest transition-colors ${
                      page === 0
                        ? "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200 dark:bg-neutral-900 dark:text-gray-600 dark:border-neutral-800"
                        : "text-black hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                    }`}
                  >
                    Previous
                  </button>
                  <div className="flex items-center space-x-2 font-serif italic text-gray-500 dark:text-gray-400">
                    <span>Page</span>
                    <input
                      type="number"
                      min={1}
                      max={totalPages}
                      value={page + 1}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 1 && val <= totalPages) {
                          setPage(val - 1);
                        }
                      }}
                      className="w-16 text-center border-b-2 border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white outline-none bg-transparent font-sans font-bold not-italic text-black dark:text-white"
                    />
                    <span>of {totalPages}</span>
                  </div>
                  <button
                    onClick={() =>
                      setPage((p) => Math.min(totalPages - 1, p + 1))
                    }
                    disabled={page >= totalPages - 1}
                    className={`px-6 py-3 border-2 border-black dark:border-white font-bold uppercase tracking-widest transition-colors ${
                      page >= totalPages - 1
                        ? "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200 dark:bg-neutral-900 dark:text-gray-600 dark:border-neutral-800"
                        : "text-black hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <h2 className="text-2xl font-bold font-serif mb-2 dark:text-white">
                  No Stories Found
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  There are no articles in this category yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
