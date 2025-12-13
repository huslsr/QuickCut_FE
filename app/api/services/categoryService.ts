import apiClient from '../client';

export interface Category {
    id: string;
    name: string;
    description?: string;
    orderIndex?: number;
}

export const categoryService = {
    async getAllCategories(): Promise<Category[]> {
        const response = await apiClient.get<Category[]>('/categories');
        console.log('[Frontend] getAllCategories response:', response.data);
        return response.data;
    },

    async getCategoryById(id: string): Promise<Category> {
        const response = await apiClient.get<Category>(`/categories/${id}`);
        return response.data;
    }
};
