'use client';

import { useState, useEffect } from 'react';

type Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  fact: string;
};

const TRIVIA_QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: "Which country produces the most coffee in the world?",
    options: ["Colombia", "Vietnam", "Brazil", "Ethiopia"],
    correctIndex: 2,
    fact: "Brazil has been the top coffee producer for over 150 years!"
  },
  {
    id: 'q2',
    question: "Which tech giant was originally called 'Cadabra'?",
    options: ["Amazon", "Google", "Facebook", "Microsoft"],
    correctIndex: 0,
    fact: "Jeff Bezos changed the name to Amazon because 'Cadabra' sounded too like 'cadaver'."
  },
  {
      id: 'q3',
      question: "What is the capital city of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correctIndex: 2,
      fact: "Canberra was chosen as a compromise between rivals Sydney and Melbourne."
  },
  {
      id: 'q4',
      question: "Which element has the chemical symbol 'Fe'?",
      options: ["Gold", "Silver", "Iron", "Lead"],
      correctIndex: 2,
      fact: "Fe comes from 'Ferrum', the Latin word for iron."
  }
];

export default function TriviaWidget() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    // Determine daily question based on date index
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % TRIVIA_QUESTIONS.length;
    const dailyQ = TRIVIA_QUESTIONS[index];
    setQuestion(dailyQ);

    const savedState = localStorage.getItem(`quickcut_trivia_${dailyQ.id}`);
    if (savedState) {
        const { selected, correct } = JSON.parse(savedState);
        setSelectedOption(selected);
        setIsCorrect(correct);
        setHasPlayed(true);
    }
  }, []);

  const handleAnswer = (index: number) => {
    if (hasPlayed || !question) return;

    const correct = index === question.correctIndex;
    setSelectedOption(index);
    setIsCorrect(correct);
    setHasPlayed(true);

    localStorage.setItem(`quickcut_trivia_${question.id}`, JSON.stringify({ selected: index, correct }));
  };

  if (!question) return null;

  return (
    <div className="bg-gradient-to-br from-fuchsia-50 to-white dark:from-neutral-900 dark:to-neutral-950 border border-fuchsia-100 dark:border-neutral-800 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group text-foreground">
      {/* Decorative Circles - Light/Dark adaptive */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 dark:bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/5 dark:bg-white/5 rounded-full -ml-8 -mb-8 blur-xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-6">
            <span className="text-xl">🧠</span>
            <h3 className="text-sm font-black uppercase tracking-widest text-fuchsia-900 dark:text-fuchsia-100">Daily Trivia</h3>
        </div>
        
        <h4 className="text-xl font-black font-serif leading-tight mb-8 text-foreground">
            {question.question}
        </h4>

        <div className="space-y-3">
            {question.options.map((option, idx) => {
                let btnClass = "w-full text-left px-5 py-3.5 rounded-xl border text-base font-bold transition-all relative overflow-hidden ";
                
                if (hasPlayed) {
                     if (idx === question.correctIndex) {
                         // Correct styling
                         btnClass += "bg-green-500 border-green-500 text-white shadow-md scale-[1.02] ring-2 ring-green-200 dark:ring-green-900"; 
                     } else if (idx === selectedOption) {
                         // Wrong styling
                         btnClass += "bg-red-100 border-red-200 text-red-700 opacity-60 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300"; 
                     } else {
                         // Others styling
                         btnClass += "bg-white/40 border-black/5 text-muted-foreground opacity-50 dark:bg-white/5 dark:border-white/5"; 
                     }
                } else {
                     // Default state
                     btnClass += "bg-white/60 hover:bg-white border-fuchsia-200/50 hover:border-fuchsia-300 text-foreground hover:shadow-sm dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:text-gray-200";
                }

                return (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={hasPlayed}
                        className={btnClass}
                    >
                        <span className="relative z-10 flex justify-between items-center w-full">
                            {option}
                            {hasPlayed && idx === question.correctIndex && <span>✅</span>}
                            {hasPlayed && idx === selectedOption && idx !== question.correctIndex && <span>❌</span>}
                        </span>
                    </button>
                );
            })}
        </div>

        {hasPlayed && (
            <div className="mt-8 pt-6 border-t border-fuchsia-100 dark:border-white/10 animate-fade-in-up">
                <p className="text-base font-serif italic text-fuchsia-800 dark:text-fuchsia-200 leading-relaxed">
                    <span className="font-bold border-b border-fuchsia-300 pb-0.5 mr-2 not-italic">Did you know?</span>
                    {question.fact}
                </p>
            </div>
        )}
      </div>
    </div>
  );
}
