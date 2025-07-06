import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'FLAG-COOKIE-ADMIN';
const COOKIE_NAME = 'forge_admin';
const COOKIE_VALUE = 'letmein';
const CHALLENGE_ID = 'cookie-hacker';
const CHALLENGE_POINTS = 50;

const Challenge9CookieHacker: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [showFlag, setShowFlag] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [flagFeedback, setFlagFeedback] = useState('');
  const [feedback, setFeedback] = useState('');

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setShowFlag(false);
      setFlagInput('');
      setFlagFeedback('');
      setFeedback('');
      // Clear the cookie when in retake mode
      document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }, [isRetakeMode]);

  const checkCookie = () => {
    if (effectiveCompleted) return;
    
    const cookies = document.cookie.split(';').map(c => c.trim());
    const found = cookies.find(c => c.startsWith(`${COOKIE_NAME}=`));
    if (found && found.split('=')[1] === COOKIE_VALUE) {
      setShowFlag(true);
      setFeedback('Admin access granted!');
    } else {
      setFeedback('Access denied. Set the correct cookie in DevTools.');
    }
  };

  const handleFlagCheck = async () => {
    if (flagInput.trim() === FLAG) {
      const result = await submitFlag(CHALLENGE_ID, FLAG, CHALLENGE_POINTS);
      if (result.success) {
        setFlagFeedback(`Challenge passed! 🎉 (+${result.pointsEarned} pts)`);
        if (onComplete) onComplete();
      } else {
        setFlagFeedback(`Error: ${result.message}`);
      }
    } else {
      setFlagFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-xl mx-auto mt-8 shadow-lg ${
      effectiveCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        Cookie Hacker (Cookie Manipulation)
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-6">
        Set a cookie named <span className="bg-gray-700 px-2 py-1 rounded font-mono">{COOKIE_NAME}</span> with value <span className="bg-gray-700 px-2 py-1 rounded font-mono">{COOKIE_VALUE}</span> in DevTools. Then click the button below to check access and reveal the flag.
      </p>
      <button
        className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors text-lg disabled:opacity-50"
        onClick={checkCookie}
        disabled={effectiveCompleted}
      >
        Check Access
      </button>
      <div className={`min-h-[24px] text-sm mb-4 ${feedback.includes('granted') ? 'text-green-400' : feedback ? 'text-red-400' : ''}`}>{feedback}</div>
      {(showFlag || effectiveCompleted) && (
        <div className="mt-4">
          <div className="mb-2 p-3 bg-gray-900 border border-green-500 rounded-lg text-green-400 font-mono text-lg text-center select-all">{FLAG}</div>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            placeholder="Enter the flag..."
            value={flagInput}
            onChange={e => setFlagInput(e.target.value)}
            disabled={effectiveCompleted}
          />
          <button 
            className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50" 
            onClick={handleFlagCheck}
            disabled={isSubmitting || effectiveCompleted}
          >
            {isSubmitting ? 'Submitting...' : effectiveCompleted ? 'Completed' : 'Check Flag'}
          </button>
          <div className={`min-h-[24px] text-sm ${flagFeedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{flagFeedback}</div>
        </div>
      )}
    </div>
  );
};

export default Challenge9CookieHacker; 