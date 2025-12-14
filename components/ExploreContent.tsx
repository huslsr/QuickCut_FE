'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { articleService, Article } from '@/app/api/services/articleService';
import { useCategories } from '@/app/context/CategoryContext';
import PollWidget from './PollWidget';
import TriviaWidget from './TriviaWidget';
import OnThisDayWidget from './OnThisDayWidget';
import WordOfTheDayWidget from './WordOfTheDayWidget';
import QuoteWidget from './QuoteWidget';
import LifeHackWidget from './LifeHackWidget';
import FeaturedVideos from './FeaturedVideos';
import { NewsArticle } from '@/types/news';

export default function ExploreContent() {
  const [trendingArticles, setTrendingArticles] = useState<NewsArticle[]>([]);
  const { categoryMap } = useCategories();

    // Fallback Images by Category (Copied from page.tsx for consistency)
    const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
        'Business': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        'Technology': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800',
        'World': 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800',
        'Politics': 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=800',
        'Entertainment': 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&q=80&w=800',
        'Science': 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800',
        'Health': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
        'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
        'General': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800'
    };

    const mapToNewsArticle = (article: Article): NewsArticle => {
        const catName = categoryMap[article.categoryId || ''] || article.categoryId || 'General';
        const fallback = CATEGORY_FALLBACK_IMAGES[catName] || CATEGORY_FALLBACK_IMAGES['General'];
        
        return {
            id: article.id.toString(),
            title: article.title,
            summary: article.summary,
            imageUrl: article.imageUrl || fallback,
            category: catName,
            timestamp: article.publishedAt, 
            sourceUrl: article.url || '#',
        };
    };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        // Fetch latest articles as proxy for trending
        const response = await articleService.getAllArticles(undefined, undefined, 0, 5);
        const mapped = response.content.map(mapToNewsArticle);
        setTrendingArticles(mapped);
      } catch (error) {
        console.error('Failed to fetch trending for explore', error);
      }
    };
    fetchTrending();
  }, [categoryMap]); // Add dependency if categoryMap is loaded async, though usually context provides it.

  return (
    <div className="space-y-12 pb-12">
      
      {/* Trending Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-neutral-900 border border-indigo-100 dark:border-indigo-900/30 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-8 border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
          <Link href="/trending" className="group flex items-center space-x-2">
             <span className="w-3 h-3 rounded-full bg-indigo-600 animate-pulse"></span>
             <h3 className="text-sm font-black uppercase tracking-widest text-indigo-900 dark:text-indigo-100 group-hover:text-indigo-700 transition-all">TRENDING NOW</h3>
          </Link>
        </div>
        
        {trendingArticles.length > 0 ? (
            <ul className="space-y-8">
            {trendingArticles.map((article, index) => (
                <li key={article.id} className="group cursor-pointer flex gap-4 items-start">
                <span className="text-4xl font-black text-indigo-600 leading-none select-none font-serif group-hover:scale-110 group-hover:text-indigo-700 transition-all duration-300 w-8 text-center shrink-0">
                    {index + 1}
                </span>
                <Link href={`/article/${article.id}`} className="block">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1 block">
                    {article.category}
                    </span>
                    <h4 className="text-base font-bold font-serif leading-snug group-hover:text-indigo-700 transition-colors text-foreground line-clamp-2">
                    {article.title}
                    </h4>
                </Link>
                </li>
            ))}
            </ul>
        ) : (
             <p className="text-sm text-muted-foreground italic">Loading trending stories...</p>
        )}
      </div>

      <PollWidget />

      <TriviaWidget />

      <OnThisDayWidget />

      <WordOfTheDayWidget />

      <QuoteWidget />

      <LifeHackWidget />

      {/* Featured Videos - Passing empty for now as it's disabled in Home too */}
      <FeaturedVideos videos={[]} />

    </div>
  );
}
