import { NewsArticle } from '@/types/news';
import Image from 'next/image';

interface FeaturedVideosProps {
  videos: NewsArticle[];
}

export default function FeaturedVideos({ videos }: FeaturedVideosProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Featured Videos</h3>
      <div className="space-y-6">
        {videos.map((video) => (
          <div key={video.id} className="cursor-pointer group">
            <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-3">
              <Image
                src={video.imageUrl}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-50 transition">
                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-gray-700">
              {video.title}
            </h4>
            <p className="text-xs text-gray-600 line-clamp-2">{video.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
