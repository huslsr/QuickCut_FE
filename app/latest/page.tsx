'use client';

import Header from '@/components/Header';
import SubNav from '@/components/SubNav';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import SkeletonStoryCard from '@/components/SkeletonStoryCard';
import { articleService, Article } from '@/app/api/services/articleService';
import { categoryService } from '@/app/api/services/categoryService';
import { NewsArticle } from '@/types/news';
import { useEffect, useState } from 'react';
import { APP_CONFIG } from '@/app/config/constants';

export default function LatestNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = APP_CONFIG.PAGINATION.HOME_PAGE_SIZE;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [articlesResponse, categoriesData] = await Promise.all([
          articleService.getAllArticles(undefined, undefined, page, pageSize),
          categoryService.getAllCategories()
        ]);

        const categoryMap: Record<string, string> = {};
        categoriesData.forEach(cat => {
          categoryMap[cat.id] = cat.name;
        });

        setArticles(articlesResponse.content);
        setTotalPages(articlesResponse.totalPages);
        setCategories(categoryMap);
      } catch (error) {
        console.error('❌ [Frontend] Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const mapToNewsArticle = (article: Article): NewsArticle => ({
    id: article.id.toString(),
    title: article.title,
    summary: article.summary,
    imageUrl: article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2070',
    category: categories[article.categoryId || ''] || article.categoryId || 'General',
    timestamp: article.publishedAt,
    sourceUrl: article.url || '#',
  });

  const adaptedArticles: NewsArticle[] = articles.map(mapToNewsArticle);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-background transition-colors">
        <Header />
        <SubNav />
        <main className="flex-1 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12 border-b-4 border-black dark:border-white pb-4">
              <h1 className="text-5xl font-black font-serif uppercase tracking-tighter text-black dark:text-white">
                Latest News
              </h1>
              <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 font-serif max-w-3xl">
                Fresh stories from around the globe, updated in real-time.
              </p>
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
            <h1 className="text-5xl font-black font-serif uppercase tracking-tighter text-black dark:text-white">
              Latest News
            </h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 font-serif max-w-3xl">
              Fresh stories from around the globe, updated in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {adaptedArticles.map((article) => (
              <StoryCard key={article.id} article={article} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-8 mt-12 mb-8 border-t border-gray-100 dark:border-gray-800 pt-8">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className={`px-6 py-3 border-2 border-black dark:border-white font-bold uppercase tracking-widest transition-colors ${page === 0
                    ? 'opacity-30 cursor-not-allowed bg-gray-50 dark:bg-neutral-900 text-gray-400 dark:text-gray-600'
                    : 'hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black'
                  }`}
              >
                Previous
              </button>
              <div className="flex items-center space-x-2 font-serif italic text-gray-500 dark:text-gray-400">
                <span>Page {page + 1} of {totalPages}</span>
              </div>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className={`px-6 py-3 border-2 border-black dark:border-white font-bold uppercase tracking-widest transition-colors ${page >= totalPages - 1
                    ? 'opacity-30 cursor-not-allowed bg-gray-50 dark:bg-neutral-900 text-gray-400 dark:text-gray-600'
                    : 'hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black'
                  }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}