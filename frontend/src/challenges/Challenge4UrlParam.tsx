import React, { useState, useEffect } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'URL-PARAM-MASTER';
const CHALLENGE_ID = 'url-param';
const CHALLENGE_POINTS = 25;

const Challenge4UrlParam: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFlag, setShowFlag] = useState(false);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setFlagInput('');
      setFeedback('');
      setShowFlag(false);
    }
  }, [isRetakeMode]);

  useEffect(() => {
    setCurrentUrl(window.location.href);
    
    // Check URL parameters for debug parameter
    // Handle both hash-based routing and regular query parameters
    const checkUrlParams = () => {
      // First try regular query parameters
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('debug') === 'true') {
        setShowFlag(true);
        return;
      }
      
      // Then try hash-based parameters (for HashRouter)
      const hash = window.location.hash;
      if (hash.includes('?')) {
        const hashParams = new URLSearchParams(hash.split('?')[1]);
        if (hashParams.get('debug') === 'true') {
          setShowFlag(true);
          return;
        }
      }
    };

    checkUrlParams();
    
    // Listen for URL changes to recheck parameters
    const handleLocationChange = () => {
      setCurrentUrl(window.location.href);
      checkUrlParams();
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

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
      effectiveCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        URL Parameter Challenge
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        This application might have hidden debug features accessible via URL parameters. Find the right parameter to unlock hidden content.
        <span className="text-blue-400 font-bold"> ({CHALLENGE_POINTS} points)</span>
      </p>
      
      <div className="mb-4 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Current URL:</h3>
        <div className="bg-gray-600 p-2 rounded font-mono text-sm text-green-400 break-all">
          {currentUrl}
        </div>
      </div>

      <div className="mb-4 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Testing Scenario:</h3>
        <p className="text-gray-300 text-sm mb-3">
          You're testing a web application and suspect it has debug or admin features accessible through URL parameters.
        </p>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Many applications use URL parameters for feature flags or debugging</li>
          <li>• Common parameter names include: admin, debug, test, dev, hidden, etc.</li>
          <li>• Values are often: true, 1, on, enabled, yes, etc.</li>
          <li>• Try adding parameters after ? in the URL (or after # for single-page apps)</li>
          <li>• Example format: <code className="bg-gray-600 px-1 rounded">?parameter=value</code></li>
        </ul>
      </div>

      {showFlag && (
        <div className="mb-4 p-4 bg-green-900 border border-green-500 rounded-lg">
          <h3 className="text-green-400 font-semibold mb-2">🎉 Debug Mode Activated!</h3>
          <p className="text-white mb-2">Great job! You found the hidden debug parameter.</p>
          <p className="text-white font-mono">Flag: {FLAG}</p>
        </div>
      )}

      {(showFlag || effectiveCompleted) && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter the flag..."
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
      )}

      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>
        {feedback}
      </div>

      {!showFlag && !effectiveCompleted && (
        <div className="mt-4 text-sm text-gray-400">
          💡 Pro tip: Think like a tester - what parameters might developers use for debugging or admin access?
        </div>
      )}
    </div>
  );
};

export default Challenge4UrlParam; 