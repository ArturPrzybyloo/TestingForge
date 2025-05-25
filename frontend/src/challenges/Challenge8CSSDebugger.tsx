import React, { useRef, useState } from 'react';

const FLAG = 'FLAG-CSS-UNBLOCKED';

const Challenge8CSSDebugger: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [showFlag, setShowFlag] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [flagFeedback, setFlagFeedback] = useState('');
  const btnRef = useRef<HTMLButtonElement>(null);

  // The button is unclickable due to pointer-events: none
  // User must remove this style in DevTools to click it
  const handleClick = () => setShowFlag(true);

  const handleFlagCheck = () => {
    if (flagInput.trim() === FLAG) {
      setFlagFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 8: true }));
    } else {
      setFlagFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-green-400">CSS Debugger (Style Investigation)</h2>
      <p className="text-gray-300 mb-6">
        The button below is visible but not clickable due to a CSS bug. Use DevTools to find and fix the style that blocks interaction. Once fixed, click the button to reveal the flag.
      </p>
      <button
        ref={btnRef}
        style={{ pointerEvents: 'none', background: '#3B82F6', color: '#fff', borderRadius: 8, padding: '12px 0', width: '100%', fontWeight: 600, fontSize: '1.1rem', marginBottom: 24, boxShadow: '0 2px 8px #0002' }}
        onClick={handleClick}
      >
        Unblock Me
      </button>
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
          <button className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={handleFlagCheck}>Check Flag</button>
          <div className={`min-h-[24px] text-sm ${flagFeedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{flagFeedback}</div>
        </div>
      )}
    </div>
  );
};

export default Challenge8CSSDebugger; 