import React, { useState, useEffect } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'COOKIE-BASE64-DECODED';
const ENCODED_FLAG = btoa(FLAG); // Base64 encoded flag
const CHALLENGE_ID = 'cookie-challenge';
const CHALLENGE_POINTS = 30;

const Challenge5CookieSimple: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentCookies, setCurrentCookies] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setFlagInput('');
      setFeedback('');
      setCurrentCookies('');
      setLoginAttempts(0);
      setSessionActive(false);
      // Clear the challenge cookies when in retake mode
      document.cookie = "user_session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = "session_data=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = "user_prefs=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
  }, [isRetakeMode]);

  // Check cookies periodically
  useEffect(() => {
    const checkCookies = () => {
      const cookies = document.cookie;
      setCurrentCookies(cookies);
      
      // Check if session is active
      if (cookies.includes('user_session=')) {
        setSessionActive(true);
      }
    };

    checkCookies();
    const interval = setInterval(checkCookies, 1000);
    return () => clearInterval(interval);
  }, []);

  const loginAsUser = () => {
    const sessionId = 'sess_' + Math.random().toString(36).substring(7);
    const userData = 'eyJ1c2VybmFtZSI6Imd1ZXN0IiwidHlwZSI6InVzZXIifQ=='; // Base64: {"username":"guest","type":"user"}
    const userPrefs = 'eyJsYW5nIjoiZW4iLCJ0aGVtZSI6ImRhcmsifQ=='; // Base64: {"lang":"en","theme":"dark"}
    
    // Set multiple cookies including the encoded flag
    document.cookie = `user_session=${sessionId}; path=/`;
    document.cookie = `session_data=${userData}; path=/`;
    document.cookie = `user_prefs=${userPrefs}; path=/`;
    document.cookie = `auth_token=${ENCODED_FLAG}; path=/`; // The encoded flag is hidden here
    
    setLoginAttempts(prev => prev + 1);
    setSessionActive(true);
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
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-3xl mx-auto mt-8 ${
      effectiveCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        Cookie Inspector Challenge
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        This website stores user session data in cookies. Some of the data might be encoded. 
        Your task is to inspect the cookies and decode any encoded information to find the flag.
        <span className="text-blue-400 font-bold"> ({CHALLENGE_POINTS} points)</span>
      </p>
      
      {/* Mock Login System */}
      <div className="mb-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">🔐 User Portal</h3>
        <div className="flex items-center gap-4">
          <button 
            onClick={loginAsUser}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={effectiveCompleted}
          >
            {sessionActive ? 'Refresh Session' : 'Start Session'}
          </button>
          <div className="text-sm text-gray-400">
            {loginAttempts > 0 && sessionActive && (
              <span className="text-green-400">✓ Session Active</span>
            )}
          </div>
        </div>
      </div>

      {/* Cookie Display */}
      <div className="mb-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Current Session Cookies:</h3>
        <div className="bg-gray-600 p-3 rounded font-mono text-sm text-green-400 break-all">
          {currentCookies || 'No cookies set'}
        </div>
        <div className="mt-2 text-sm text-gray-400">
          💡 Use browser Developer Tools to inspect cookies more clearly
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-6 p-4 bg-blue-900 border border-blue-500 rounded-lg">
        <h3 className="text-blue-400 font-semibold mb-3">Instructions:</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Click "Start Session" to initialize user session</li>
          <li>• Open Developer Tools (F12) → Application → Cookies</li>
          <li>• Inspect all cookie values - some may contain encoded data</li>
          <li>• Look for Base64 encoded values and decode them</li>
          <li>• Find the flag and enter it below</li>
        </ul>
      </div>

      {/* Hints */}
      {sessionActive && (
        <div className="mb-6 p-4 bg-yellow-900 border border-yellow-500 rounded-lg">
          <h3 className="text-yellow-400 font-semibold mb-3">💡 Hints:</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Multiple cookies are set during session initialization</li>
            <li>• Some cookie values look like random strings - they might be encoded</li>
            <li>• Base64 encoded strings often end with = or == padding</li>
            <li>• Try decoding suspicious-looking cookie values</li>
            <li>• Use online Base64 decoder or browser console: atob("encodedString")</li>
          </ul>
        </div>
      )}

      {/* Flag Submission */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter the decoded flag..."
          value={flagInput}
          onChange={(e) => setFlagInput(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white mb-2"
          disabled={effectiveCompleted}
        />
        <button 
          onClick={checkFlag}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50"
          disabled={isSubmitting || effectiveCompleted}
        >
          {isSubmitting ? 'Submitting...' : effectiveCompleted ? 'Completed' : 'Submit Flag'}
        </button>
      </div>

      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>
        {feedback}
      </div>

      {!sessionActive && (
        <div className="mt-4 text-sm text-gray-400">
          💡 Start by initializing a session to set cookies, then inspect them for encoded data
        </div>
      )}
    </div>
  );
};

export default Challenge5CookieSimple; 