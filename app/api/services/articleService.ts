import apiClient from '../client';

export interface Article {
    id: string;
    title: string;
    summary: string;
    content: string;
    publishedAt: string;
    url: string;
    imageUrl: string;
    videoUrl?: string;
    categoryId: string;
}

export const articleService = {
    async getAllArticles(categoryId?: string, query?: string): Promise<Article[]> {
        console.log(`[Frontend] Fetching articles - Category: ${categoryId}, Query: ${query}`);
        const params: any = {};
        if (categoryId) params.categoryId = categoryId;
        if (query) params.query = query;

        const response = await apiClient.get<Article[]>('/articles', { params });
        console.log(`[Frontend] Received ${response.data.length} articles`);
        return response.data;
    },

    async getArticleById(id: string): Promise<Article> {
        const response = await apiClient.get<Article>(`/articles/${id}`);
        return response.data;
    },

    async getFeaturedVideos(): Promise<Article[]> {
        const response = await apiClient.get<Article[]>('/articles/featured-videos');
        return response.data;
    }
};
