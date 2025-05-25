import React, { useState } from 'react';

const FLAG = 'FLAG-DOM-FIXED';

const Challenge11BrokenDOM: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [flagFeedback, setFlagFeedback] = useState('');

  // The input is disabled and hidden by default
  // User must fix the DOM in DevTools to enable and show it
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) setSubmitted(true);
  };

  const handleFlagCheck = () => {
    if (flagInput.trim() === FLAG) {
      setFlagFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 11: true }));
    } else {
      setFlagFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-blue-400">Broken DOM (Fix the Registration Form)</h2>
      <p className="text-gray-300 mb-6">
        The registration form below is broken. The username input is disabled and hidden. Use DevTools to fix the DOM, then submit the form to reveal the flag.
      </p>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label className="block text-gray-400 mb-1">Username</label>
          <input
            className="w-full p-2 rounded bg-gray-700 text-white hidden"
            value={username}
            onChange={e => setUsername(e.target.value)}
            disabled
            placeholder="Enter your username..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium shadow mt-2"
        >
          Register
        </button>
      </form>
      {submitted && (
        <div className="mt-4">
          <div className="mb-2 p-3 bg-gray-900 border border-green-500 rounded-lg text-green-400 font-mono text-lg text-center select-all">{FLAG}</div>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            placeholder="Enter the flag..."
            value={flagInput}
            onChange={e => setFlagInput(e.target.value)}
          />
          <button className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={handleFlagCheck}>Check Flag</button>
          <div className={`min-h-[24px] text-sm ${flagFeedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{flagFeedback}</div>
        </div>
      )}
    </div>
  );
};

export default Challenge11BrokenDOM; 