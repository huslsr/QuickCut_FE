import client from '../client';
import { NewsArticle as Article } from '@/types/news';

export const bookmarkService = {
    // Get all bookmarks for a user
    getBookmarks: async (userId: string): Promise<Article[]> => {
        const response = await client.get(`/bookmarks`, {
            params: { userId }
        });
        return response.data;
    },

    // Add a bookmark
    addBookmark: async (userId: string, articleId: string): Promise<void> => {
        await client.post(`/bookmarks`, { article_id: articleId }, {
            params: { userId }
        });
    },

    // Remove a bookmark
    removeBookmark: async (userId: string, articleId: string): Promise<void> => {
        await client.delete(`/bookmarks/${articleId}`, {
            params: { userId }
        });
    }
};
