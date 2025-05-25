import React, { useState } from 'react';

const Challenge1_LoginFormNoEmailValidation: React.FC = () => {
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(false);

  const check = () => {
    if (
      answer.toLowerCase().includes('email') &&
      (answer.includes('@') || answer.includes('walidacj'))
    ) setCorrect(true);
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-md max-w-md mx-auto my-8">
      <h2 className="font-display text-xl text-neon mb-4">Zadanie 1: Walidacja e-mail</h2>
      <form className="space-y-4" onSubmit={e => { e.preventDefault(); check(); }}>
        <input className="w-full px-4 py-2 rounded bg-dark2 border border-border text-white" placeholder="Email" />
        <input className="w-full px-4 py-2 rounded bg-dark2 border border-border text-white" placeholder="Hasło" type="password" />
        <button className="w-full py-2 bg-neon text-dark font-bold rounded shadow-neon">Zaloguj</button>
      </form>
      <div className="mt-6">
        <label className="block mb-2 text-gray-400">Opisz błąd w polu email:</label>
        <input
          className="w-full px-4 py-2 rounded bg-dark2 border border-border text-white"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          disabled={correct}
        />
        {correct && (
          <div className="mt-4 text-success font-mono">flag&#123;testerska-flaga-1&#125; ✔️</div>
        )}
      </div>
    </div>
  );
};

export default Challenge1_LoginFormNoEmailValidation; 