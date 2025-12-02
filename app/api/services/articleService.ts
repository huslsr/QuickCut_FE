import apiClient from '../client';

export interface Article {
    id: number;
    title: string;
    summary: string;
    content: string;
    publishedDate: string;
    sourceUrl: string;
    imageUrl: string;
    category: {
        id: number;
        name: string;
    };
}

export const articleService = {
    getAllArticles: async () => {
        const response = await apiClient.get<Article[]>('/articles');
        return response.data;
    },

    getArticleById: async (id: number) => {
        const response = await apiClient.get<Article>(`/articles/${id}`);
        return response.data;
    },
};
