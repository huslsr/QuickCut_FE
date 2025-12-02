import apiClient from '../client';

export interface Article {
    id: number;
    title: string;
    summary: string;
    content: string;
    publishedDate: string;
    sourceUrl: string;
    imageUrl: string;
    videoUrl?: string;
    category: {
        id: number;
        name: string;
    };
}

export const articleService = {
    async getAllArticles(): Promise<Article[]> {
        console.log('📡 [Service] Calling GET /articles');
        const response = await apiClient.get<Article[]>('/articles');
        console.log(`✅ [Service] GET /articles response status: ${response.status}`);
        return response.data;
    },

    async getArticleById(id: number): Promise<Article> {
        console.log(`📡 [Service] Calling GET /articles/${id}`);
        const response = await apiClient.get<Article>(`/articles/${id}`);
        console.log(`✅ [Service] GET /articles/${id} response status: ${response.status}`);
        return response.data;
    },

    async getFeaturedVideos(): Promise<Article[]> {
        console.log('📡 [Service] Calling GET /articles/videos');
        const response = await apiClient.get<Article[]>('/articles/videos');
        console.log(`✅ [Service] GET /articles/videos response status: ${response.status}`);
        return response.data;
    }
};
