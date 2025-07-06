import React, { useRef, useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'FLAG-CSS-UNBLOCKED';
const CHALLENGE_ID = 'css-debugger';
const CHALLENGE_POINTS = 30;

const Challenge8CSSDebugger: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [showFlag, setShowFlag] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [flagFeedback, setFlagFeedback] = useState('');
  const btnRef = useRef<HTMLButtonElement>(null);

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
    }
  }, [isRetakeMode]);

  // The button is unclickable due to pointer-events: none
  // User must remove this style in DevTools to click it
  const handleClick = () => {
    if (!effectiveCompleted) {
      setShowFlag(true);
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
      <h2 className="text-2xl font-bold mb-2 text-green-400">
        CSS Debugger (Style Investigation)
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-6">
        The button below is visible but not clickable due to a CSS bug. Use DevTools to find and fix the style that blocks interaction. Once fixed, click the button to reveal the flag.
      </p>
      <button
        ref={btnRef}
        style={{ 
          pointerEvents: effectiveCompleted ? 'auto' : 'none', 
          background: '#3B82F6', 
          color: '#fff', 
          borderRadius: 8, 
          padding: '12px 0', 
          width: '100%', 
          fontWeight: 600, 
          fontSize: '1.1rem', 
          marginBottom: 24, 
          boxShadow: '0 2px 8px #0002' 
        }}
        onClick={handleClick}
      >
        Unblock Me
      </button>
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
            className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50" 
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

export default Challenge8CSSDebugger; 