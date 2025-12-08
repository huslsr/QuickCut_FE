'use client';

import { NewsArticle } from '@/types/news';
import { formatDate } from '@/app/utils/dateFormatter';
import Image from 'next/image';
import Link from 'next/link';

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
  const categoryName = CATEGORY_MAP[article.category] || article.category;

  return (
    <Link href={`/article/${article.id}`} className="group cursor-pointer flex flex-col h-full">
      <article className="flex flex-col h-full bg-white dark:bg-neutral-900 border border-transparent dark:border-neutral-800 transition-colors">
        <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-white dark:bg-black dark:text-white px-3 py-1 text-xs font-bold uppercase tracking-widest border border-black dark:border-white">
            {categoryName}
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
            <span>{formatDate(article.timestamp)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
