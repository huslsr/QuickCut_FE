'use client';

import { useState, useEffect } from 'react';

type HistoryEvent = {
  text: string;
  year: number;
  pages?: {
    thumbnail?: {
        source: string;
    }
  }[];
};

export default function OnThisDayWidget() {
  const [event, setEvent] = useState<HistoryEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const date = new Date();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        const res = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/selected/${month}/${day}`, {
            headers: {
                'User-Agent': 'QuickCutNews/1.0 (mailto:contact@quickcut.info)'
            }
        });
        
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        
        if (data && data.selected && data.selected.length > 0) {
            // Pick a random event from the top 5 to keep it fresh on refresh, or just the first one
            const randomIndex = Math.floor(Math.random() * Math.min(5, data.selected.length));
            setEvent(data.selected[randomIndex]);
        }
      } catch (e) {
        // Fallback if API fails
        setEvent({
            year: 1969,
            text: "Apollo 11 lands on the Moon, with Neil Armstrong becoming the first human to step onto its surface.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return (
      <div className="bg-card border border-border p-6 rounded-2xl shadow-sm animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/3"></div>
          <div className="h-16 bg-muted rounded w-full"></div>
      </div>
  );

  if (!event) return null;

  return (
    <div className="group relative bg-card text-card-foreground border border-border p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden">


      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-4">
             <span className="flex h-2 w-2 rounded-full bg-accent"></span>
             <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">On This Day</h3>
        </div>
        
        <div className="mb-2">
            <span className="text-3xl font-black font-serif text-accent">{event.year}</span>
        </div>

        <p className="text-sm font-medium leading-relaxed font-serif text-foreground/90">
            {event.text}
        </p>

        {event.pages && event.pages[0] && event.pages[0].thumbnail && (
            <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center space-x-3">
                    <img 
                        src={event.pages[0].thumbnail.source} 
                        alt="Historical event" 
                        className="w-10 h-10 rounded-full object-cover border-2 border-background shadow-sm"
                    />
                    <span className="text-xs text-muted-foreground italic">
                        Historical Archive
                    </span>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
