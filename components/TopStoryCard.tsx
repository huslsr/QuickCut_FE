import { NewsArticle } from '@/types/news';
import Image from 'next/image';

interface TopStoryCardProps {
  article: NewsArticle;
}

export default function TopStoryCard({ article }: TopStoryCardProps) {
  return (
    <article className="mb-12 group cursor-pointer">
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-indigo-500/20">
        {article.videoUrl && (
          <div className="absolute top-6 right-6 z-20">
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 animate-pulse">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
        
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          priority
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-90" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 text-xs font-bold text-white bg-indigo-600 rounded-full uppercase tracking-wider shadow-lg shadow-indigo-600/30">
                {article.category}
              </span>
              <span className="text-gray-300 text-sm font-medium border-l border-gray-500 pl-3">
                {new Date(article.timestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-serif group-hover:text-indigo-100 transition-colors">
              {article.title}
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 line-clamp-2 max-w-2xl leading-relaxed">
              {article.summary}
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-white font-bold border-2 border-white/20">
                  {article.author.charAt(0)}
                </div>
                <span className="text-white font-medium">{article.author}</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300 text-sm">5 min read</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
