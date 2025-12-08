import client from '../client';

export interface Comment {
    id: string;
    articleId: string;
    userId: string;
    username: string;
    content: string;
    createdAt: string;
}

export const interactionService = {
    getComments: async (articleId: string): Promise<Comment[]> => {
        const response = await client.get(`/interactions/comments/${articleId}`);
        return response.data;
    },

    addComment: async (commentData: { articleId: string; userId: string; username: string; content: string }) => {
        const response = await client.post('/interactions/comments', commentData);
        return response.data;
    },

    getLikeCount: async (articleId: string): Promise<number> => {
        try {
            const response = await client.get(`/interactions/likes/${articleId}/count`);
            return response.data;
        } catch (error) {
            console.error("Error fetching like count:", error);
            return 0;
        }
    },

    getLikeStatus: async (articleId: string, userId: string): Promise<boolean> => {
        try {
            const response = await client.get(`/interactions/likes/${articleId}/status`, { params: { userId } });
            return response.data;
        } catch (error) {
            console.error("Error fetching like status:", error);
            return false;
        }
    },

    toggleLike: async (articleId: string, userId: string): Promise<{ liked: boolean }> => {
        const response = await client.post(`/interactions/likes/${articleId}`, { userId });
        return response.data;
    }
};
