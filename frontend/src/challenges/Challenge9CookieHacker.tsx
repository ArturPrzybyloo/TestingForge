import React, { useState } from 'react';

const FLAG = 'FLAG-COOKIE-ADMIN';
const COOKIE_NAME = 'forge_admin';
const COOKIE_VALUE = 'letmein';

const Challenge9CookieHacker: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [showFlag, setShowFlag] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [flagFeedback, setFlagFeedback] = useState('');
  const [feedback, setFeedback] = useState('');

  const checkCookie = () => {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const found = cookies.find(c => c.startsWith(`${COOKIE_NAME}=`));
    if (found && found.split('=')[1] === COOKIE_VALUE) {
      setShowFlag(true);
      setFeedback('Admin access granted!');
    } else {
      setFeedback('Access denied. Set the correct cookie in DevTools.');
    }
  };

  const handleFlagCheck = () => {
    if (flagInput.trim() === FLAG) {
      setFlagFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 9: true }));
    } else {
      setFlagFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-blue-400">Cookie Hacker (Cookie Manipulation)</h2>
      <p className="text-gray-300 mb-6">
        Set a cookie named <span className="bg-gray-700 px-2 py-1 rounded font-mono">{COOKIE_NAME}</span> with value <span className="bg-gray-700 px-2 py-1 rounded font-mono">{COOKIE_VALUE}</span> in DevTools. Then click the button below to check access and reveal the flag.
      </p>
      <button
        className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors text-lg"
        onClick={checkCookie}
      >
        Check Access
      </button>
      <div className={`min-h-[24px] text-sm mb-4 ${feedback.includes('granted') ? 'text-green-400' : feedback ? 'text-red-400' : ''}`}>{feedback}</div>
      {showFlag && (
        <div className="mt-4">
          <div className="mb-2 p-3 bg-gray-900 border border-green-500 rounded-lg text-green-400 font-mono text-lg text-center select-all">{FLAG}</div>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            placeholder="Enter the flag..."
            value={flagInput}
            onChange={e => setFlagInput(e.target.value)}
          />
          <button className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={handleFlagCheck}>Check Flag</button>
          <div className={`min-h-[24px] text-sm ${flagFeedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{flagFeedback}</div>
        </div>
      )}
    </div>
  );
};

export default Challenge9CookieHacker; 