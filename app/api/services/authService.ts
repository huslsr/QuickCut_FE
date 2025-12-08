
import client from '../client';
import { User } from './userService';

export interface LoginResponse {
    user: User;
    token?: string; // Future proofing
}

export const authService = {
    login: async (email: string, password: string) => {
        const response = await client.post('/auth/login', { email, password });
        return response.data;
    },

    register: async (userData: any) => {
        const response = await client.post('/auth/register', userData);
        return response.data;
    },

    logout: () => {
        // Client side cleanup
        localStorage.removeItem('user');
    }
};
