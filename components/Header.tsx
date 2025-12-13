'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthProvider';
import { useCategories } from '@/app/context/CategoryContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { categories } = useCategories();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
        setMounted(prev => prev); 
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => {
      setIsSearchOpen(!isSearchOpen);
      if (isSearchOpen) setSearchQuery(''); // Clear on close
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-background border-b-4 border-black dark:border-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Date & Menu */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-500">
            <button 
              onClick={toggleMenu}
              className="text-black dark:text-white hover:text-accent active:scale-95 transition-all focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex flex-col">
                 <span className="uppercase tracking-widest text-xs font-bold text-black dark:text-white">
                  {mounted ? new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : ''}
                </span>
                <span className="text-[10px] tracking-wider text-gray-400">
                  {mounted ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
            </div>
          </div>

           {/* Mobile Menu Button (Visible on small screens) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-black dark:text-white hover:text-accent active:scale-95 transition-all focus:outline-none"
            >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="text-center cursor-pointer group block">
              <h1 className="text-4xl font-black font-serif tracking-tighter leading-none group-hover:text-accent transition-colors text-black dark:text-white">
                QUICKCUT
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                Global News Source
              </span>
            </Link>
          </div>

          {/* Right: Actions */}
           <div className="flex items-center space-x-6">
            
            {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="border-b-2 border-black dark:border-white bg-transparent focus:outline-none px-2 py-1 text-sm font-serif w-32 sm:w-48 transition-all dark:text-white dark:placeholder-gray-400"
                        autoFocus
                    />
                    <button type="submit" className="ml-2 text-black dark:text-white hover:text-accent">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                     <button type="button" onClick={toggleSearch} className="ml-2 text-gray-400 hover:text-black dark:hover:text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </form>
            ) : (
                <button 
                    onClick={toggleSearch}
                    className="text-black dark:text-white hover:text-accent active:scale-95 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
            )}
            
            {user ? (
                <div className="hidden sm:flex items-center space-x-4">
                    <span className="text-sm font-bold font-serif text-gray-700 dark:text-gray-300">Hi, {user.username}</span>
                    <button 
                        onClick={logout}
                        className="text-sm font-bold uppercase tracking-wider text-red-600 hover:text-red-800 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                 <Link href={`/login?redirect=${pathname !== '/login' ? pathname : '/'}`} className="hidden sm:block text-sm font-bold uppercase tracking-wider hover:text-accent transition-colors text-black dark:text-white">
                    Login
                 </Link>
            )}

            <ThemeToggle />
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                const footer = document.getElementById('footer-subscribe');
                if (footer) {
                    footer.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hidden sm:block text-sm font-bold uppercase tracking-wider border-2 border-black dark:border-white px-5 py-2 text-black hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black active:scale-95 transition-all"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-[300px] bg-white dark:bg-neutral-900 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl border-r-4 border-black dark:border-neutral-800 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col overflow-y-auto">
          {/* Close Button */}
          <div className="flex justify-between items-center mb-12">
             <h2 className="text-2xl font-black font-serif tracking-tight text-black dark:text-white">MENU</h2>
             <button 
              onClick={toggleMenu}
              className="text-black dark:text-white hover:text-accent transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-6">
            <Link 
              href="/" 
              className="block text-xl font-bold font-serif hover:text-accent transition-colors text-black dark:text-white"
              onClick={toggleMenu}
            >
              All Stories
            </Link>
            <Link 
              href="/latest" 
              className="block text-xl font-bold font-serif hover:text-accent transition-colors text-black dark:text-white"
              onClick={toggleMenu}
            >
              Latest News
            </Link>
            
            {/* Categories */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
               <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Categories</h3>
               <div className="space-y-3">
                   {categories.map(cat => (
                        <Link 
                            key={cat.id}
                            href={`/category/${cat.id}`}
                            className="block text-lg font-medium hover:text-accent transition-colors text-gray-600 dark:text-gray-300"
                            onClick={toggleMenu}
                        >
                            {cat.name}
                        </Link>
                   ))}
               </div>
            </div>

            {user ? (
               <>
                 <div className="block text-lg font-bold font-serif text-gray-500 mb-2">
                    {/* Hi, {user.username} */}
                 </div>
                 <Link 
                   href="/bookmarks"
                   className="block text-2xl font-bold font-serif hover:text-accent transition-colors text-black dark:text-white mb-4"
                   onClick={toggleMenu}
                 >
                   My Bookmarks
                 </Link>
                 <button 
                   onClick={() => {
                       toggleMenu();
                       logout();
                   }}
                   className="block text-2xl font-bold font-serif hover:text-red-600 transition-colors text-red-500 text-left w-full"
                 >
                   Logout
                 </button>
               </>
            ) : (
                <Link 
                  href={`/login?redirect=${pathname !== '/login' ? pathname : '/'}`}
                  className="block text-2xl font-bold font-serif hover:text-accent transition-colors text-black dark:text-white"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
            )}
             <button 
              onClick={(e) => {
                  e.preventDefault();
                  toggleMenu();
                  const footer = document.getElementById('footer-subscribe');
                  if (footer) footer.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block text-2xl font-bold font-serif hover:text-accent transition-colors text-accent text-left w-full"
            >
              Subscribe
            </button>
             {/* Language Selector */}
             <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                  Language
                </span>
                <LanguageSwitcher />
             </div>
           </nav>

           {/* Sidebar Footer */}
           <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} QuickCut.</p>
              <p className="mt-2">All rights reserved.</p>
           </div>
         </div>
       </div>
     </header>
   );
 }
