'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { articleService, Article } from '../../api/services/articleService';

export default function ArticleDetail() {
  const params = useParams();
  const id = params.id as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await articleService.getArticleById(id);
        setArticle(data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-3xl font-black font-serif mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you are looking for does not exist or has been removed.</p>
          <Link 
            href="/"
            className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 w-full">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category & Date */}
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-6">
            <span className="bg-accent/10 text-accent px-3 py-1 text-xs font-bold uppercase tracking-widest">
              {article.categoryId || 'General'}
            </span>
            <span className="text-gray-500 text-sm font-serif">
              {new Date(article.publishedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif leading-tight mb-8 text-gray-900">
            {article.title}
          </h1>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] mb-12 overflow-hidden bg-gray-100">
            <Image
              src={article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2070'}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Summary / Lead */}
          <div className="prose prose-lg max-w-none mb-10">
             <p className="text-xl md:text-2xl font-serif text-gray-700 leading-relaxed border-l-4 border-accent pl-6 italic">
              {article.summary}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none font-serif text-gray-800 leading-loose">
            {article.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index} className="mb-6">{paragraph}</p>
            ))}
          </div>
          
          {/* Source Link */}
           {article.url && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <a 
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-accent hover:text-accent/80 font-bold uppercase tracking-wide text-sm"
              >
                Read Original Source
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}

        </article>
      </main>

      <Footer />
    </div>
  );
}
