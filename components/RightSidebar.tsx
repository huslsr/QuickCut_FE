'use client';

import Link from 'next/link';
import { useState } from 'react';
import { subscriptionService } from '@/app/api/services/subscriptionService';
import FeaturedVideos from './FeaturedVideos';
import { NewsArticle } from '@/types/news';

interface RightSidebarProps {
  featuredVideos: NewsArticle[];
  trendingArticles?: NewsArticle[];
}

const CATEGORY_MAP: Record<string, string> = {
  '1': 'Cricket',
  '2': 'Football',
  '3': 'Movies',
  '4': 'Politics',
  '5': 'Tech',
  '6': 'Business',
  '7': 'World',
  '8': 'General',
};

export default function RightSidebar({ featuredVideos, trendingArticles = [] }: RightSidebarProps) {
  // Use passed trending articles, or fallback to first 5 featured videos if not provided (as a temporary measure if data is missing)
  const filteredTrending = trendingArticles.length > 0 ? trendingArticles.slice(0, 5) : [];
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email) return;
    setLoading(true);
    try {
       await subscriptionService.subscribe(email);
       setShowSuccess(true);
       setEmail('');
    } catch(e) {
       console.error(e);
       alert('Failed to subscribe. Please try again.');
    } finally {
       setLoading(false);
    }
  };

  return (
    <aside className="w-full lg:w-[350px] flex-shrink-0 space-y-12 border-l border-gray-100 dark:border-gray-800 lg:pl-12">
      
      {/* Trending Section */}
      <div>
        <div className="flex items-center justify-between mb-6 border-b-2 border-black dark:border-white pb-2">
          <Link href="/trending" className="group">
             <h3 className="text-lg font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 underline-offset-4 transition-all">Trending</h3>
          </Link>
        </div>
        <ul className="space-y-6">
          {filteredTrending.map((article, index) => (
            <li key={article.id} className="group cursor-pointer">
              <Link href={`/article/${article.id}`} className="flex items-start space-x-4">
                <span className="text-4xl font-black text-gray-200 dark:text-gray-600 group-hover:text-accent transition-colors leading-none">
                  {index + 1}
                </span>
                <div>
                  <span className="text-xs font-bold text-accent uppercase tracking-wider mb-1 block">
                    {CATEGORY_MAP[article.category] || article.category}
                  </span>
                  <h4 className="text-base font-bold font-serif leading-snug group-hover:underline decoration-2 underline-offset-4 line-clamp-2 text-black dark:text-white">
                    {article.title}
                  </h4>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Ad Placeholder Removed for Polish */}
      {/* 
      <div className="w-full bg-gray-100 dark:bg-neutral-900 flex flex-col items-center justify-center p-8 border border-gray-200 dark:border-gray-800 text-center">
         <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Advertisement</span>
         <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="font-serif text-gray-500 italic">Ad Space</span>
         </div>
      </div>
      */}

      {/* Featured Videos */}
      <FeaturedVideos videos={featuredVideos} />

      {/* Newsletter Box */}
      <div className="bg-black text-white p-8 text-center">
        <h3 className="text-2xl font-black font-serif mb-4">The Daily Brief</h3>
        <p className="text-gray-400 text-sm mb-6 font-serif">
          Essential news, expert analysis, and exclusive content delivered straight to your inbox.
        </p>
        
        {!showSuccess ? (
             <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
                <input 
                    type="email" 
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 text-black text-sm font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button 
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold uppercase tracking-widest py-3 hover:bg-accent hover:text-white transition-colors disabled:opacity-50"
                >
                {loading ? 'Subscribing...' : 'Subscribe Now'}
                </button>
             </form>
        ) : (
            <div className="bg-green-900/50 p-4 border border-green-500 rounded">
                <p className="text-green-400 font-bold mb-2">Thanks for subscribing!</p>
                <p className="text-xs text-green-300">You&apos;re on the list.</p>
            </div>
        )}
      </div>
    </aside>
  );
}
