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
    <div className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8 blur-lg"></div>

      <div className="relative z-10">
        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4 flex items-center">
            <span className="mr-2">🧠</span> Daily Trivia
        </h3>
        
        <h4 className="text-lg font-bold font-serif leading-tight mb-6">
            {question.question}
        </h4>

        <div className="space-y-3">
            {question.options.map((option, idx) => {
                let btnClass = "w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all ";
                
                if (hasPlayed) {
                     if (idx === question.correctIndex) {
                         btnClass += "bg-green-500 border-green-500 text-white shadow-md transform scale-102"; // Correct
                     } else if (idx === selectedOption) {
                         btnClass += "bg-red-500/80 border-red-500/80 text-white opacity-90"; // Wrong selected
                     } else {
                         btnClass += "bg-white/10 border-white/10 text-gray-300 opacity-50"; // Others
                     }
                } else {
                     btnClass += "bg-white/10 border-white/20 hover:bg-white/20 hover:border-white text-white hover:shadow-lg";
                }

                return (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={hasPlayed}
                        className={btnClass}
                    >
                        {option}
                        {hasPlayed && idx === question.correctIndex && <span className="float-right">✅</span>}
                        {hasPlayed && idx === selectedOption && idx !== question.correctIndex && <span className="float-right">❌</span>}
                    </button>
                );
            })}
        </div>

        {hasPlayed && (
            <div className="mt-6 pt-4 border-t border-white/10 animate-fade-in-up">
                <p className="text-sm font-serif italic text-blue-100">
                    {isCorrect ? "🎉 Correct! " : "😅 Oops! "} 
                    {question.fact}
                </p>
            </div>
        )}
      </div>
    </div>
  );
}
