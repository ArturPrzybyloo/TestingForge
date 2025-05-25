import React, { useState } from 'react';

const Challenge3_InconsistentButtons: React.FC = () => {
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(false);

  const check = () => {
    if (
      answer.toLowerCase().includes('niespój') ||
      answer.toLowerCase().includes('wygląd') ||
      answer.toLowerCase().includes('różn')
    ) setCorrect(true);
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-md max-w-md mx-auto my-8">
      <h2 className="font-display text-xl text-neon mb-4">Zadanie 3: Niespójne przyciski</h2>
      <div className="flex gap-4 mb-4">
        <button className="px-6 py-2 bg-neon text-dark font-bold rounded shadow-neon">Zatwierdź</button>
        <button className="px-6 py-2 bg-accent2 text-dark font-bold rounded border-2 border-accent2">OK</button>
      </div>
      <div>
        <label className="block mb-2 text-gray-400">Opisz problem z przyciskami:</label>
        <input
          className="w-full px-4 py-2 rounded bg-dark2 border border-border text-white"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          disabled={correct}
        />
        {correct && (
          <div className="mt-4 text-success font-mono">flag&#123;testerska-flaga-3&#125; ✔️</div>
        )}
      </div>
    </div>
  );
};

export default Challenge3_InconsistentButtons; 