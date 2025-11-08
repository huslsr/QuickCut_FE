export default function Header() {

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">QC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Quick Cut</span>
            </div>
          </div>

          {/* Center Navigation (Hidden on mobile) */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>English</option>
                <option>Hindi</option>
              </select>
              <span className="text-gray-500">|</span>
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              <span className="text-gray-500">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 text-sm">
              Login
            </button>
          </div>
        </div>

        {/* Additional Header Elements */}
        <div className="border-t border-gray-200 py-2 hidden md:block">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>In the News</span>
            <div className="flex items-center space-x-4">
              <span>Breaking: Major story unfolding</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
