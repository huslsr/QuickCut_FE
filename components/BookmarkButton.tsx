'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthProvider';
import { bookmarkService } from '@/app/api/services/bookmarkService';

export default function BookmarkButton({ articleId }: { articleId: string }) {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if bookmarked
    if (user && user.id) {
       checkBookmarkStatus();
    }
  }, [articleId, user]);

  const checkBookmarkStatus = async () => {
      if (!user?.id) return;
      // In a real app, we'd have a backend endpoint to check "isBookmarked" for a single ID.
      // For now, we fetch all bookmarks and check. This is less efficient but works with current API.
      // Optimization: Add /api/bookmarks/check endpoint later.
      try {
        const bookmarks = await bookmarkService.getBookmarks(user.id);
        const isSaved = bookmarks.some(b => b.id === articleId);
        setBookmarked(isSaved);
      } catch (err) {
        console.error("Failed to check bookmark status", err);
      }
  };

  const handleToggle = async () => {
    if (!user) {
        alert("Please login to bookmark stories.");
        return;
    }
    if (loading) return;

    setLoading(true);
    try {
      if (bookmarked) {
          // Remove
          await bookmarkService.removeBookmark(user.id, articleId);
          setBookmarked(false);
      } else {
          // Add
          await bookmarkService.addBookmark(user.id, articleId);
          setBookmarked(true);
      }
    } catch (err) {
      console.error("Failed to toggle bookmark", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={loading}
      className="flex items-center justify-center p-2 rounded-full transition-colors group"
      title={bookmarked ? "Remove Bookmark" : "Bookmark this story"}
    >
      <div className={`p-2 rounded-full transition-colors ${bookmarked ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'}`}>
        <svg 
            className={`w-5 h-5 ${bookmarked ? 'fill-current' : 'fill-none'} stroke-current`} 
            viewBox="0 0 24 24" 
            transform={bookmarked ? "scale(1.1)" : "scale(1)"}
            style={{ transition: "transform 0.2s" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </div>
    </button>
  );
}
