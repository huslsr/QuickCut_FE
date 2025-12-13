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
    <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <h3 className="text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Daily Poll
          </h3>
      </div>
      
      <h4 className="text-lg font-bold font-serif mb-6 text-black dark:text-white leading-tight">
        {poll.question}
      </h4>

      <div className="space-y-3">
        {poll.options.map((option) => {
          const isSelected = votedOption === option.id;
          const percentage = Math.round((option.votes / poll.totalVotes) * 100);

          return (
            <div key={option.id} className="relative">
              {!votedOption ? (
                <button
                  onClick={() => handleVote(option.id)}
                  className="w-full text-left px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-black transition-all group"
                >
                  <span className="font-medium text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white">
                    {option.text}
                  </span>
                </button>
              ) : (
                <div className={`relative w-full overflow-hidden rounded-lg h-10 bg-neutral-100 dark:bg-neutral-800 border ${isSelected ? 'border-black dark:border-white' : 'border-transparent'}`}>
                  {/* Progress Bar Background */}
                  <div 
                    className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out ${isSelected ? 'bg-neutral-200 dark:bg-white/20' : 'bg-neutral-200/50 dark:bg-white/10'}`}
                    style={{ width: `${percentage}%` }}
                  />
                  
                  {/* Text Content */}
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <span className={`text-sm font-bold ${isSelected ? 'text-black dark:text-white' : 'text-neutral-600 dark:text-neutral-400'}`}>
                      {option.text} {isSelected && <span className="ml-1 text-xs">✓</span>}
                    </span>
                    <span className="text-sm font-black font-mono">
                      {percentage}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-center">
         <p className="text-xs text-neutral-400 font-serif italic">
            {votedOption ? `You and ${poll.totalVotes - 1} others voted today.` : 'Join the discussion. Your voice matters.'}
         </p>
      </div>
    </div>
  );
}
