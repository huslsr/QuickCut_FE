import { NewsArticle } from '@/types/news';
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
      <article className="flex flex-col h-full">
        <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-gray-100">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest border border-black">
            {categoryName}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold font-serif leading-tight mb-3 group-hover:text-accent transition-colors">
            {article.title}
          </h2>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 font-serif">
            {article.summary}
          </p>
          
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
            <span>{article.author}</span>
            <span>{new Date(article.timestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
