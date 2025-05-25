import React, { useState } from 'react';

const Challenge5_CaseInsensitiveSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(false);

  const data = ['Test', 'Demo', 'QA'];

  const search = (q: string) => {
    setQuery(q);
    setResult(data.find(item => item.toLowerCase() === q.toLowerCase()) ? 'Znaleziono!' : 'Brak wyników');
  };

  const check = () => {
    if (
      answer.toLowerCase().includes('wielkość') ||
      answer.toLowerCase().includes('case') ||
      answer.toLowerCase().includes('brak rozróżnienia')
    ) setCorrect(true);
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-md max-w-md mx-auto my-8">
      <h2 className="font-display text-xl text-neon mb-4">Zadanie 5: Wyszukiwarka bez rozróżnienia wielkości liter</h2>
      <input
        className="w-full px-4 py-2 rounded bg-dark2 border border-border text-white mb-2"
        placeholder="Szukaj (np. test, TEST)"
        value={query}
        onChange={e => search(e.target.value)}
      />
      <div className="mb-4 text-accent2">{result}</div>
      <div>
        <label className="block mb-2 text-gray-400">Opisz problem z wyszukiwarką:</label>
        <input
          className="w-full px-4 py-2 rounded bg-dark2 border border-border text-white"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          disabled={correct}
        />
        {correct && (
          <div className="mt-4 text-success font-mono">flag&#123;testerska-flaga-5&#125; ✔️</div>
        )}
      </div>
    </div>
  );
};

export default Challenge5_CaseInsensitiveSearch; 