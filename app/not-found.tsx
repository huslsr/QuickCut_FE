import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background transition-colors">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-background">
        <h2 className="text-9xl font-black font-serif text-gray-200 dark:text-neutral-800 mb-4 select-none">
          404
        </h2>
        <h1 className="text-4xl font-black font-serif mb-6 text-gray-900 dark:text-white absolute mt-[-2rem]">
          Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md font-serif text-lg">
          The story you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-wider hover:bg-accent hover:text-white dark:hover:bg-gray-200 transition-all transform hover:-translate-y-1 shadow-lg"
        >
          Return Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
