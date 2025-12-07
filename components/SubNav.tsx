'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category, categoryService } from '@/app/api/services/categoryService';

export default function SubNav() {
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        
        // Custom Sort Order: General (8) -> World (7) -> Politics (4) -> Business (6) -> Tech (5) -> Movies (3) -> Cricket (1) -> Football (2)
        const sortOrder = ['8', '1', '7', '4', '6', '5', '3', '2'];
        
        const sortedData = data.sort((a, b) => {
             const indexA = sortOrder.indexOf(a.id);
             const indexB = sortOrder.indexOf(b.id);
             return indexA - indexB;
        });

        setCategories(sortedData);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className="bg-gray-50 border-b border-gray-200 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Category Links */}
          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide py-2">
            <Link
               href="/"
               className={`px-4 py-2 rounded whitespace-nowrap text-sm font-medium transition-colors ${
                  pathname === '/' 
                    ? 'bg-black text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
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
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-200'
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
