'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubNav from '@/components/SubNav';
import StoryCard from '@/components/StoryCard';
import { articleService, Article } from '@/app/api/services/articleService';
import { categoryService, Category } from '@/app/api/services/categoryService';
import { NewsArticle } from '@/types/news';

export default function CategoryPage() {
  const params = useParams();
  const id = params.id as string;
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [articlesData, categoryData] = await Promise.all([
          articleService.getAllArticles(id),
          categoryService.getCategoryById(id)
        ]);
        setArticles(articlesData);
        setCategory(categoryData);
      } catch (error) {
        console.error('Failed to fetch category data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const mapToNewsArticle = (article: Article): NewsArticle => ({
    id: article.id.toString(),
    title: article.title,
    summary: article.summary,
    imageUrl: article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2070',
    category: category?.name || article.categoryId || 'General',
    author: 'QuickCut Team',
    timestamp: new Date(article.publishedAt).toLocaleDateString(),
    sourceUrl: article.url || '#',
  });

  if (loading) {
     return (
       <div className="min-h-screen flex flex-col bg-white">
         <Header />
         <SubNav />
         <main className="flex-1 flex items-center justify-center">
           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
         </main>
         <Footer />
       </div>
     );
   }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <SubNav />
      
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12 border-b-4 border-black pb-4">
             <h1 className="text-5xl font-black font-serif uppercase tracking-tighter">
              {category?.name || 'Category'}
            </h1>
            {category?.description && (
              <p className="mt-4 text-xl text-gray-500 font-serif max-w-3xl">
                {category.description}
              </p>
            )}
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {articles.map((article) => (
                <StoryCard key={article.id} article={mapToNewsArticle(article)} />
              ))}
            </div>
          ) : (
             <div className="flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <h2 className="text-2xl font-bold font-serif mb-2">No Stories Found</h2>
                  <p className="text-gray-500">There are no articles in this category yet.</p>
                </div>
             </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
