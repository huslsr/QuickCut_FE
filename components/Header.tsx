export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
                <span className="text-white font-bold text-xl font-serif">QC</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 font-serif leading-none tracking-tight">QuickCut</span>
                <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">Global News</span>
              </div>
            </div>
          </div>

          {/* Center Navigation (Hidden on mobile) */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-4 text-sm font-medium text-gray-600 bg-gray-100/50 px-4 py-2 rounded-full border border-gray-200/50">
              <select className="bg-transparent border-none focus:ring-0 text-gray-900 font-semibold cursor-pointer text-sm">
                <option>English</option>
                <option>Hindi</option>
              </select>
              <span className="text-gray-300">|</span>
              <span className="text-gray-900">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3">
            <button className="p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="hidden sm:block px-6 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 text-sm font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
