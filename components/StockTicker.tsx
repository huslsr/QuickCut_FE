"use client";

import { useState, useEffect } from "react";

type TickerItem = {
  symbol: string;
  price: number;
  change: number;
  up: boolean;
};

export default function StockTicker() {
  const [data, setData] = useState<TickerItem[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check session storage
    if (typeof window !== "undefined") {
      const closed = sessionStorage.getItem("ticker_closed");
      if (closed === "true") {
        setIsVisible(false);
        return;
      }
    }

    async function fetchStocks() {
      try {
        const { stockService } = await import(
          "../app/api/services/stockService"
        );
        const backendData = await stockService.getLatestStocks();

        if (backendData && backendData.length > 0) {
          setData(
            backendData.map((item) => ({
              symbol: item.symbol,
              price: item.price,
              change: item.changePercent,
              up: item.up,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch stocks from backend", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStocks();
    // Refresh every 30 minutes (since data is EOD, frequent refresh is not needed)
    const interval = setInterval(fetchStocks, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible || data.length === 0) return null;

  return (
    <div className="relative bg-black text-white text-xs font-bold uppercase tracking-widest overflow-hidden py-2 border-b border-gray-800 notranslate group/ticker">
      <div className="flex animate-scroll whitespace-nowrap hover:pause pr-8">
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

      {/* Close Button */}
      <button
        onClick={() => {
          setIsVisible(false);
          sessionStorage.setItem("ticker_closed", "true");
        }}
        className="absolute right-0 top-0 bottom-0 px-2 bg-black/80 hover:bg-black flex items-center justify-center z-10 text-gray-400 hover:text-white transition-colors"
        title="Hide Ticker"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
