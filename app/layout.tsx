export const dynamic = "force-dynamic";
import { AuthProvider } from "@/app/context/AuthProvider";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { CategoryProvider } from "@/app/context/CategoryContext";
import { ThemeProvider } from "@/app/context/ThemeContext";
import { ToastProvider } from "@/app/context/ToastContext";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import ScrollToTop from "@/components/ScrollToTop";
import Script from "next/script";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://quickcut.info"),
  title: {
    default: "QuickCut News | Breaking Global Stories & In-Depth Analysis",
    template: "%s | QuickCut News",
  },
  description:
    "Stay ahead with QuickCut News. Your trusted source for unbiased reporting, real-time updates on global events, technology trends, business insights, and cultural stories.",
  keywords: [
    "news",
    "breaking news",
    "world news",
    "technology",
    "business",
    "politics",
    "entertainment",
    "analysis",
    "quickcut",
  ],
  openGraph: {
    title: "QuickCut News | Breaking Global Stories & In-Depth Analysis",
    description:
      "Stay ahead with QuickCut News. Your trusted source for unbiased reporting, real-time updates on global events, technology trends, business insights, and cultural stories.",
    url: "https://quickcut.info",
    siteName: "QuickCut News",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://i.ibb.co/3W1DqK3/image.png",
        width: 1200,
        height: 630,
        alt: "QuickCut News - Breaking Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickCut News | Breaking Global Stories",
    description:
      "Your trusted source for unbiased reporting and real-time updates on global events.",
    creator: "@quickcutnews",
    images: ["https://i.ibb.co/3W1DqK3/image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Removed viewport from metadata as it is exported separately

  alternates: {
    canonical: "https://quickcut.info",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <div
          id="google_translate_element"
          className="fixed bottom-0 right-0 opacity-0 pointer-events-none"
        />
        <ThemeProvider>
          <SessionProviderWrapper>
            <ToastProvider>
              <AuthProvider>
                <CategoryProvider>
                  {children}
                  <ScrollToTop />
                </CategoryProvider>
              </AuthProvider>
            </ToastProvider>
          </SessionProviderWrapper>
        </ThemeProvider>

        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="lazyOnload"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            window.googleTranslateElementInit = function() {
              console.log("Google Translate Script Loaded: Initializing...");
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi',
                autoDisplay: false,
              }, 'google_translate_element');
              console.log("Google Translate Widget Created.");
            }
          `}
        </Script>

        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-LK2GJ5GEC4`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LK2GJ5GEC4');
          `}
        </Script>
      </body>
    </html>
  );
}
