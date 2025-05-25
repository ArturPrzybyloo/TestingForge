import React, { useState, useEffect } from 'react';

const FLAG = 'COOKIE-TEST-555';

const Challenge5Cookie: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    document.cookie = `forge_flag5=${FLAG}; path=/;`;
  }, []);

  const checkFlag = () => {
    if (flagInput.trim() === FLAG) {
      setFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 5: true }));
    } else {
      setFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 text-green-400">Cookie Inspector (Browser Cookies)</h2>
      <p className="text-gray-300 mb-4">Hint: The flag is hidden in your browser cookies (name: <span className="bg-gray-700 px-2 py-1 rounded">forge_flag5</span>).</p>
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-700 text-white mb-2"
        placeholder="Enter the flag..."
        value={flagInput}
        onChange={e => setFlagInput(e.target.value)}
      />
      <button className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={checkFlag}>Check Flag</button>
      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{feedback}</div>
    </div>
  );
};

export default Challenge5Cookie; 