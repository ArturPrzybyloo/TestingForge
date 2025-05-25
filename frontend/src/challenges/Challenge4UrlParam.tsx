import React, { useState, useEffect } from 'react';

const FLAG = 'URL-FLAG-777';

const Challenge4UrlParam: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [showFlag, setShowFlag] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('flag') === 'true') setShowFlag(true);
  }, [window.location.search]);

  const checkFlag = () => {
    if (flagInput.trim() === FLAG) {
      setFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 4: true }));
    } else {
      setFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 text-blue-400">Hidden Parameter (URL Parameter Test)</h2>
      <p className="text-gray-300 mb-4">Add <span className="bg-gray-700 px-2 py-1 rounded">?flag=true</span> to the page URL to reveal the flag.</p>
      {showFlag && (
        <div className="mt-4">
          <div className="mb-2">Flag: <span className="bg-blue-700 px-2 py-1 rounded text-white font-mono">{FLAG}</span></div>
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
      )}
      {!showFlag && <div className="text-gray-400 mt-4">Add the parameter to the URL and refresh the page.</div>}
    </div>
  );
};

export default Challenge4UrlParam; 