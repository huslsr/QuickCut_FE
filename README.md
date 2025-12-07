# QuickCut Frontend 📰

The modern, responsive web interface for QuickCut. Built with **Next.js 14 (App Router)** and **Tailwind CSS**, it offers a premium news reading experience with dynamic routing, search, and categorization.

## 🛠️ Tech Stack
- **Next.js 14**: React framework with App Router for server-side rendering and static generation.
- **TypeScript**: For type-safe code and better developer experience.
- **Tailwind CSS**: Utility-first CSS framework for rapid, beautiful UI design.
- **Axios**: HTTP client for API requests.

## ✨ Features
- **Dynamic News Feed**: Fetches latest articles from the backend.
- **Category Browsing**: Dedicated pages for specific topics (Cricket, Tech, etc.).
- **Search**: Real-time search functionality.
- **Static Pages**: Dynamic "About Us", "Privacy Policy" pages fetched from API.
- **Responsive Design**: Mobile-first approach with a custom hamburger menu.
- **Production Ready**: Optimized for Vercel deployment.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- NPM

### Environment Variables
Create a `.env.local` file:

```env
# URL of your running Backend (Local or Production)
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### Installation & Run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/huslsr/QuickCut_FE.git
    cd QuickCut_FE
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📦 Building for Production

To build the application for production usage:

```bash
npm run build
npm start
```

## ☁️ Deployment

This project is optimized for **Vercel**.
1.  Import project to Vercel.
2.  **Important Settings**:
    *   **Build Command**: `npm run build`
    *   **Install Command**: `npm install`
    *   **Output Directory**: Leave default (toggle OFF overrides).
3.  Add Environment Variable `NEXT_PUBLIC_API_URL` pointing to your production backend.
4.  Deploy!

---
*Built with ❤️ for QuickCut.*