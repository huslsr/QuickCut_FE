import Header from '@/components/Header';
import SubNav from '@/components/SubNav';
import NewsFeed from '@/components/NewsFeed';
import RightSidebar from '@/components/RightSidebar';
import Footer from '@/components/Footer';
import { featuredVideos } from '@/data/mockData';
import { articleService, Article } from './api/services/articleService';
import { NewsArticle } from '@/types/news';

export default async function Home() {
  let articles: Article[] = [];
  try {
    articles = await articleService.getAllArticles();
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  }

  const topStory = articles.length > 0 ? articles[0] : null;
  const newsArticles = articles.length > 1 ? articles.slice(1) : [];

  const mapToNewsArticle = (article: Article): NewsArticle => ({
    id: article.id.toString(),
    title: article.title,
    summary: article.summary,
    imageUrl: article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2070',
    category: article.category?.name || 'General',
    author: 'QuickCut Team',
    timestamp: new Date(article.publishedDate).toLocaleDateString(),
    sourceUrl: article.sourceUrl || '#',
  });

  const adaptedTopStory: NewsArticle | null = topStory ? mapToNewsArticle(topStory) : null;
  const adaptedArticles: NewsArticle[] = newsArticles.map(mapToNewsArticle);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SubNav />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {adaptedTopStory && (
            <NewsFeed topStory={adaptedTopStory} articles={adaptedArticles} />
          )}
          {!adaptedTopStory && (
             <div className="flex-1">
                <p>No articles found. Please seed the database.</p>
             </div>
          )}
          <RightSidebar featuredVideos={featuredVideos} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
