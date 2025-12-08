import { AuthProvider } from '@/app/context/AuthProvider';
import { ThemeProvider } from '@/app/context/ThemeContext';
import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import BackToTop from '@/components/BackToTop';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'QuickCut | Breaking News & In-Depth Analysis',
  description: 'Your trusted source for global news, expert perspectives, and timely updates.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased text-gray-900 bg-white dark:bg-background dark:text-foreground`}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <BackToTop />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
