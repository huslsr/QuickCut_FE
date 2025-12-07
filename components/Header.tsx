'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => {
      setIsSearchOpen(!isSearchOpen);
      if (isSearchOpen) setSearchQuery(''); // Clear on close
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`[Header] Submitting search for: ${searchQuery}`);
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Date & Menu */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-500">
            <button 
              onClick={toggleMenu}
              className="text-black hover:text-accent transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="uppercase tracking-widest text-xs">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>

           {/* Mobile Menu Button (Visible on small screens) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-black hover:text-accent transition-colors focus:outline-none"
            >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="text-center cursor-pointer group">
              <h1 className="text-4xl font-black font-serif tracking-tighter leading-none group-hover:text-accent transition-colors">
                QUICKCUT
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-black transition-colors">
                Global Perspective
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
                        className="border-b-2 border-black focus:outline-none px-2 py-1 text-sm font-serif w-32 sm:w-48 transition-all"
                        autoFocus
                    />
                    <button type="submit" className="ml-2 text-black hover:text-accent">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                     <button type="button" onClick={toggleSearch} className="ml-2 text-gray-400 hover:text-black">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </form>
            ) : (
                <button 
                    onClick={toggleSearch}
                    className="text-black hover:text-accent transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
            )}
            <Link href="/login" className="hidden sm:block text-sm font-bold uppercase tracking-wider hover:text-accent transition-colors">
              Login
            </Link>
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                alert('Subscription feature coming soon! Stay tuned.');
              }}
              className="hidden sm:block text-sm font-bold uppercase tracking-wider border-2 border-black px-5 py-2 hover:bg-black hover:text-white transition-all"
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
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl border-r-4 border-black ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Close Button */}
          <div className="flex justify-between items-center mb-12">
             <h2 className="text-2xl font-black font-serif tracking-tight">MENU</h2>
             <button 
              onClick={toggleMenu}
              className="text-black hover:text-accent transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-8">
            <Link 
              href="/" 
              className="block text-2xl font-bold font-serif hover:text-accent transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              href="#" 
              className="block text-2xl font-bold font-serif hover:text-accent transition-colors"
              onClick={toggleMenu}
            >
              Featured Stories
            </Link>
            <Link 
              href="#" 
              className="block text-2xl font-bold font-serif hover:text-accent transition-colors"
              onClick={toggleMenu}
            >
              Latest News
            </Link>
            <Link 
              href="#" 
              className="block text-2xl font-bold font-serif hover:text-accent transition-colors"
              onClick={toggleMenu}
            >
              Videos
            </Link>
             <Link 
              href="#" 
              className="block text-2xl font-bold font-serif hover:text-accent transition-colors text-accent"
              onClick={toggleMenu}
            >
              Subscribe
            </Link>
          </nav>

          {/* Sidebar Footer */}
          <div className="mt-auto pt-8 border-t border-gray-100 text-sm text-gray-400">
             <p>&copy; {new Date().getFullYear()} QuickCut.</p>
             <p className="mt-2">All rights reserved.</p>
          </div>
        </div>
      </div>
    </header>
  );
}
