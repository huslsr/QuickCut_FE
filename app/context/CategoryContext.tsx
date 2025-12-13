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
        
        // Custom Sort Order: Cricket (1) -> Business (6) -> Tech (5) -> World (7) -> Politics (4) -> Movies (3) -> Football (2) -> General (8)
        const sortOrder = ['1', '6', '5', '7', '4', '3', '2', '8', '9', '10'];
        const sortedData = data.sort((a, b) => {
             // Handle items not in sort list (push to end)
             const indexA = sortOrder.indexOf(a.id);
             const indexB = sortOrder.indexOf(b.id);
             
             if (indexA === -1 && indexB === -1) return 0;
             if (indexA === -1) return 1;
             if (indexB === -1) return -1;
             
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
