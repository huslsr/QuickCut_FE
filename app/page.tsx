import { articleService } from "@/app/api/services/articleService";
import { APP_CONFIG } from "@/app/config/constants";
import HomePageClient from "@/components/HomePageClient";

export const dynamic = "force-dynamic";

export const metadata = {
  alternates: {
    canonical: "https://quickcut.info",
  },
};

export default async function Home() {
  const pageSize = APP_CONFIG.PAGINATION.HOME_PAGE_SIZE;
  let initialArticles: any[] = [];
  let totalPages = 0;

  try {
    const data = await articleService.getAllArticles(
      undefined,
      undefined,
      0,
      pageSize
    );
    initialArticles = data.content;
    totalPages = data.totalPages;
  } catch (error) {
    console.error("Failed to fetch initial articles on server:", error);
  }

  return (
    <HomePageClient
      initialArticles={initialArticles}
      initialTotalPages={totalPages}
    />
  );
}
