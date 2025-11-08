export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Cut</h4>
            <p className="text-gray-400 text-sm">
              Your source for the latest news, updates, and stories from around the world.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Categories</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">City</a></li>
              <li><a href="#" className="hover:text-white">India</a></li>
              <li><a href="#" className="hover:text-white">World</a></li>
              <li><a href="#" className="hover:text-white">Business</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Company</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Follow Us</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Quick Cut. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
