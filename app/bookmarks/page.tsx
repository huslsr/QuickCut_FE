'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthProvider';
import { bookmarkService } from '@/app/api/services/bookmarkService';
import { NewsArticle as Article } from '@/types/news';
import StoryCard from '@/components/StoryCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BookmarksPage() {
  const { user, loading: authLoading } = useAuth();
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/bookmarks');
      return;
    }

    if (user) {
      fetchBookmarks();
    }
  }, [user, authLoading]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      if (user?.id) {
        const data = await bookmarkService.getBookmarks(user.id);
        setBookmarks(data);
      }
    } catch (error) {
      console.error('Failed to fetch bookmarks', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || (loading && !bookmarks.length)) {
    return (
      <div className="min-h-screen bg-white dark:bg-background flex flex-col">
          <Header />
          <div className="flex-1 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
          </div>
          <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background flex flex-col transition-colors">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        <div className="mb-12 border-b border-black dark:border-white pb-8">
            <h1 className="text-4xl md:text-6xl font-black font-serif tracking-tighter text-black dark:text-white uppercase">
            My Saved Stories
            </h1>
            <p className="text-gray-500 mt-4 font-serif text-lg">
                Your personal collection of articles.
            </p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400 font-serif">No bookmarks yet.</h3>
            <p className="text-gray-500 mt-2">Start saving stories you like!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {bookmarks.map((article) => (
              <StoryCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
