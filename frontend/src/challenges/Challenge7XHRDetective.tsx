import React, { useState } from 'react';

const FLAG = 'TOKEN-SECRET-987654';

const Challenge7XHRDetective: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleFetch = () => {
    setLoading(true);
    // Simulate XHR with fetch and custom header
    fetch('/api/fake-user', {
      headers: {
        'Authorization': FLAG,
      },
    })
      .then(() => setTimeout(() => setLoading(false), 1200));
  };

  const handleFlagCheck = () => {
    if (flagInput.trim() === FLAG) {
      setFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 7: true }));
    } else {
      setFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-blue-400">XHR Detective (API Call Inspection)</h2>
      <p className="text-gray-300 mb-6">
        Click the button below to trigger a simulated API request. Open DevTools (Network tab), inspect the request headers, and find the Authorization token. Enter the token as the flag below.
      </p>
      <button
        className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors text-lg"
        onClick={handleFetch}
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Fetch User Data'}
      </button>
      <button className="text-sm text-blue-300 underline mb-4" onClick={() => setShowHint(h => !h)}>
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
      />
      <button className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={handleFlagCheck}>Check Flag</button>
      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : feedback ? 'text-red-400' : ''}`}>{feedback}</div>
    </div>
  );
};

export default Challenge7XHRDetective; 