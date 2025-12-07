'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubNav from '@/components/SubNav';
import StoryCard from '@/components/StoryCard';
import { articleService, Article } from '@/app/api/services/articleService';
import { NewsArticle } from '@/types/news';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  console.log(`[SearchPage] Query param: ${query}`);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        // Pass undefined for categoryId, and query for the search term
        const response = await articleService.getAllArticles(undefined, query);
        setArticles(response.content);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchArticles();
    } else {
        setArticles([]);
        setLoading(false);
    }
  }, [query]);

  const mapToNewsArticle = (article: Article): NewsArticle => ({
    id: article.id.toString(),
    title: article.title,
    summary: article.summary,
    imageUrl: article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2070',
    category: article.categoryId || 'General',
    author: 'QuickCut Team',
    timestamp: new Date(article.publishedAt).toLocaleDateString(),
    sourceUrl: article.url || '#',
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <SubNav />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <SubNav />
      
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12 border-b-4 border-black pb-4">
             <h1 className="text-4xl font-black font-serif uppercase tracking-tighter">
              Search Results
            </h1>
            <p className="mt-4 text-xl text-gray-500 font-serif">
               Showing results for <span className="font-bold text-black">&quot;{query}&quot;</span>
            </p>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {articles.map((article) => (
                <StoryCard key={article.id} article={mapToNewsArticle(article)} />
              ))}
            </div>
          ) : (
             <div className="flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <h2 className="text-2xl font-bold font-serif mb-2">No Stories Found</h2>
                  <p className="text-gray-500">We couldn&apos;t find any articles matching your search.</p>
                </div>
             </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
