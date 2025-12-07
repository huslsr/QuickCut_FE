import apiClient from '../client';

export interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    preferences: Record<string, any>;
}

export const userService = {
    getAllUsers: async () => {
        const response = await apiClient.get<User[]>('/users');
        return response.data;
    },

    getUserById: async (id: string) => {
        const response = await apiClient.get<User>(`/users/${id}`);
        return response.data;
    },

    createUser: async (user: Omit<User, 'id'>) => {
        const response = await apiClient.post<User>('/users', user);
        return response.data;
    },

    updateUser: async (id: string, user: Partial<User>) => {
        const response = await apiClient.put<User>(`/users/${id}`, user);
        return response.data;
    },

    deleteUser: async (id: string) => {
        await apiClient.delete(`/users/${id}`);
    },
};
