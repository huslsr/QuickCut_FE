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
        // Dynamic routes for articles (Fetch last 100)
        const { content: articles } = await articleService.getAllArticles(undefined, undefined, 0, 100);

        const articleRoutes = articles.map((article) => ({
            url: `${baseUrl}/article/${article.id}`,
            lastModified: new Date(article.publishedAt),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        return [...routes, ...articleRoutes];
    } catch (error) {
        console.error('Failed to generate sitemap:', error);
        return [...routes];
    }
}
