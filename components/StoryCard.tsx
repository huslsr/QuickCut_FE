import { NewsArticle } from '@/types/news';
import Image from 'next/image';

interface StoryCardProps {
  article: NewsArticle;
}

const categoryColors: Record<string, string> = {
  Tech: 'bg-blue-600',
  Sports: 'bg-green-600',
  Business: 'bg-purple-600',
  Entertainment: 'bg-pink-600',
  Politics: 'bg-red-600',
  News: 'bg-gray-600',
};

export default function StoryCard({ article }: StoryCardProps) {
  const categoryColor = categoryColors[article.category] || 'bg-gray-600';

  return (
    <article className="flex gap-4 pb-6 mb-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer">
      <div className="flex-shrink-0 w-32 h-24 relative rounded overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-xs font-semibold text-white px-2 py-1 rounded uppercase mb-2 inline-block ${categoryColor}`}>
          {article.category}
        </span>
        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-gray-700">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{article.summary}</p>
        <div className="flex items-center text-xs text-gray-500">
          <span>{article.author}</span>
          <span className="mx-2">•</span>
          <time>{new Date(article.timestamp).toLocaleDateString()}</time>
        </div>
      </div>
    </article>
  );
}
