export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  summary: string;
  author?: string;
  timestamp: string;
  sourceUrl: string;
  videoUrl?: string;
  viewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  orderIndex?: number;
}
