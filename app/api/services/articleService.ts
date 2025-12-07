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
    async getAllArticles(categoryId?: string, query?: string, page: number = 0, size: number = 10): Promise<{ content: Article[], totalPages: number }> {
        console.log(`[Frontend] Fetching articles - Category: ${categoryId}, Query: ${query}, Page: ${page}, Size: ${size}`);
        const params: any = { page, size };
        if (categoryId) params.categoryId = categoryId;
        if (query) params.query = query;

        // Backend now returns Page<Article>, so we need to extract .content
        const response = await apiClient.get<any>('/articles', { params });

        // Handle both old list format (just in case) and new page format
        const content = Array.isArray(response.data) ? response.data : (response.data.content || []);
        const totalPages = response.data.totalPages || 0;

        console.log(`[Frontend] Received ${content.length} articles, Total Pages: ${totalPages}`);
        return { content, totalPages };
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
