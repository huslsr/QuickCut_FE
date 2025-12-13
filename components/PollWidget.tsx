'use client';

import { useState, useEffect } from 'react';

type PollOption = {
  id: string;
  text: string;
  votes: number;
};

type PollData = {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
};

const DAILY_POLLS: PollData[] = [
  {
    id: 'poll-1',
    question: 'How do you prefer to consume daily news?',
    options: [
      { id: 'opt1', text: 'In-depth Articles', votes: 45 },
      { id: 'opt2', text: 'Video Highlights', votes: 30 },
      { id: 'opt3', text: 'Headlines Only', votes: 25 },
    ],
    totalVotes: 100,
  },
  {
    id: 'poll-2',
    question: 'Global Economy Sentiment: What is your outlook for 2026?',
    options: [
      { id: 'opt1', text: 'Bullish (Growth)', votes: 120 },
      { id: 'opt2', text: 'Bearish (Recession)', votes: 95 },
      { id: 'opt3', text: 'Neutral / Flat', votes: 60 },
    ],
    totalVotes: 275,
  },
  {
      id: 'poll-3',
      question: 'Which tech trend excites you the most?',
      options: [
          { id: 'opt1', text: 'Artificial Intelligence', votes: 350 },
          { id: 'opt2', text: 'Quantum Computing', votes: 120 },
          { id: 'opt3', text: 'Green Energy Tech', votes: 210 }
      ],
      totalVotes: 680
  }
];

export default function PollWidget() {
  const [poll, setPoll] = useState<PollData | null>(null);
  const [votedOption, setVotedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Select a poll based on the day of the year to rotate daily
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const pollIndex = dayOfYear % DAILY_POLLS.length;
    const currentPoll = DAILY_POLLS[pollIndex];
    setPoll(currentPoll);

    // Check localStorage
    const savedVote = localStorage.getItem(`quickcut_poll_vote_${currentPoll.id}`);
    if (savedVote) {
      setVotedOption(savedVote);
    }
    setLoading(false);
  }, []);

  const handleVote = (optionId: string) => {
    if (!poll || votedOption) return;

    // Save vote
    localStorage.setItem(`quickcut_poll_vote_${poll.id}`, optionId);
    setVotedOption(optionId);

    // Optimistically update UI (Simulated)
    setPoll(prev => {
        if (!prev) return null;
        const updatedOptions = prev.options.map(opt => 
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );
        return {
            ...prev,
            options: updatedOptions,
            totalVotes: prev.totalVotes + 1
        };
    });
  };

  if (loading || !poll) return null;

  return (
    <div className="bg-gradient-to-br from-red-50 to-white dark:from-red-950/20 dark:to-neutral-900 border border-red-100 dark:border-red-900/30 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center space-x-3 mb-6">
          <div className="relative flex items-center justify-center">
             <span className="w-2.5 h-2.5 rounded-full bg-red-500 relative z-10"></span>
             <span className="w-2.5 h-2.5 rounded-full bg-red-500 absolute animate-ping opacity-75"></span>
          </div>
          <h3 className="text-sm font-black font-serif uppercase tracking-widest text-red-900 dark:text-red-100">
            Daily Poll
          </h3>
      </div>
      
      <h4 className="text-xl font-black font-serif mb-8 text-foreground leading-tight">
        {poll.question}
      </h4>

      <div className="space-y-4">
        {poll.options.map((option) => {
          const isSelected = votedOption === option.id;
          const percentage = Math.round((option.votes / poll.totalVotes) * 100);

          return (
            <div key={option.id} className="relative group">
              {!votedOption ? (
                <button
                  onClick={() => handleVote(option.id)}
                  className="w-full text-left px-6 py-4 rounded-xl bg-white/60 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-2 border-transparent hover:border-red-200 dark:hover:border-red-900/50 transition-all duration-300"
                >
                  <span className="font-bold text-base text-foreground group-hover:translate-x-1 transition-transform inline-block">
                    {option.text}
                  </span>
                </button>
              ) : (
                <div className={`relative w-full overflow-hidden rounded-xl h-14 bg-white/40 dark:bg-black/20 border-2 ${isSelected ? 'border-red-500' : 'border-transparent'}`}>
                  {/* Progress Bar Background */}
                  <div 
                    className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out ${isSelected ? 'bg-red-500/10' : 'bg-slate-200/50 dark:bg-white/5'}`}
                    style={{ width: `${percentage}%` }}
                  />
                  
                  {/* Text Content */}
                  <div className="absolute inset-0 flex items-center justify-between px-6">
                    <span className={`text-base font-bold flex items-center ${isSelected ? 'text-red-600' : 'text-foreground'}`}>
                      {option.text} {isSelected && <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </span>
                    <span className="text-lg font-black font-sans text-foreground">
                      {percentage}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-border text-center">
         <p className="text-sm text-muted-foreground font-serif italic">
            {votedOption ? (
                <span>You and <span className="font-bold text-foreground">{poll.totalVotes - 1} others</span> voted today.</span>
            ) : (
                'Join the discussion. Your voice matters.'
            )}
         </p>
      </div>
    </div>
  );
}
