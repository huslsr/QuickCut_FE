'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/app/context/AuthProvider';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register({ username, email, hashedPassword: password });
      router.push('/');
    } catch (err: any) {
        console.error("Register Error:", err);
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background transition-colors">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 bg-white dark:bg-neutral-900 p-8 rounded-lg shadow-xl dark:shadow-none border border-transparent dark:border-neutral-800">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-black font-serif text-gray-900 dark:text-white">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Or{' '}
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-accent dark:hover:text-red-400">
                sign in to existing account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-500 text-gray-900 dark:text-white dark:bg-black rounded-t-md focus:outline-none focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:z-10 sm:text-sm transition-colors"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-500 text-gray-900 dark:text-white dark:bg-black focus:outline-none focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:z-10 sm:text-sm transition-colors"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-500 text-gray-900 dark:text-white dark:bg-black rounded-b-md focus:outline-none focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:z-10 sm:text-sm transition-colors"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold uppercase tracking-wider rounded-md text-white bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 focus:outline-none transition-colors"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
