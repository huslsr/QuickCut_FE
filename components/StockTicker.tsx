"use client";

import { useState, useEffect } from "react";

type TickerItem = {
  symbol: string;
  price: number;
  change: number;
  up: boolean;
};

// Initial Data for Indian Stocks
const INDIAN_STOCKS: TickerItem[] = [
  { symbol: "NIFTY 50", price: 21740.5, change: 0.55, up: true },
  { symbol: "SENSEX", price: 72350.25, change: 0.48, up: true },
  { symbol: "RELIANCE", price: 2650.1, change: -0.25, up: false },
  { symbol: "TCS", price: 3890.0, change: 1.1, up: true },
  { symbol: "HDFCBANK", price: 1680.5, change: -0.45, up: false },
  { symbol: "INFY", price: 1540.2, change: 0.85, up: true },
  { symbol: "ICICIBANK", price: 1020.75, change: 0.3, up: true },
  { symbol: "SBIN", price: 640.3, change: -0.15, up: false },
  { symbol: "BHARTIARTL", price: 1050.6, change: 1.25, up: true },
  { symbol: "ITC", price: 460.4, change: -0.1, up: false },
  { symbol: "L&T", price: 3550.0, change: 1.5, up: true },
  { symbol: "AXISBANK", price: 1120.9, change: 0.6, up: true },
  { symbol: "KOTAKBANK", price: 1850.25, change: -0.35, up: false },
  { symbol: "MARUTI", price: 10250.0, change: 0.75, up: true },
  { symbol: "TATAMOTORS", price: 810.5, change: 2.1, up: true },
  { symbol: "SUNPHARMA", price: 1320.4, change: 0.2, up: true },
  { symbol: "TITAN", price: 3750.6, change: -0.5, up: false },
  { symbol: "ADANIENT", price: 3150.8, change: 1.8, up: true },
  { symbol: "BAJFINANCE", price: 7650.3, change: 0.95, up: true },
  { symbol: "ASIANPAINT", price: 3300.2, change: -0.65, up: false },
];

export default function StockTicker() {
  const [data, setData] = useState<TickerItem[]>(INDIAN_STOCKS);

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setData((currentData) =>
        currentData.map((item) => {
          // Randomly fluctuate price by -0.1% to +0.1%
          const volatility = (Math.random() - 0.5) * 0.002;
          const newPrice = item.price * (1 + volatility);

          // Calculate generic change percent based on movement
          const newChange = item.change + volatility * 100;

          return {
            ...item,
            price: newPrice,
            change: newChange,
            up: newChange >= 0,
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  if (data.length === 0) return null;

  return (
    <div className="bg-black text-white text-xs font-bold uppercase tracking-widest overflow-hidden py-2 border-b border-gray-800 notranslate">
      <div className="flex animate-scroll whitespace-nowrap hover:pause">
        {/* Render multiple times for seamless infinite scroll */}
        {[...data, ...data, ...data].map((item, i) => (
          <div
            key={`${item.symbol}-${i}`}
            className="flex items-center mx-6 space-x-2"
          >
            <span className="text-gray-400">{item.symbol}</span>
            <span>₹{item.price.toFixed(2)}</span>
            <span className={item.up ? "text-green-500" : "text-red-500"}>
              {Math.abs(item.change).toFixed(2)}% {item.up ? "▲" : "▼"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
