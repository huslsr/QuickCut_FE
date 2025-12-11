'use client';

import { NewsArticle } from '@/types/news';
import { formatDate } from '@/app/utils/dateFormatter';
import Image from 'next/image';
import Link from 'next/link';
import { bookmarkService } from '@/app/api/services/bookmarkService';
import { useAuth } from '@/app/context/AuthProvider';

interface StoryCardProps {
  article: NewsArticle;
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

export default function StoryCard({ article }: StoryCardProps) {
  const { user } = useAuth();
  const categoryName = CATEGORY_MAP[article.category] || article.category;

  return (
    <Link href={`/article/${article.id}`} className="group cursor-pointer flex flex-col h-full">
      <article className="flex flex-col h-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm dark:shadow-none transition-all duration-300 hover:shadow-md">
        <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-white text-black dark:bg-black dark:text-white px-3 py-1 text-xs font-bold uppercase tracking-widest border border-black dark:border-white">
            {categoryName}
          </div>
          
          <div className="absolute top-4 right-16 bg-white/90 dark:bg-black/80 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-md z-10"
               onClick={async (e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 if (!user) {
                   // Optional: router.push('/login') or alert
                   alert('Please login to bookmark stories!');
                   return;
                 }
                 try {
                     if (user?.id) {
                        await bookmarkService.addBookmark(user.id, article.id);
                        alert('Story bookmarked!');
                     }
                 } catch (err) {
                     alert('Failed to bookmark.');
                 }
               }}
               title="Bookmark this story"
          >
             <svg className="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
             </svg>
          </div>

          <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-md z-10" 
               onClick={(e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 navigator.clipboard.writeText(`${window.location.origin}/article/${article.id}`);
                 alert('Link copied to clipboard!');
               }}
               title="Share this story"
          >
             <svg className="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
             </svg>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col p-4 pt-0">
          <h2 className="text-2xl font-bold font-serif leading-tight mb-3 group-hover:text-accent transition-colors text-black dark:text-gray-100">
            {article.title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 font-serif">
            {article.summary}
          </p>
          
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
            {article.author && <span>{article.author}</span>}
            <div className="flex flex-col items-end">
                <span>{formatDate(article.timestamp)}</span>
                {/* DEBUG: Show raw to verify server response */}
                <span className="text-[9px] lowercase opacity-50">{article.timestamp}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
