'use client';

import Link from 'next/link';
import { useState } from 'react';
import { subscriptionService } from '@/app/api/services/subscriptionService';
import FeaturedVideos from './FeaturedVideos';
import PollWidget from './PollWidget';
import TriviaWidget from './TriviaWidget';
import OnThisDayWidget from './OnThisDayWidget';
import WordOfTheDayWidget from './WordOfTheDayWidget';
import QuoteWidget from './QuoteWidget';
import LifeHackWidget from './LifeHackWidget';
import { NewsArticle } from '@/types/news';
import { useCategories } from '@/app/context/CategoryContext';

interface RightSidebarProps {
  featuredVideos: NewsArticle[];
  trendingArticles?: NewsArticle[];
}

export default function RightSidebar({ featuredVideos, trendingArticles = [] }: RightSidebarProps) {
  // Use passed trending articles, or fallback to first 5 featured videos if not provided (as a temporary measure if data is missing)
  const filteredTrending = trendingArticles.length > 0 ? trendingArticles.slice(0, 5) : [];
  const { categoryMap } = useCategories();
  
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
      {/* Trending Section */}
      {/* Trending Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-neutral-900 border border-indigo-100 dark:border-indigo-900/30 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-8 border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
          <Link href="/trending" className="group flex items-center space-x-2">
             <span className="w-3 h-3 rounded-full bg-indigo-600 animate-pulse"></span>
             <h3 className="text-sm font-black uppercase tracking-widest text-indigo-900 dark:text-indigo-100 group-hover:text-indigo-700 transition-all">TRENDING NOW</h3>
          </Link>
        </div>
        <ul className="space-y-8">
          {filteredTrending.map((article, index) => (
            <li key={article.id} className="group cursor-pointer flex gap-4 items-start">
              <span className="text-4xl font-black text-indigo-600 leading-none select-none font-serif group-hover:scale-110 group-hover:text-indigo-700 transition-all duration-300 w-8 text-center shrink-0">
                {index + 1}
              </span>
              <Link href={`/article/${article.id}`} className="block">
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1 block">
                  {categoryMap[article.category] || article.category}
                </span>
                <h4 className="text-base font-bold font-serif leading-snug group-hover:text-indigo-700 transition-colors text-foreground line-clamp-2">
                  {article.title}
                </h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Ad Placeholder Removed for Polish */}
      <PollWidget />

      {/* Trivia Widget */}
      <TriviaWidget />

      {/* On This Day Widget */}
      <OnThisDayWidget />

      {/* Word Of The Day Widget */}
      <WordOfTheDayWidget />

      {/* Quote Widget */}
      <QuoteWidget />

      {/* Life Hack Widget */}
      <LifeHackWidget />

      {/* Featured Videos */}
      <FeaturedVideos videos={featuredVideos} />

      {/* Newsletter Box */}
      <div className="bg-gradient-to-br from-primary to-slate-800 text-primary-foreground p-8 text-center rounded-2xl shadow-xl ring-1 ring-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <h3 className="text-2xl font-black font-serif mb-4 relative z-10">The Daily Brief</h3>
        <p className="text-primary-foreground/80 text-sm mb-6 font-serif relative z-10">
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
                className="w-full bg-accent text-accent-foreground font-bold uppercase tracking-widest py-3 hover:bg-white hover:text-black transition-colors disabled:opacity-50"
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
