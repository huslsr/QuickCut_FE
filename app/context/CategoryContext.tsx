'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Category, categoryService } from '@/app/api/services/categoryService';

interface CategoryContextType {
  categories: Category[];
  categoryMap: Record<string, string>;
  loading: boolean;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

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

        // Create fast lookup map
        const map: Record<string, string> = {};
        sortedData.forEach(cat => { map[cat.id] = cat.name; });
        setCategoryMap(map);

      } catch (error) {
        console.error('Failed to fetch categories context:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, categoryMap, loading }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
}
