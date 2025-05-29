import React, { useState } from 'react';

const FLAG = 'FLAG-DEVTOOLS-OUTLINE';

const Challenge13ElementHighlighter: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const checkFlag = () => {
    if (flagInput.trim() === FLAG) {
      setFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 13: true }));
    } else {
      setFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 text-blue-400">Element Highlighter</h2>
      <p className="text-gray-300 mb-4">In DevTools, open the Elements panel, find the <code>&lt;h1 id=\"main-title\"&gt;</code> and add style <code>outline: 3px solid red;</code>. The flag is in the <code>data-flag</code> attribute of this element.</p>
      <div className="mb-4">
        <h1 id="main-title" data-flag={FLAG} style={{marginBottom: 24}}>Welcome to Testing Forge!</h1>
        <p>Use DevTools to highlight the header and find the flag.</p>
      </div>
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-700 text-white mb-2"
        placeholder="Enter the flag..."
        value={flagInput}
        onChange={e => setFlagInput(e.target.value)}
      />
      <button className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={checkFlag}>Check Flag</button>
      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{feedback}</div>
    </div>
  );
};

export default Challenge13ElementHighlighter; 