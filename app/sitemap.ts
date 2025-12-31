import { MetadataRoute } from 'next';
import { articleService } from './api/services/articleService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://quickcut.info';

    // Static routes
    const routes = [
        '',
        '/login',
        '/register',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }));

    try {
        // Dynamic routes for articles (Fetch last 10000)
        const { content: articles } = await articleService.getAllArticles(undefined, undefined, 0, 10000);

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
