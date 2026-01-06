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
  const [isVisible, setIsVisible] = useState(true);

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
        // Mapping of Display Name -> Yahoo Symbol
        const symbolMap: Record<string, string> = {
          "NIFTY 50": "^NSEI",
          SENSEX: "^BSESN",
          RELIANCE: "RELIANCE.NS",
          TCS: "TCS.NS",
          HDFCBANK: "HDFCBANK.NS",
          INFY: "INFY.NS",
          ICICIBANK: "ICICIBANK.NS",
          SBIN: "SBIN.NS",
          BHARTIARTL: "BHARTIARTL.NS",
          ITC: "ITC.NS",
          "L&T": "LT.NS",
          AXISBANK: "AXISBANK.NS",
          KOTAKBANK: "KOTAKBANK.NS",
          MARUTI: "MARUTI.NS",
          TATAMOTORS: "TATAMOTORS.NS",
          SUNPHARMA: "SUNPHARMA.NS",
          TITAN: "TITAN.NS",
          ADANIENT: "ADANIENT.NS",
          BAJFINANCE: "BAJFINANCE.NS",
          ASIANPAINT: "ASIANPAINT.NS",
        };

        const yahooSymbols = Object.values(symbolMap).join(",");
        const res = await fetch(`/api/stocks?symbols=${yahooSymbols}`);
        const json = await res.json();

        if (json.quoteResponse && json.quoteResponse.result) {
          const newTickerData: TickerItem[] = Object.keys(symbolMap)
            .map((displayName) => {
              const yahooSymbol = symbolMap[displayName];
              const quote = json.quoteResponse.result.find(
                (q: any) => q.symbol === yahooSymbol
              );

              if (quote) {
                return {
                  symbol: displayName,
                  price: quote.regularMarketPrice,
                  change: quote.regularMarketChangePercent,
                  up: quote.regularMarketChangePercent >= 0,
                };
              }
              // Fallback to static if specific quote missing
              return { symbol: displayName, price: 0, change: 0, up: true };
            })
            .filter((item) => item.price !== 0);

          if (newTickerData.length > 0) {
            setData(newTickerData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch stocks", error);
      }
    }

    fetchStocks();
    // Refresh every 15 minutes to respect "delayed" nature
    const interval = setInterval(fetchStocks, 15 * 60 * 1000);
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
