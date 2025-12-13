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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold font-serif mb-4 text-foreground">Page Not Found</h1>
                <p className="text-muted-foreground">The page you are looking for does not exist.</p>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-16">
        <article className="prose prose-lg dark:prose-invert lg:prose-xl mx-auto prose-headings:font-serif prose-headings:font-black prose-p:font-serif prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
            <h1 className="text-5xl mb-12 text-center text-foreground">{page.title}</h1>
            <div className="text-lg text-foreground/90 whitespace-pre-wrap">
                {page.content}
            </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
