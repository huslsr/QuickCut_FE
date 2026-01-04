import { NewsArticle } from '@/types/news';
import Image from 'next/image';
import { getFallbackImage } from '@/app/config/fallbacks';

interface FeaturedVideosProps {
  videos: NewsArticle[];
}

export default function FeaturedVideos({ videos }: FeaturedVideosProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 border-b-2 border-black dark:border-white pb-2">
        <h3 className="text-lg font-black uppercase tracking-widest text-black dark:text-white">Watch</h3>
        <button className="text-xs font-bold uppercase tracking-wider hover:text-accent transition-colors text-black dark:text-white">
          View All
        </button>
      </div>

      <div className="space-y-8">
        {videos.map((video) => (
          <div key={video.id} className="group cursor-pointer">
            <div className="relative w-full aspect-video mb-3 bg-black">
              <Image
                src={video.imageUrl || getFallbackImage(video.category)}
                alt={video.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black text-white transition-all duration-300">
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-bold font-serif leading-tight group-hover:text-accent transition-colors">
              {video.title}
            </h4>
            <div className="flex items-center text-xs font-bold uppercase tracking-wider text-gray-400 mt-2">
              <span>{video.author}</span>
              <span className="mx-2">•</span>
              <span>4:20</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
