"use client";

import { AnalyticsData, DailyViews } from "@/app/api/services/articleService";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function AnalyticsDashboard({ data }: { data: AnalyticsData }) {
  const { totalViews, dailyViews } = data;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxViews = useMemo(() => {
    if (!dailyViews || dailyViews.length === 0) return 0;
    return Math.max(...dailyViews.map((d) => d.views));
  }, [dailyViews]);

  // Ensure we have data
  if (!dailyViews || dailyViews.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">
          Total Views
        </h2>
        <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {totalViews.toLocaleString()}
        </p>
        <p className="text-gray-400 mt-4">
          No enough historical data for graph.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Total Views Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16" />

        <h2 className="text-lg font-medium text-gray-400 mb-2">
          Total Lifetime Views
        </h2>
        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent tracking-tight">
            {totalViews.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 bg-gray-900/50 px-2 py-1 rounded-full border border-gray-700">
            All time
          </span>
        </div>
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700"
      >
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-1 h-8 bg-blue-500 rounded-full" />
          Readership Growth
        </h3>

        <div className="h-64 sm:h-80 w-full flex items-end gap-2 sm:gap-4 overflow-x-auto pb-8 pt-12 px-4 scrollbar-thin scrollbar-thumb-gray-600">
          {dailyViews.map((day, index) => {
            const heightPercent =
              maxViews > 0 ? (day.views / maxViews) * 100 : 0;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={day.date}
                className="flex flex-col items-center justify-end h-full flex-shrink-0 relative group"
                style={{ width: "40px" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: -5 }}
                    className="absolute bottom-full mb-2 z-10 bg-gray-900 border border-gray-600 text-xs text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap"
                  >
                    <div className="font-bold">
                      {day.views.toLocaleString()} views
                    </div>
                    <div className="text-gray-400">{formatDate(day.date)}</div>
                  </motion.div>
                )}

                {/* Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(heightPercent, 2)}%` }} // Min 2% for visibility
                  transition={{ duration: 0.5, delay: index * 0.02 }}
                  className={`w-full rounded-t-lg transition-colors duration-200 cursor-pointer
                                        ${isHovered ? "bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]" : "bg-gray-600 hover:bg-gray-500"}
                                    `}
                />

                {/* Label */}
                <span className="absolute top-full mt-3 text-[10px] sm:text-xs text-gray-500 rotate-0 whitespace-nowrap hidden sm:block">
                  {index % 3 === 0 ? formatDate(day.date) : ""}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
