'use client';

import Header from '@/components/Header';
import SubNav from '@/components/SubNav';
import NewsFeed from '@/components/NewsFeed';
import RightSidebar from '@/components/RightSidebar';
import Footer from '@/components/Footer';

import { articleService, Article } from './api/services/articleService';
import { NewsArticle } from '@/types/news';
import { useEffect, useState } from 'react';

import { categoryService, Category } from './api/services/categoryService';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [videos, setVideos] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 18;

  const [inputPage, setInputPage] = useState('1');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [articlesResponse, videosData, categoriesData] = await Promise.all([
          articleService.getAllArticles(undefined, undefined, page, pageSize),
          articleService.getFeaturedVideos(),
          categoryService.getAllCategories()
        ]);
        
        // Create a map of ID -> Name
        const categoryMap: Record<string, string> = {};
        categoriesData.forEach(cat => {
            categoryMap[cat.id] = cat.name;
        });
        
        setArticles(articlesResponse.content);
        setTotalPages(articlesResponse.totalPages);

        setVideos(videosData);
        setCategories(categoryMap);
      } catch (error) {
        console.error('❌ [Frontend] Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]); // Re-run when page changes

  // Sync inputPage when page changes (e.g. via Next/Prev buttons)
  useEffect(() => {
    setInputPage((page + 1).toString());
  }, [page]);

  const handlePageInputSubmit = () => {
    const val = parseInt(inputPage);
    if (!isNaN(val) && val >= 1 && val <= totalPages) {
        setPage(val - 1);
    } else {
        // Reset if invalid
        setInputPage((page + 1).toString());
    }
  };

  const topStory = articles.length > 0 ? articles[0] : null;
  const newsArticles = articles.length > 1 ? articles.slice(1) : [];

  const mapToNewsArticle = (article: Article): NewsArticle => ({
    id: article.id.toString(),
    title: article.title,
    summary: article.summary,
    imageUrl: article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2070',
    category: categories[article.categoryId || ''] || article.categoryId || 'General',
    author: 'QuickCut Team',
    timestamp: article.publishedAt, 
    sourceUrl: article.url || '#',
  });

  const adaptedTopStory: NewsArticle | null = topStory ? mapToNewsArticle(topStory) : null;
  const adaptedArticles: NewsArticle[] = newsArticles.map(mapToNewsArticle);
  const adaptedVideos: NewsArticle[] = videos.map(mapToNewsArticle);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <SubNav />
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-16">
             <div className="flex-1">
                {adaptedTopStory ? (
                    <NewsFeed topStory={adaptedTopStory} articles={adaptedArticles} />
                ) : (
                   <div className="flex-1 flex items-center justify-center min-h-[400px] border-t-4 border-black">
                      <div className="text-center">
                        <h2 className="text-4xl font-black font-serif mb-4">No Stories Found</h2>
                        <p className="text-gray-500 font-serif text-lg">Please seed the database to see content here.</p>
                      </div>
                   </div>
                )}
                
                {/* Pagination Controls */}
                 {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-8 mt-12 mb-8 border-t border-gray-100 pt-8">
                        <button
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            disabled={page === 0}
                            className={`px-6 py-3 border-2 border-black font-bold uppercase tracking-widest transition-colors ${
                                page === 0 
                                ? 'opacity-30 cursor-not-allowed bg-gray-50' 
                                : 'hover:bg-black hover:text-white'
                            }`}
                        >
                            Previous
                        </button>
                        <div className="flex items-center space-x-2 font-serif italic text-gray-500">
                            <span>Page</span>
                            <input
                                type="number"
                                min={1}
                                max={totalPages}
                                value={inputPage}
                                onChange={(e) => setInputPage(e.target.value)}
                                onBlur={handlePageInputSubmit}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handlePageInputSubmit();
                                        (e.target as HTMLInputElement).blur();
                                    }
                                }}
                                className="w-16 text-center border-b-2 border-gray-300 focus:border-black outline-none bg-transparent font-sans font-bold not-italic text-black"
                            />
                            <span>of {totalPages}</span>
                        </div>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                            disabled={page >= totalPages - 1}
                            className={`px-6 py-3 border-2 border-black font-bold uppercase tracking-widest transition-colors ${
                                page >= totalPages - 1 
                                ? 'opacity-30 cursor-not-allowed bg-gray-50' 
                                : 'hover:bg-black hover:text-white'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                )}
             </div>

            <RightSidebar featuredVideos={adaptedVideos} trendingArticles={adaptedArticles.slice(0, 5)} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
