export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Date & Menu */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-500">
            <button className="text-black hover:text-accent transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="uppercase tracking-widest text-xs">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <div className="text-center cursor-pointer group">
              <h1 className="text-4xl font-black font-serif tracking-tighter leading-none group-hover:text-accent transition-colors">
                QUICKCUT
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-black transition-colors">
                Global Perspective
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-6">
            <button className="text-black hover:text-accent transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="hidden sm:block text-sm font-bold uppercase tracking-wider border-2 border-black px-5 py-2 hover:bg-black hover:text-white transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
