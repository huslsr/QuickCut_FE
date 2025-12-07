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
    async getAllArticles(): Promise<Article[]> {
        const response = await apiClient.get<Article[]>('/articles');
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
