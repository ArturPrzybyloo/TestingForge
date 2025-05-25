import React, { useState } from 'react';

const Challenge2_ButtonNoAction: React.FC = () => {
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(false);

  const check = () => {
    if (
      answer.toLowerCase().includes('brak') &&
      (answer.toLowerCase().includes('akcj') || answer.toLowerCase().includes('reakcj'))
    ) setCorrect(true);
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-md max-w-md mx-auto my-8">
      <h2 className="font-display text-xl text-neon mb-4">Zadanie 2: Przycisk bez akcji</h2>
      <button className="w-full py-2 bg-neonBlue text-dark font-bold rounded shadow-neonBlue mb-4">Wyślij</button>
      <div>
        <label className="block mb-2 text-gray-400">Opisz problem z przyciskiem:</label>
        <input
          className="w-full px-4 py-2 rounded bg-dark2 border border-border text-white"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          disabled={correct}
        />
        {correct && (
          <div className="mt-4 text-success font-mono">flag&#123;testerska-flaga-2&#125; ✔️</div>
        )}
      </div>
    </div>
  );
};

export default Challenge2_ButtonNoAction; 