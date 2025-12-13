'use client';

import { useCategories } from '@/app/context/CategoryContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SubNav() {
  const pathname = usePathname();
  const { categories } = useCategories();

  return (
    <nav className="bg-gray-50 dark:bg-black/40 backdrop-blur-md border-b border-gray-200 dark:border-white/10 sticky top-20 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Category Links */}
          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide py-2 w-full max-w-[100vw]">
            <Link
               href="/"
               className={`px-4 py-2 rounded whitespace-nowrap text-sm font-medium transition-colors ${
                  pathname === '/' 
                    ? 'bg-black text-white dark:bg-white dark:text-black' 
                    : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-white/10'
               }`}
            >
              All Stories
            </Link>
            {categories.map((category) => {
              const isActive = pathname === `/category/${category.id}`;
              return (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className={`px-4 py-2 rounded whitespace-nowrap text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-white/10'
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
