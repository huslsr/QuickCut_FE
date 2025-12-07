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
      
      <div className="border-t-4 border-black pt-8 mb-12">
        <h2 className="text-3xl font-black font-serif mb-8 uppercase tracking-tighter">
          Latest Headlines
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {articles.map((article) => (
            <StoryCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
