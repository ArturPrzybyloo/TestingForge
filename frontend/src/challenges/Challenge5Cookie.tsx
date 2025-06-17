import React, { useState, useEffect } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'COOKIE-MONSTER';
const CHALLENGE_ID = 'cookie-challenge';
const CHALLENGE_POINTS = 30;

const Challenge5Cookie: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [showFlag, setShowFlag] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [cookieValue, setCookieValue] = useState('');

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  useEffect(() => {
    // Check if the secret cookie exists
    const checkCookie = () => {
      const cookies = document.cookie.split(';');
      const secretCookie = cookies.find(cookie => 
        cookie.trim().startsWith('secret=')
      );
      
      if (secretCookie) {
        const value = secretCookie.split('=')[1];
        setCookieValue(value);
        if (value === 'admin_access') {
          setShowFlag(true);
        }
      }
    };

    checkCookie();
    // Check periodically for cookie changes
    const interval = setInterval(checkCookie, 1000);
    return () => clearInterval(interval);
  }, []);

  const setCookie = () => {
    document.cookie = "secret=admin_access; path=/";
    setShowFlag(true);
  };

  const checkFlag = async () => {
    if (flagInput.trim() === FLAG) {
      const result = await submitFlag(CHALLENGE_ID, FLAG, CHALLENGE_POINTS);
      if (result.success) {
        setFeedback(`Challenge passed! 🎉 (+${result.pointsEarned} pts)`);
        if (onComplete) onComplete();
      } else {
        setFeedback(`Error: ${result.message}`);
      }
    } else {
      setFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-2xl mx-auto mt-8 ${
      challengeCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        Cookie Challenge
        {challengeCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        Manipulate browser cookies to access restricted content. Set the correct cookie to reveal the flag.
      </p>
      
      <div className="mb-4 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Current Cookies:</h3>
        <div className="bg-gray-600 p-2 rounded font-mono text-sm text-green-400">
          {document.cookie || 'No cookies set'}
        </div>
      </div>

      <div className="mb-4 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Instructions:</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Set a cookie named "secret" with the value "admin_access"</li>
          <li>• Use browser developer tools (F12 → Console)</li>
          <li>• Or use the button below to set it automatically</li>
        </ul>
        
        <button 
          onClick={setCookie}
          className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
          disabled={challengeCompleted || showFlag}
        >
          {showFlag ? 'Cookie Set!' : 'Set Secret Cookie'}
        </button>
      </div>

      {cookieValue && (
        <div className="mb-4 p-4 bg-blue-900 border border-blue-500 rounded-lg">
          <h3 className="text-blue-400 font-semibold mb-2">Cookie Detected:</h3>
          <p className="text-white font-mono">secret = {cookieValue}</p>
        </div>
      )}

      {showFlag && (
        <div className="mb-4 p-4 bg-green-900 border border-green-500 rounded-lg">
          <h3 className="text-green-400 font-semibold mb-2">🎉 Access Granted!</h3>
          <p className="text-white font-mono">Flag: {FLAG}</p>
        </div>
      )}

      {(showFlag || challengeCompleted) && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter the flag..."
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            disabled={challengeCompleted}
          />
          <button 
            onClick={checkFlag}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50"
            disabled={isSubmitting || challengeCompleted}
          >
            {isSubmitting ? 'Submitting...' : challengeCompleted ? 'Completed' : 'Submit Flag'}
          </button>
        </div>
      )}

      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>
        {feedback}
      </div>

      {!showFlag && !challengeCompleted && (
        <div className="mt-4 text-sm text-gray-400">
          💡 Hint: Open Developer Tools → Console and use: document.cookie = "secret=admin_access"
        </div>
      )}
    </div>
  );
};

export default Challenge5Cookie; 