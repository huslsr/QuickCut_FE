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
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
