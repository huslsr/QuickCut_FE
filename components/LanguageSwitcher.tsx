'use client';

import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  // 'en' | 'hi'
  const [currentLang, setCurrentLang] = useState('en'); 

  useEffect(() => {
    console.log("LanguageSwitcher Mounted. Starting poll...");
    // Check initial language from cookie if possible, or default to en
    const cookies = document.cookie.split(';');
    const googtrans = cookies.find(c => c.trim().startsWith('googtrans='));
    if (googtrans) {
        if (googtrans.includes('/en/hi')) setCurrentLang('hi');
        else setCurrentLang('en');
    }

    // POLL for the Google Translate widget
    const checkWidget = setInterval(() => {
        const container = document.getElementById('google_translate_element');
        if (container && container.innerHTML.length > 20) {
            console.log("Widget HTML Found:", container.innerHTML); // Log FULL HTML
            
            // Try different selectors
            const select = container.querySelector('select');
            const combo = container.querySelector('.goog-te-combo');
            
            if (select || combo) {
                console.log("Dropout found via:", select ? "TAG" : "CLASS");
            }
        }

        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (select) {
            clearInterval(checkWidget);
            console.log("Google Translate widget found (Final).");
        }
    }, 2000); // Slow down poll to 2s to avoid spam

    return () => clearInterval(checkWidget);
  }, []);

  const switchLanguage = (lang: string) => {
    const container = document.getElementById('google_translate_element');
    const select = container?.querySelector('select') || document.querySelector('.goog-te-combo') as HTMLSelectElement;
    
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
      setCurrentLang(lang);
    } 
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border border-black dark:border-white transition-colors ${
          currentLang === 'en' 
            ? 'bg-black text-white dark:bg-white dark:text-black' 
            : 'bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        English
      </button>
      <button
        onClick={() => switchLanguage('hi')}
        className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border border-black dark:border-white transition-colors ${
          currentLang === 'hi' 
            ? 'bg-black text-white dark:bg-white dark:text-black' 
            : 'bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        Hindi
      </button>
    </div>
  );
}
