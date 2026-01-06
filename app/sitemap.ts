import { MetadataRoute } from 'next';
import { articleService } from './api/services/articleService';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://quickcut.info';

    // Static routes
    const routes = [
        '',
        '/login',
        '/register',
        // Categories
        '/category/1', // India
        '/category/2', // Sports
        '/category/3', // Entertainment
        '/category/4', // Politics
        '/category/5', // Tech
        '/category/6', // Business
        '/category/7', // World
        '/category/8', // General
        '/category/9', // Health
        '/category/10', // Stocks
        '/category/11', // Cricket
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }));

    try {
        // Dynamic routes for articles (Fetch last 10000 using lightweight endpoint)
        const articles = await articleService.getSitemapArticles(0, 10000);

        const articleRoutes = articles.map((article) => ({
            url: `${baseUrl}/article/${article.id}`,
            lastModified: new Date(article.publishedAt),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        return [...routes, ...articleRoutes];
    } catch (error: any) {
        console.error('Failed to generate sitemap:', error);
        if (error.response) {
            console.error('Error response:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error details:', error.message);
        }
        return [...routes];
    }
}
