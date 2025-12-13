'use client';

import { useState, useEffect } from 'react';

const HACKS = [
    { title: "Browser Magic", text: "Accidentally closed a tab? Press Ctrl+Shift+T (Cmd+Shift+T on Mac) to reopen it instantly." },
    { title: "Power Naps", text: "Drink a cup of coffee right before a 20-minute nap. The caffeine kicks in just as you wake up." },
    { title: "YouTube Frame", text: "Use the keys '<' and '>' to move through a YouTube video frame by frame when paused." },
    { title: "Clean Keyboard", text: "Run the sticky part of a Post-it note between your keyboard keys to catch dust and crumbs." },
    { title: "Instant Dictionary", text: "In MacOS, force-touch (or three-finger tap) any word to see its definition immediately." },
    { title: "Battery Charge", text: "Switch your phone to Airplane Mode to charge it up to 2x faster." },
    { title: "Google Search", text: "Use 'site:example.com' before your query to search only within a specific website." },
    { title: "Elevator Express", text: "Hold the 'Close Door' button and your floor button at the same time to skip other floors (works in some older elevators)." },
    { title: "Microwave Pizza", text: "Put a glass of water in the microwave with your pizza to keep the crust from getting chewy." },
    { title: "Undo Text", text: "On an iPhone, shake your device to undo your last typing action." },
];

export default function LifeHackWidget() {
  const [hack, setHack] = useState<typeof HACKS[0] | null>(null);

  useEffect(() => {
    // Show a random hack every time / refresh? Or daily?
    // Let's do random for "discovery" feel on revisits.
    const random = Math.floor(Math.random() * HACKS.length);
    setHack(HACKS[random]);
  }, []);

  if (!hack) return null;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-neutral-900 border border-emerald-100 dark:border-emerald-900/30 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
      
      {/* Icon */}
      <div className="absolute -right-6 -top-6 text-9xl opacity-5 group-hover:opacity-10 transition-opacity rotate-12 select-none">
        💡
      </div>

      <div className="flex items-center space-x-3 mb-6 relative z-10">
          <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
             <span className="text-xl">⚡</span>
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Quick Tip</h3>
            <h4 className="text-sm font-black font-serif text-foreground">Life Hack</h4>
          </div>
      </div>

      <div className="relative z-10">
        <h5 className="text-lg font-bold mb-3 text-emerald-900 dark:text-emerald-50">
            {hack.title}
        </h5>
        <p className="text-base font-serif leading-relaxed text-muted-foreground">
            {hack.text}
        </p>
      </div>
      
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-transparent opacity-50"></div>
    </div>
  );
}
