import { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleClient from "./ArticleClient";
import { articleService } from "../../api/services/articleService";
import { categoryService } from "../../api/services/categoryService";

interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = params;

  try {
    const article = await articleService.getArticleById(id);

    if (!article) {
      return {
        title: "Article Not Found",
      };
    }

    return {
      title: article.title,
      description: article.summary,
      alternates: {
        canonical: `https://quickcut.info/article/${article.id}`,
      },
      keywords: [article.title, "news", "quickcut", "breaking news"],
      openGraph: {
        title: article.title,
        description: article.summary,
        url: `https://quickcut.info/article/${article.id}`,
        images: [
          {
            url:
              article.imageUrl ||
              "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        type: "article",
        publishedTime: article.publishedAt,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.summary,
        images: [article.imageUrl || ""],
      },
    };
  } catch (error) {
    return {
      title: "QuickCut News",
    };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = params;

  let article;
  let categoryName = "";

  try {
    article = await articleService.getArticleById(id);
    if (!article) {
      notFound();
    }

    if (article.categoryId) {
      try {
        const cat = await categoryService.getCategoryById(article.categoryId);
        categoryName = cat.name;
      } catch (e) {
        console.log("Error fetching category", e);
      }
    }
  } catch (error) {
    console.error("Error fetching article for SSR:", error);
    notFound();
  }

  // Create JSON-LD for Google Structure
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: [article.imageUrl],
    datePublished: article.publishedAt,
    description: article.summary,
    author: [
      {
        "@type": "Organization",
        name: "QuickCut News",
        url: "https://quickcut.info",
      },
    ],
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleClient article={article} categoryName={categoryName} />
    </>
  );
}
