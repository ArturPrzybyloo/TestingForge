import React, { useState } from 'react';

const Challenge4_TypoInMessage: React.FC = () => {
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(false);

  const check = () => {
    if (answer.toLowerCase().includes('eemail')) setCorrect(true);
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-md max-w-md mx-auto my-8">
      <h2 className="font-display text-xl text-neon mb-4">Zadanie 4: Literówka w komunikacie</h2>
      <div className="mb-4 text-accent">Adres eemail jest wymagany.</div>
      <div>
        <label className="block mb-2 text-gray-400">Wpisz tekst z literówką:</label>
        <input
          className="w-full px-4 py-2 rounded bg-dark2 border border-border text-white"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          disabled={correct}
        />
        {correct && (
          <div className="mt-4 text-success font-mono">flag&#123;testerska-flaga-4&#125; ✔️</div>
        )}
      </div>
    </div>
  );
};

export default Challenge4_TypoInMessage; 