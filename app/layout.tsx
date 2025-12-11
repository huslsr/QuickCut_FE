import { AuthProvider } from '@/app/context/AuthProvider';
import { ThemeProvider } from '@/app/context/ThemeContext';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import BackToTop from '@/components/BackToTop';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'QuickCut | Breaking News & In-Depth Analysis',
  description: 'Your trusted source for global news, expert perspectives, and timely updates.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}>
        <div id="google_translate_element" className="fixed bottom-0 right-0 opacity-0 pointer-events-none" />
        <ThemeProvider>
          <AuthProvider>
            {children}
            <BackToTop />
          </AuthProvider>
        </ThemeProvider>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
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
        <Analytics />
      </body>
    </html>
  );
}
