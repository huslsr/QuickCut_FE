'use client';

import { useState, useEffect } from 'react';

const WORDS = [
    { word: "Serendipity", phonetics: "/ˌser.ənˈdɪp.ə.ti/", type: "noun", definition: "The occurrence and development of events by chance in a happy or beneficial way.", example: "It was pure serendipity that we met at the coffee shop right before the rain started." },
    { word: "Ephemeral", phonetics: "/əˈfem.ər.əl/", type: "adjective", definition: "Lasting for a very short time.", example: "Fashions are ephemeral, changing with every season." },
    { word: "Mellifluous", phonetics: "/məˈlɪf.lu.əs/", type: "adjective", definition: "(of a voice or words) sweet or musical; pleasant to hear.", example: "She had a rich, mellifluous voice that turned heads whenever she spoke." },
    { word: "Ineffable", phonetics: "/ɪˈnef.ə.bəl/", type: "adjective", definition: "Too great or extreme to be expressed or described in words.", example: "The ineffable beauty of the sunrise left us all speechless." },
    { word: "Petrichor", phonetics: "/ˈpet.rɪ.kɔːr/", type: "noun", definition: "A pleasant smell that frequently accompanies the first rain after a long period of warm, dry weather.", example: "The air was filled with the distinct scent of petrichor." },
    { word: "Luminous", phonetics: "/ˈluː.mə.nəs/", type: "adjective", definition: "Full of or shedding light; bright or shining, especially in the dark.", example: "The luminous dial of the clock glowed in the darkness." },
    { word: "Solitude", phonetics: "/ˈsɑː.lə.tuːd/", type: "noun", definition: "The state or situation of being alone.", example: "He enjoyed the peace and solitude of the woods." },
    { word: "Aurora", phonetics: "/ɔːˈrɔːr.ə/", type: "noun", definition: "A natural electrical phenomenon characterized by the appearance of streamers of reddish or greenish light in the sky.", example: "We traveled north to see the spectacular aurora borealis." },
    { word: "Quintessential", phonetics: "/ˌkwɪn.təˈsen.ʃəl/", type: "adjective", definition: "Representing the most perfect or typical example of a quality or class.", example: "She was the quintessential professional." },
    { word: "Vellichor", phonetics: "/ˈvel.ɪ.kɔːr/", type: "noun", definition: "The strange wistfulness of used bookstores.", example: "Walking into the dusty shop, I was overcome by a sense of vellichor." },
    { word: "Sonder", phonetics: "/ˈsɒn.də/", type: "noun", definition: "The realization that each random passerby is living a life as vivid and complex as your own.", example: "Struck by sonder, he watched the commuters pass by." },
    { word: "Halcyon", phonetics: "/ˈhæl.si.ən/", type: "adjective", definition: "Denoting a period of time in the past that was idyllically happy and peaceful.", example: "The halcyon days of the mid-1980s, when profits were soaring." },
    { word: "Ethereal", phonetics: "/iˈθɪr.i.əl/", type: "adjective", definition: "Extremely delicate and light in a way that seems too perfect for this world.", example: "Her ethereal beauty seemed almost ghostly in the moonlight." },
    { word: "Limerence", phonetics: "/ˈlɪm.ər.əns/", type: "noun", definition: "The state of being infatuated or obsessed with another person.", example: "His limerence for her made it impossible to concentrate on work." },
    { word: "Susurrus", phonetics: "/suːˈsʌr.əs/", type: "noun", definition: "Whispering, murmuring, or rustling.", example: "The soft susurrus of the wind in the trees." },
];

export default function WordOfTheDayWidget() {
  const [data, setData] = useState<typeof WORDS[0] | null>(null);

  useEffect(() => {
    // Pick a word based on the day of the month
    // This ensures everyone sees the same word on the same day
    const dayOfMonth = new Date().getDate();
    const index = dayOfMonth % WORDS.length;
    setData(WORDS[index]);
  }, []);

  if (!data) return null;

  return (
    <div className="bg-card text-card-foreground border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
        {/* Decorative background letter */}
        <div className="absolute -right-4 -bottom-8 text-[10rem] font-serif font-black text-muted/5 select-none pointer-events-none group-hover:text-accent/5 transition-colors duration-500">
            {data.word.charAt(0)}
        </div>

        <div className="flex items-center space-x-2 mb-4 relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Word of the Day</h3>
        </div>

        <div className="relative z-10">
            <div className="flex items-baseline flex-wrap gap-x-3 mb-2">
                <h4 className="text-3xl font-black font-serif text-foreground">{data.word}</h4>
                <span className="text-sm font-mono text-muted-foreground">{data.phonetics}</span>
            </div>
            
            <div className="mb-4">
                <span className="inline-block px-2 py-0.5 rounded-md bg-muted text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {data.type}
                </span>
            </div>

            <p className="text-sm font-serif leading-relaxed text-foreground/90 mb-4 border-l-2 border-accent pl-4">
                {data.definition}
            </p>

            <div className="bg-muted/30 p-4 rounded-xl italic text-sm text-muted-foreground font-serif">
                "{data.example}"
            </div>
        </div>
    </div>
  );
}
