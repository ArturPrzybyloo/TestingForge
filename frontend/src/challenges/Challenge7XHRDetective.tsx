import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'TOKEN-SECRET-987654';
const CHALLENGE_ID = 'xhr-detective';
const CHALLENGE_POINTS = 40;

const Challenge7XHRDetective: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [loading, setLoading] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setLoading(false);
      setFlagInput('');
      setFeedback('');
      setShowHint(false);
    }
  }, [isRetakeMode]);

  const handleFetch = () => {
    setLoading(true);
    // Simulate XHR with fetch and custom header
    // Use a non-existent endpoint on the same domain to avoid CORS issues
    // The 404 error is expected - the goal is to inspect the Authorization header
    fetch('./api/fake-user', {
      headers: {
        'Authorization': FLAG,
      },
    })
      .then(() => setTimeout(() => setLoading(false), 1200))
      .catch(() => setTimeout(() => setLoading(false), 1200)); // Handle 404 gracefully
  };

  const handleFlagCheck = async () => {
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
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-xl mx-auto mt-8 shadow-lg ${
      effectiveCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        XHR Detective (API Call Inspection)
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-6">
        Click the button below to trigger a simulated API request. Open DevTools (Network tab), inspect the request headers, and find the Authorization token. Enter the token as the flag below.
      </p>
      <button
        className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors text-lg disabled:opacity-50"
        onClick={handleFetch}
        disabled={loading || effectiveCompleted}
      >
        {loading ? 'Fetching...' : 'Fetch User Data'}
      </button>
      <button 
        className="text-sm text-blue-300 underline mb-4" 
        onClick={() => setShowHint(h => !h)}
        disabled={effectiveCompleted}
      >
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>
      {showHint && (
        <div className="mb-4 text-blue-200 bg-gray-700 rounded p-3 text-sm">Hint: Look for the <b>Authorization</b> header in the request details.</div>
      )}
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-700 text-white mb-2 font-mono"
        placeholder="Enter the flag (token)..."
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
      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : feedback ? 'text-red-400' : ''}`}>{feedback}</div>
    </div>
  );
};

export default Challenge7XHRDetective; 