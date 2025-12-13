'use client';

import { useState, useEffect } from 'react';

const QUOTES = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
    { text: "It has become appallingly obvious that our technology has exceeded our humanity.", author: "Albert Einstein" },
    { text: "The Web as I envisaged it, we have not yet seen it. The future is still so much bigger than the past.", author: "Tim Berners-Lee" },
    { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
    { text: "Digital design is like painting, except the paint never dries.", author: "Neville Brody" },
    { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Software is eating the world.", author: "Marc Andreessen" },
    { text: "Move fast and break things.", author: "Mark Zuckerberg" },
];

export default function QuoteWidget() {
  const [quote, setQuote] = useState<typeof QUOTES[0] | null>(null);

  useEffect(() => {
    // Rotation based on hour to keep it fresher than daily? Or daily?
    // Let's do Daily to match others.
    const day = new Date().getDate();
    const index = day % QUOTES.length;
    setQuote(QUOTES[index]);
  }, []);

  if (!quote) return null;

  return (
    <div className="bg-gradient-to-br from-teal-50 to-white dark:from-neutral-900 dark:to-neutral-950 border border-teal-100 dark:border-neutral-800 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
      {/* Background Icon */}
      <div className="absolute top-4 right-6 text-8xl font-serif text-teal-900/5 dark:text-white/5 font-black pointer-events-none select-none group-hover:scale-110 transition-transform duration-700">
        ”
      </div>

      <div className="flex items-center space-x-3 mb-8 relative z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
          <h3 className="text-sm font-black uppercase tracking-widest text-teal-900 dark:text-teal-100">Daily Inspiration</h3>
      </div>

      <blockquote className="relative z-10">
        <p className="text-2xl md:text-3xl font-black font-serif leading-tight text-foreground mb-8">
          “{quote.text}”
        </p>
        <footer className="flex items-center space-x-3">
             <div className="h-0.5 w-12 bg-teal-500/50 rounded-full"></div>
             <cite className="text-sm font-bold tracking-wide uppercase not-italic text-teal-700 dark:text-teal-400">
                {quote.author}
             </cite>
        </footer>
      </blockquote>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 dark:via-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
    </div>
  );
}
