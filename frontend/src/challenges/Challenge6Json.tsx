import React, { useState } from 'react';

const FLAG = 'FLAG-CHAIN-API-2025';

const apiChain = [
  {
    label: 'GET /user',
    path: '/user',
    json: { id: 42, username: 'qa_tester', next: '/user/42' },
  },
  {
    label: 'GET /user/42',
    path: '/user/42',
    json: { id: 42, profile: '/user/42/profile', secret: '/user/42/secret' },
  },
  {
    label: 'GET /user/42/profile',
    path: '/user/42/profile',
    json: { id: 42, name: 'QA Tester', status: 'active' },
  },
  {
    label: 'GET /user/42/secret',
    path: '/user/42/secret',
    json: { status: 'success', secretKey: FLAG },
  },
];

const Challenge6Json: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [history, setHistory] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleApiClick = (idx: number) => {
    setCurrentIdx(idx);
    setHistory(prev => {
      const newPath = apiChain[idx].path;
      // Only add if not already last
      if (prev[prev.length - 1] !== newPath) {
        return [...prev, newPath];
      }
      return prev;
    });
    setFeedback('');
  };

  const handleFlagCheck = () => {
    if (flagInput.trim() === FLAG) {
      setFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 6: true }));
    } else {
      setFeedback('Incorrect flag, try again. ❌');
    }
  };

  // Breadcrumb
  const breadcrumb = history.length > 0 ? history.join(' → ') : '/';

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-blue-400">JSON Explorer: Trace the API Chain</h2>
      <p className="text-gray-300 mb-6">
        Click through the correct sequence of simulated API calls to reveal the flag hidden in the final JSON response.
      </p>
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-blue-300 font-mono">
        <span className="font-semibold">Path:</span> {breadcrumb}
      </div>
      {/* API Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {apiChain.map((api, idx) => (
          <button
            key={api.path}
            className={`px-4 py-2 rounded-lg font-mono font-semibold shadow transition-colors text-base focus:outline-none focus:ring-2 focus:ring-blue-400 ${currentIdx === idx ? 'bg-blue-500 text-white' : 'bg-gray-700 text-blue-300 hover:bg-blue-600 hover:text-white'}`}
            onClick={() => handleApiClick(idx)}
            disabled={currentIdx !== null && idx < currentIdx}
            tabIndex={0}
          >
            {api.label}
          </button>
        ))}
      </div>
      {/* JSON Display */}
      <div className="mb-6">
        <pre className="bg-gray-900 text-blue-200 rounded p-4 text-sm overflow-x-auto min-h-[64px] border border-gray-700 transition-all duration-300">
          <code>
            {currentIdx !== null ? JSON.stringify(apiChain[currentIdx].json, null, 2) : '// Click an API button to view the response'}
          </code>
        </pre>
      </div>
      {/* Flag Entry */}
      <div className="mb-2">
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 text-white mb-2 font-mono"
          placeholder="Enter the flag..."
          value={flagInput}
          onChange={e => setFlagInput(e.target.value)}
        />
        <button className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={handleFlagCheck}>Check Flag</button>
        <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : feedback ? 'text-red-400' : ''}`}>{feedback}</div>
      </div>
    </div>
  );
};

export default Challenge6Json; 