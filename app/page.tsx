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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesData, videosData, categoriesData] = await Promise.all([
          articleService.getAllArticles(),
          articleService.getFeaturedVideos(),
          categoryService.getAllCategories()
        ]);
        
        // Create a map of ID -> Name
        const categoryMap: Record<string, string> = {};
        categoriesData.forEach(cat => {
            categoryMap[cat.id] = cat.name;
        });
        
        setArticles(articlesData);
        setVideos(videosData);
        setCategories(categoryMap);
      } catch (error) {
        console.error('❌ [Frontend] Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            {adaptedTopStory && (
              <NewsFeed topStory={adaptedTopStory} articles={adaptedArticles} />
            )}
            {!adaptedTopStory && (
               <div className="flex-1 flex items-center justify-center min-h-[400px] border-t-4 border-black">
                  <div className="text-center">
                    <h2 className="text-4xl font-black font-serif mb-4">No Stories Found</h2>
                    <p className="text-gray-500 font-serif text-lg">Please seed the database to see content here.</p>
                  </div>
               </div>
            )}
            <RightSidebar featuredVideos={adaptedVideos} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
