'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCategories } from '@/app/context/CategoryContext';

export default function Footer() {
  const { categories } = useCategories();
  const footerCategories = categories.slice(0, 6); // Show top 6

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
        await import('@/app/api/services/subscriptionService').then(mod => mod.subscriptionService.subscribe(email));
        setStatus('success');
        setEmail('');
    } catch (err) {
        setStatus('error');
    }
  };

  return (
    <footer id="footer-subscribe" className="bg-gray-900 dark:bg-black text-white pt-16 pb-8 border-t border-transparent dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* ... columns ... */}
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
              {/* Social Icons */}
              {[
                  { 
                    name: 'x', 
                    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
                    viewBox: '0 0 24 24',
                    url: 'https://x.com/QuicCut'
                  },
                  { 
                    name: 'facebook', 
                    path: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.648 0-2.928 1.67-2.928 3.403v1.575h2.613l-.391 3.667h-2.222v7.98h-4.887z',
                    viewBox: '0 0 24 24',
                    url: 'https://www.facebook.com/profile.php?id=61584552434821'
                  },
                  { 
                    name: 'instagram', 
                    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
                    viewBox: '0 0 24 24',
                    url: 'https://www.instagram.com/quickcut_official_news'
                  },
                  { 
                    name: 'linkedin', 
                    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
                    viewBox: '0 0 24 24',
                    url: '#'
                  }
              ].map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all">
                  <span className="sr-only">{social.name}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox={social.viewBox}>
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold font-serif mb-6">Categories</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {footerCategories.map((category) => (
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
              onSubmit={handleSubscribe}
            >
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                disabled={status === 'loading' || status === 'success'}
              />
              <button 
                type="submit"
                className={`px-4 py-2.5 rounded-lg font-semibold transition-colors text-sm ${
                    status === 'success' 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
              </button>
              {status === 'error' && <p className="text-red-400 text-xs">Failed to subscribe. Try again.</p>}
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
