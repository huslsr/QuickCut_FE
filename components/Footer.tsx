"use client";

import Link from "next/link";
import { useState } from "react";
import { useCategories } from "@/app/context/CategoryContext";
import PrivacyTermsSheet from "./PrivacyTermsSheet";

export default function Footer() {
  const { categories } = useCategories();
  const footerCategories = categories.slice(0, 6); // Show top 6

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [showPrivacySheet, setShowPrivacySheet] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await import("@/app/api/services/subscriptionService").then((mod) =>
        mod.subscriptionService.subscribe(email)
      );
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <footer
      id="footer-subscribe"
      className="bg-gray-900 dark:bg-black text-white pt-16 pb-8 border-t border-transparent dark:border-gray-800 transition-colors notranslate"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* App Coming Soon Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 px-8 py-12 shadow-2xl mb-16 border border-white/10 isolate">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"></div>

          <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
            <div className="text-center md:text-left max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4 border border-indigo-500/30">
                Coming Soon
              </span>
              <h2 className="text-3xl md:text-5xl font-black font-serif text-white mb-4 tracking-tight leading-tight">
                Experience QuickCut <br /> on the Go.
              </h2>
              <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                We are building a premium mobile experience for iOS and Android.{" "}
                <br className="hidden md:block" /> Stay tuned for the ultimate
                news reading app.
              </p>
            </div>

            <div className="flex items-center gap-6 flex-shrink-0">
              {/* App Store Placeholder */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 w-32 h-32 hover:bg-white/10 transition-all group cursor-default">
                <svg
                  className="w-10 h-10 text-white mb-3 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.5 1.63-.03 3.13 1.09 4.11 1.09 1.01 0 2.89-1.36 4.86-1.15.82.03 3.17.33 4.67 2.51-4.14 2.05-3.47 8.21.25 10.16zM13 3.5c.95-1.17 1.58-2.52 1.4-3.5-1.35.06-2.98.9-3.95 2.07-.93 1.15-1.76 2.46-1.54 3.54 1.51.11 3.05-.99 4.09-2.11z" />
                </svg>
                <span className="text-xs font-medium text-gray-400">
                  iOS App
                </span>
              </div>

              {/* Play Store Placeholder */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 w-32 h-32 hover:bg-white/10 transition-all group cursor-default">
                <svg
                  className="w-10 h-10 text-white mb-3 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm11.535 11.52l3.132 3.131-.88.504-2.253-2.251-1.384-1.384zm3.896-3.899l-3.132 3.131-4.995-5.004 2.253-2.251.879.504zM5.388 12L15.42 2.032a.998.998 0 0 1 1.29-.107l-11.321 11.4L5.388 12z" />
                  <path
                    d="M16.71 16.71l-1.385-1.385-1.385-1.384 10.063 10.064a.997.997 0 0 0 1.414 0l-8.707-8.707z"
                    fill="transparent"
                  />{" "}
                  {/* Simplified generic android shape or triangle */}
                  <path d="M17.523 15.34l2.968 1.688c.837.476.837 1.668 0 2.144l-2.968 1.688-4.226-4.225 4.226-1.295z" />
                </svg>
                <span className="text-xs font-medium text-gray-400">
                  Android App
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* ... columns ... */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-serif">
                  QC
                </span>
              </div>
              <span className="text-2xl font-bold font-serif">QuickCut</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Delivering the latest stories, breaking news, and in-depth
              analysis from around the globe. Stay informed, stay ahead.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons */}
              {[
                {
                  name: "x",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                  viewBox: "0 0 24 24",
                  url: "https://x.com/QuicCut",
                },
                {
                  name: "facebook",
                  path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.648 0-2.928 1.67-2.928 3.403v1.575h2.613l-.391 3.667h-2.222v7.98h-4.887z",
                  viewBox: "0 0 24 24",
                  url: "https://www.facebook.com/profile.php?id=61584552434821",
                },
                {
                  name: "instagram",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
                  viewBox: "0 0 24 24",
                  url: "https://www.instagram.com/quickcut_official_news",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-all"
                >
                  <span className="sr-only">{social.name}</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox={social.viewBox}
                  >
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
                  <Link
                    href={`/category/${category.id}`}
                    className="hover:text-indigo-400 transition-colors"
                  >
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
                { name: "About Us", slug: "about-us" },
                { name: "Careers", slug: "careers" },
                { name: "Privacy and Terms of Service", slug: "privacy-terms" },
                { name: "Contact", slug: "contact" },
              ].map((item) => (
                <li key={item.slug}>
                  {item.slug === "privacy-terms" ? (
                    <button
                      onClick={() => setShowPrivacySheet(true)}
                      className="hover:text-indigo-400 transition-colors text-left"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={`/company/${item.slug}`}
                      className="hover:text-indigo-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <PrivacyTermsSheet
            isOpen={showPrivacySheet}
            onClose={() => setShowPrivacySheet(false)}
          />

          <div>
            <h3 className="text-lg font-bold font-serif mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for daily updates.
            </p>
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
                disabled={status === "loading" || status === "success"}
              />
              <button
                type="submit"
                className={`px-4 py-2.5 rounded-lg font-semibold transition-colors text-sm ${
                  status === "success"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
                disabled={status === "loading" || status === "success"}
              >
                {status === "loading"
                  ? "Subscribing..."
                  : status === "success"
                  ? "Subscribed!"
                  : "Subscribe"}
              </button>
              {status === "error" && (
                <p className="text-red-400 text-xs">
                  Failed to subscribe. Try again.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} QuickCut Media. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
