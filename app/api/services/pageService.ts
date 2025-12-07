import apiClient from '../client';

export interface Page {
    id: string;
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
}

export const pageService = {
    getPageBySlug: async (slug: string): Promise<Page> => {
        const response = await apiClient.get<Page>(`/pages/${slug}`);
        return response.data;
    }
};
