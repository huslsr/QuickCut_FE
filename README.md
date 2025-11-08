# Quick Cut - News Website

A modern, responsive news website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, card-based layout with intuitive navigation
- **Component-Based Architecture**: Modular React components for easy maintenance
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling for rapid development

## Project Structure

```
QuickCut/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Top navigation header
│   ├── SubNav.tsx       # Category navigation
│   ├── NewsFeed.tsx     # Main news feed
│   ├── TopStoryCard.tsx # Hero story card
│   ├── StoryCard.tsx    # Individual story card
│   ├── RightSidebar.tsx # Sidebar with videos and ads
│   ├── FeaturedVideos.tsx # Video listings
│   └── Footer.tsx       # Footer component
├── data/
│   └── mockData.ts      # Mock data for development
├── types/
│   └── news.ts          # TypeScript type definitions
└── package.json         # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Components

Components are located in the `components/` directory. Each component is a self-contained module with its own styling using Tailwind CSS.

### Mock Data

Mock data is located in `data/mockData.ts`. Replace this with actual API calls when integrating with a backend.

## Next Steps

1. **Backend Integration**: Connect to a FastAPI backend or other API
2. **Image Optimization**: Set up Cloudinary or similar service for image optimization
3. **Video Player**: Integrate ReactPlayer for video playback
4. **State Management**: Add React Query for API caching
5. **Analytics**: Integrate Google Tag Manager
6. **SEO**: Enhance meta tags and add sitemap

## License

MIT
