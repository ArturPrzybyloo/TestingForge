import React, { useState } from 'react';

const Challenge6_WrongOkOnError: React.FC = () => {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const check = () => {
    if (
      answer.toLowerCase().includes('błąd') ||
      answer.toLowerCase().includes('komunikat') ||
      answer.toLowerCase().includes('ok')
    ) setCorrect(true);
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-md max-w-md mx-auto my-8">
      <h2 className="font-display text-xl text-neon mb-4">Zadanie 6: Zły komunikat po błędzie</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="w-full px-4 py-2 rounded bg-dark2 border border-border text-white"
          placeholder="Wpisz coś (lub zostaw puste)"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="w-full py-2 bg-accent text-dark font-bold rounded shadow-accent mt-2">Wyślij</button>
      </form>
      {submitted && !input && (
        <div className="mb-4 text-neonBlue">OK</div>
      )}
      <div>
        <label className="block mb-2 text-gray-400">Opisz problem z komunikatem:</label>
        <input
          className="w-full px-4 py-2 rounded bg-dark2 border border-border text-white"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          disabled={correct}
        />
        {correct && (
          <div className="mt-4 text-success font-mono">flag&#123;testerska-flaga-6&#125; ✔️</div>
        )}
      </div>
    </div>
  );
};

export default Challenge6_WrongOkOnError; 