import apiClient from '../client';

export interface MarketData {
    symbol: string;
    yahooSymbol: string;
    price: number;
    changePercent: number;
    up: boolean;
    updatedAt: string;
}

export const stockService = {
    async getLatestStocks(): Promise<MarketData[]> {
        console.log(`[Frontend] Fetching latest EOD stocks from backend...`);
        try {
            const response = await apiClient.get<MarketData[]>('/stocks/latest');
            console.log(`[Frontend] Received ${response.data?.length || 0} stocks from backend`);
            return response.data;
        } catch (error) {
            console.error('[Frontend] Failed to fetch stocks from backend:', error);
            return [];
        }
    }
};
