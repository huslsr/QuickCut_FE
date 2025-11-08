import { NewsArticle } from '@/types/news';
import Image from 'next/image';

interface TopStoryCardProps {
  article: NewsArticle;
}

export default function TopStoryCard({ article }: TopStoryCardProps) {
  return (
    <article className="mb-8">
      <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden group cursor-pointer">
        {article.videoUrl ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition">
              <svg className="w-10 h-10 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        ) : null}
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
          <span className="text-xs font-semibold text-white bg-red-600 px-2 py-1 rounded uppercase mb-2 inline-block">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            {article.title}
          </h1>
          <p className="text-gray-200 text-sm mb-3">{article.summary}</p>
          <div className="flex items-center text-xs text-gray-300">
            <span>By {article.author}</span>
            <span className="mx-2">•</span>
            <time>{new Date(article.timestamp).toLocaleDateString()}</time>
          </div>
        </div>
      </div>
    </article>
  );
}
