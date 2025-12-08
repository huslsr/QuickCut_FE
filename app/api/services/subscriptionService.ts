import apiClient from '../client';

export const subscriptionService = {
    async subscribe(email: string): Promise<any> {
        console.log(`[Frontend] Subscribing with email: ${email}`);
        const response = await apiClient.post('/subscribe', { email });
        return response.data;
    }
};
