import { NewsArticle } from '@/types/news';
import Image from 'next/image';

interface StoryCardProps {
  article: NewsArticle;
}

const categoryColors: Record<string, string> = {
  Tech: 'bg-blue-100 text-blue-700',
  Sports: 'bg-green-100 text-green-700',
  Business: 'bg-purple-100 text-purple-700',
  Entertainment: 'bg-pink-100 text-pink-700',
  Politics: 'bg-red-100 text-red-700',
  News: 'bg-gray-100 text-gray-700',
};

export default function StoryCard({ article }: StoryCardProps) {
  const categoryStyle = categoryColors[article.category] || 'bg-gray-100 text-gray-700';

  return (
    <article className="group flex gap-6 p-4 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer border border-transparent hover:border-gray-100">
      <div className="flex-shrink-0 w-48 h-32 relative rounded-xl overflow-hidden shadow-sm">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <div className="flex items-center space-x-3 mb-2">
          <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${categoryStyle}`}>
            {article.category}
          </span>
          <span className="text-gray-400 text-xs font-medium">
            {new Date(article.timestamp).toLocaleDateString()}
          </span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors font-serif leading-snug">
          {article.title}
        </h2>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
          {article.summary}
        </p>
        
        <div className="flex items-center text-xs font-medium text-gray-400">
          <span className="text-gray-600">{article.author}</span>
          <span className="mx-2">•</span>
          <span>3 min read</span>
        </div>
      </div>
    </article>
  );
}
