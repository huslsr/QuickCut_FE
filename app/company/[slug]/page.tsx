'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { pageService, Page } from '@/app/api/services/pageService';

export default function CompanyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const data = await pageService.getPageBySlug(slug);
        setPage(data);
      } catch (err) {
        console.error('Failed to fetch page:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold font-serif mb-4">Page Not Found</h1>
                <p className="text-gray-500">The page you are looking for does not exist.</p>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12">
        <article className="prose lg:prose-xl mx-auto">
            <h1 className="text-5xl font-black font-serif mb-8 text-center">{page.title}</h1>
            <div className="text-lg leading-relaxed font-serif text-gray-800 whitespace-pre-wrap">
                {page.content}
            </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
