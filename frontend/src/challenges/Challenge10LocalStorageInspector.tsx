import React, { useEffect, useState } from 'react';

const FLAG = 'FLAG-PREMIUM-UNLOCKED';

const Challenge10LocalStorageInspector: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [premium, setPremium] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [flagFeedback, setFlagFeedback] = useState('');

  useEffect(() => {
    const isPremium = localStorage.getItem('premium') === 'true';
    setPremium(isPremium);
  }, []);

  const handleFlagCheck = () => {
    if (flagInput.trim() === FLAG) {
      setFlagFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 10: true }));
    } else {
      setFlagFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-green-400">LocalStorage Inspector (Premium Access)</h2>
      <p className="text-gray-300 mb-6">
        Premium access is currently <span className={`font-bold ${premium ? 'text-green-400' : 'text-red-400'}`}>{premium ? 'ENABLED' : 'DISABLED'}</span>.<br />
        Use DevTools to set <span className="bg-gray-700 px-2 py-1 rounded font-mono">premium = true</span> in LocalStorage, then refresh the page to unlock the flag.
      </p>
      {premium && (
        <div className="mt-4">
          <div className="mb-2 p-3 bg-gray-900 border border-green-500 rounded-lg text-green-400 font-mono text-lg text-center select-all">{FLAG}</div>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            placeholder="Enter the flag..."
            value={flagInput}
            onChange={e => setFlagInput(e.target.value)}
          />
          <button className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={handleFlagCheck}>Check Flag</button>
          <div className={`min-h-[24px] text-sm ${flagFeedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{flagFeedback}</div>
        </div>
      )}
    </div>
  );
};

export default Challenge10LocalStorageInspector; 