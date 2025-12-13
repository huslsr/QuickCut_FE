'use client';

import { useState, useEffect } from 'react';

type TickerItem = {
  symbol: string;
  price: string;
  change: string;
  up: boolean;
};

const MOCK_DATA: TickerItem[] = [
  { symbol: 'BTC', price: '42,500', change: '+3.4%', up: true },
  { symbol: 'ETH', price: '2,200', change: '+1.5%', up: true },
  { symbol: 'SOL', price: '98.50', change: '-2.1%', up: false },
  { symbol: 'AAPL', price: '185.92', change: '+1.2%', up: true },
  { symbol: 'TSLA', price: '230.10', change: '-1.8%', up: false },
];

export default function StockTicker() {
  const [data, setData] = useState<TickerItem[]>(MOCK_DATA);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.coincap.io/v2/assets?limit=10');
        const json = await res.json();
        
        if (json.data) {
          const items: TickerItem[] = json.data.map((coin: any) => {
            const price = parseFloat(coin.priceUsd);
            const change = parseFloat(coin.changePercent24Hr);
            
            return {
              symbol: coin.symbol,
              price: price < 1 ? price.toFixed(4) : price.toLocaleString('en-US', { maximumFractionDigits: 2 }),
              change: `${Math.abs(change).toFixed(2)}%`,
              up: change >= 0
            };
          });
          setData(items);
        }
      } catch (error) {
        console.error('Failed to fetch ticker data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (data.length === 0) return null;

  return (
    <div className="bg-black text-white text-xs font-bold uppercase tracking-widest overflow-hidden py-2 border-b border-gray-800">
      <div className="flex animate-scroll whitespace-nowrap hover:pause">
        {/* Render multiple times for seamless infinite scroll */}
        {[...data, ...data, ...data].map((item, i) => (
          <div key={i} className="flex items-center mx-6 space-x-2">
            <span className="text-gray-400">{item.symbol}</span>
            <span>${item.price}</span>
            <span className={item.up ? 'text-green-500' : 'text-red-500'}>
              {item.change} {item.up ? '▲' : '▼'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
