import { NewsArticle } from '@/types/news';
import Image from 'next/image';

interface FeaturedVideosProps {
  videos: NewsArticle[];
}

export default function FeaturedVideos({ videos }: FeaturedVideosProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 font-serif">Featured Videos</h3>
        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-6">
        {videos.map((video) => (
          <div key={video.id} className="group cursor-pointer">
            <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-md mb-4">
              <Image
                src={video.imageUrl}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white">
                4:20
              </div>
            </div>
            
            <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors font-serif leading-snug">
              {video.title}
            </h4>
            <div className="flex items-center text-xs text-gray-500 font-medium">
              <span>{video.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(video.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
