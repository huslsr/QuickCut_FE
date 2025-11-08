import TopStoryCard from './TopStoryCard';
import StoryCard from './StoryCard';
import { NewsArticle } from '@/types/news';

interface NewsFeedProps {
  topStory: NewsArticle;
  articles: NewsArticle[];
}

export default function NewsFeed({ topStory, articles }: NewsFeedProps) {
  return (
    <div className="flex-1">
      <TopStoryCard article={topStory} />
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest News</h2>
        <div className="space-y-0">
          {articles.map((article) => (
            <StoryCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
