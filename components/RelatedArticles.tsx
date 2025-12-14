'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { articleService, Article } from '@/app/api/services/articleService';
import StoryCard from './StoryCard';

export default function RelatedArticles({ currentArticleId, categoryId }: { currentArticleId: string, categoryId: string }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '6000px' // Start fetching 600px BEFORE it enters viewport
      }
    );
    
    const element = document.getElementById('related-articles-section');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !categoryId) return;

    const fetchRelated = async () => {
        try {
            const data = await articleService.getArticlesByCategory(categoryId);
            // Filter out current article and limit to 3
            const related = data.content
                .filter(a => a.id !== currentArticleId)
                .slice(0, 3);
            setArticles(related);
        } catch (err) {
            console.error("Failed to fetch related articles");
        }
    };
    fetchRelated();
  }, [isVisible, categoryId, currentArticleId]);

  // if (articles.length === 0) return null; // Removed early return to allow observation

  return (
    <div id="related-articles-section" className="mt-16 border-t-8 border-black dark:border-white pt-12 min-h-[100px]">
      {articles.length > 0 && (
        <>
        <h3 className="text-3xl font-black font-serif mb-8 uppercase tracking-tight dark:text-white">You Might Also Like</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map(article => (
                <StoryCard 
                    key={article.id} 
                    article={{
                        ...article,
                        category: article.categoryId, // Map if necessary or fetch name
                        timestamp: article.publishedAt,
                        sourceUrl: article.url
                    }} 
                />
            ))}
        </div>
        </>
      )}
    </div>
  );
}
