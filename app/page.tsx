import Header from '@/components/Header';
import SubNav from '@/components/SubNav';
import NewsFeed from '@/components/NewsFeed';
import RightSidebar from '@/components/RightSidebar';
import Footer from '@/components/Footer';
import { topStory, newsArticles, featuredVideos } from '@/data/mockData';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SubNav />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <NewsFeed topStory={topStory} articles={newsArticles} />
          <RightSidebar featuredVideos={featuredVideos} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
