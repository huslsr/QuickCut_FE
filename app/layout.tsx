import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quick Cut - Latest News & Updates",
  description: "Your source for the latest news, updates, and stories from around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
