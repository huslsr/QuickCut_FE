import { NewsArticle, Category } from '@/types/news';

export const categories: Category[] = [
  { id: '1', name: 'City', slug: 'city' },
  { id: '2', name: 'India', slug: 'india' },
  { id: '3', name: 'World', slug: 'world' },
  { id: '4', name: 'Business', slug: 'business' },
  { id: '5', name: 'Tech', slug: 'tech' },
  { id: '6', name: 'Sports', slug: 'sports' },
  { id: '7', name: 'Entertainment', slug: 'entertainment' },
];

export const topStory: NewsArticle = {
  id: 'top-1',
  title: 'MAGA nativists embrace darkness as they prepare for potential violence',
  category: 'Politics',
  imageUrl: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&h=400&fit=crop',
  summary: 'Political tensions rise as groups prepare for potential conflicts in the upcoming election cycle.',
  author: 'John Doe',
  timestamp: '2024-01-15T10:30:00Z',
  sourceUrl: '#',
  videoUrl: 'https://example.com/video.mp4',
};

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Tech News: Latest AI Developments Reshape Industry',
    category: 'Tech',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    summary: 'Artificial intelligence continues to transform industries with groundbreaking innovations.',
    author: 'Jane Smith',
    timestamp: '2024-01-15T09:00:00Z',
    sourceUrl: '#',
  },
  {
    id: '2',
    title: 'Cricket World Cup: India Wins Championship',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop',
    summary: 'India secures victory in the Cricket World Cup after an intense final match.',
    author: 'Mike Johnson',
    timestamp: '2024-01-15T08:30:00Z',
    sourceUrl: '#',
  },
  {
    id: '3',
    title: 'Business Update: Stock Market Reaches New Highs',
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
    summary: 'Global markets surge as investors gain confidence in economic recovery.',
    author: 'Sarah Williams',
    timestamp: '2024-01-15T07:00:00Z',
    sourceUrl: '#',
  },
  {
    id: '4',
    title: 'Entertainment: New Blockbuster Movie Breaks Records',
    category: 'Entertainment',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop',
    summary: 'Latest film release sets box office records in its opening weekend.',
    author: 'David Brown',
    timestamp: '2024-01-14T20:00:00Z',
    sourceUrl: '#',
  },
];

export const featuredVideos: NewsArticle[] = [
  {
    id: 'video-1',
    title: 'Featured Video: Breaking News Analysis',
    category: 'News',
    imageUrl: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400&h=300&fit=crop',
    summary: 'In-depth analysis of today\'s top breaking news stories.',
    author: 'News Team',
    timestamp: '2024-01-15T10:00:00Z',
    sourceUrl: '#',
    videoUrl: 'https://example.com/video1.mp4',
  },
  {
    id: 'video-2',
    title: 'Latest Technology Trends Explained',
    category: 'Tech',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    summary: 'Exploring the latest trends in technology and innovation.',
    author: 'Tech Editor',
    timestamp: '2024-01-15T09:30:00Z',
    sourceUrl: '#',
    videoUrl: 'https://example.com/video2.mp4',
  },
];
