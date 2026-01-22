import { articleService } from "@/app/api/services/articleService";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics | QuickCut",
};

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  let data;
  try {
    data = await articleService.getAnalytics();
  } catch (e) {
    console.error("Failed to fetch analytics", e);
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Unavailable</h1>
          <p className="text-gray-400">Could not fetch analytics data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="text-gray-500 mt-2">Real-time performance metrics</p>
      </div>

      <AnalyticsDashboard data={data} />
    </div>
  );
}
