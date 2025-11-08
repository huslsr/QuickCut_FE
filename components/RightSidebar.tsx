import FeaturedVideos from './FeaturedVideos';
import { NewsArticle } from '@/types/news';

interface RightSidebarProps {
  featuredVideos: NewsArticle[];
}

export default function RightSidebar({ featuredVideos }: RightSidebarProps) {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <div className="sticky top-28 space-y-8">
        {/* Browse More Content Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Browse More Content</h3>
          <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
            <p>Discover more articles, videos, and trending topics across all categories.</p>
          </div>
        </div>

        {/* Advertisement Block */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 uppercase text-xs tracking-wide">
            Advertisement
          </h3>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
            <span className="text-gray-400 text-sm">Ad Space</span>
          </div>
        </div>

        {/* Featured Videos */}
        <FeaturedVideos videos={featuredVideos} />
      </div>
    </aside>
  );
}
