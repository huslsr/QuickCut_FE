import { NewsArticle } from '@/types/news';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getFallbackImage } from '@/app/config/fallbacks';

interface TopStoryCardProps {
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

export default function TopStoryCard({ article }: TopStoryCardProps) {
  const categoryName = CATEGORY_MAP[article.category] || article.category;
  const [imgSrc, setImgSrc] = useState(article.imageUrl);

  return (
    <Link href={`/article/${article.id}`} className="block mb-16 group cursor-pointer border-b border-gray-200 pb-12">
      <article className="flex flex-col gap-8">
        
        {/* Header: Label & Title */}
        <div className="w-full text-center max-w-5xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="w-3 h-3 bg-accent rounded-full"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Top Story
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black font-serif leading-tight mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors text-black dark:text-white">
            {article.title}
          </h1>
        </div>

        {/* Image */}
        <div className="relative h-[600px] w-full overflow-hidden">
          <Image
            src={imgSrc}
            alt={article.title}
            fill
            className="object-cover transition-all duration-700 ease-out"
            priority
            onError={() => setImgSrc(getFallbackImage(categoryName))}
          />
          {article.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 bg-white/90 flex items-center justify-center rounded-full shadow-xl">
                <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Metadata/Summary (Below Image) */}
        <div className="w-full text-center max-w-3xl mx-auto">
           <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 font-serif leading-relaxed">
            {categoryName}
          </p>
          
          <div className="flex items-center justify-center text-sm font-bold uppercase tracking-wider space-x-4">
            <span className="text-black dark:text-white border-b-2 border-black dark:border-white pb-1">Read Full Story</span>
            {article.author && (
                <>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{article.author}</span>
                </>
            )}
          </div>
        </div>

      </article>
    </Link>
  );
}
