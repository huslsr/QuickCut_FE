'use client';

import { categories } from '@/data/mockData';
import { useState } from 'react';

export default function SubNav() {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');

  return (
    <nav className="bg-gray-50 border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Category Links */}
          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded whitespace-nowrap text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
            <button className="px-4 py-2 rounded whitespace-nowrap text-sm font-medium text-gray-700 hover:bg-gray-200">
              Main Nav
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
