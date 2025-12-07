import Link from 'next/link';
import { useEffect, useState } from 'react';
import { categoryService, Category } from '@/app/api/services/categoryService';

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data.slice(0, 6)); // Show top 6
      } catch (error) {
        console.error('Failed to fetch footer categories');
      }
    };
    fetchCategories();
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-serif">QC</span>
              </div>
              <span className="text-2xl font-bold font-serif">QuickCut</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Delivering the latest stories, breaking news, and in-depth analysis from around the globe. Stay informed, stay ahead.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons */}
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <a key={social} href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all">
                  <span className="sr-only">{social}</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold font-serif mb-6">Categories</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.id}`} className="hover:text-indigo-400 transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold font-serif mb-6">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                { name: 'About Us', slug: 'about-us' },
                { name: 'Careers', slug: 'careers' },
                { name: 'Privacy Policy', slug: 'privacy-policy' },
                { name: 'Terms of Service', slug: 'terms-of-service' },
                { name: 'Contact', slug: 'contact' }
              ].map((item) => (
                <li key={item.slug}>
                  <Link href={`/company/${item.slug}`} className="hover:text-indigo-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold font-serif mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for daily updates.</p>
            <form 
              className="flex flex-col space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                console.log('Footer Subscribe submitted');
              }}
            >
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <button 
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} QuickCut Media. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300">Privacy</a>
            <a href="#" className="hover:text-gray-300">Terms</a>
            <a href="#" className="hover:text-gray-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
