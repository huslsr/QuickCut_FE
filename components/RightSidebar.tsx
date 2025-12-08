import Link from 'next/link';
import FeaturedVideos from './FeaturedVideos';
import { NewsArticle } from '@/types/news';

interface RightSidebarProps {
  featuredVideos: NewsArticle[];
  trendingArticles?: NewsArticle[];
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

export default function RightSidebar({ featuredVideos, trendingArticles = [] }: RightSidebarProps) {
  // Use passed trending articles, or fallback to first 5 featured videos if not provided (as a temporary measure if data is missing)
  const filteredTrending = trendingArticles.length > 0 ? trendingArticles.slice(0, 5) : [];
  return (
    <aside className="w-full lg:w-[350px] flex-shrink-0 space-y-12 border-l border-gray-100 lg:pl-12">
      
      {/* Trending Section */}
      <div>
        <div className="flex items-center justify-between mb-6 border-b-2 border-black pb-2">
          <Link href="/trending" className="group">
             <h3 className="text-lg font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-4 transition-all">Trending</h3>
          </Link>
        </div>
        <ul className="space-y-6">
          {filteredTrending.map((article, index) => (
            <li key={article.id} className="group cursor-pointer">
              <Link href={`/article/${article.id}`} className="flex items-start space-x-4">
                <span className="text-4xl font-black text-gray-200 group-hover:text-accent transition-colors leading-none">
                  {index + 1}
                </span>
                <div>
                  <span className="text-xs font-bold text-accent uppercase tracking-wider mb-1 block">
                    {CATEGORY_MAP[article.category] || article.category}
                  </span>
                  <h4 className="text-base font-bold font-serif leading-snug group-hover:underline decoration-2 underline-offset-4 line-clamp-2">
                    {article.title}
                  </h4>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Featured Videos */}
      <FeaturedVideos videos={featuredVideos} />

      {/* Newsletter Box */}
      <div className="bg-black text-white p-8 text-center">
        <h3 className="text-2xl font-black font-serif mb-4">The Daily Brief</h3>
        <p className="text-gray-400 text-sm mb-6 font-serif">
          Essential news, expert analysis, and exclusive content delivered straight to your inbox.
        </p>
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            console.log('Sidebar Subscribe clicked');
          }}
          className="w-full bg-white text-black font-bold uppercase tracking-widest py-3 hover:bg-accent hover:text-white transition-colors"
        >
          Subscribe Now
        </button>
      </div>
    </aside>
  );
}
