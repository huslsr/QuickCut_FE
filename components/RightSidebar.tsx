import FeaturedVideos from './FeaturedVideos';
import { NewsArticle } from '@/types/news';

interface RightSidebarProps {
  featuredVideos: NewsArticle[];
}

export default function RightSidebar({ featuredVideos }: RightSidebarProps) {
  return (
    <aside className="w-full lg:w-[350px] flex-shrink-0 space-y-12 border-l border-gray-100 lg:pl-12">
      
      {/* Trending Section */}
      <div>
        <div className="flex items-center justify-between mb-6 border-b-2 border-black pb-2">
          <h3 className="text-lg font-black uppercase tracking-widest">Trending</h3>
        </div>
        <ul className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <li key={i} className="group cursor-pointer flex items-start space-x-4">
              <span className="text-4xl font-black text-gray-200 group-hover:text-accent transition-colors leading-none">
                {i}
              </span>
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider mb-1 block">
                  Technology
                </span>
                <h4 className="text-base font-bold font-serif leading-snug group-hover:underline decoration-2 underline-offset-4">
                  The future of AI is not what you think it is.
                </h4>
              </div>
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
