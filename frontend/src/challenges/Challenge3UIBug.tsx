import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'UI-BUG-FOUND';
const CHALLENGE_ID = 'ui-bug';
const CHALLENGE_POINTS = 35;

const Challenge3UIBug: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHiddenButton, setShowHiddenButton] = useState(false);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setFlagInput('');
      setFeedback('');
      setShowHiddenButton(false);
    }
  }, [isRetakeMode]);

  // Simulate a UI bug - double click reveals hidden button
  const handleDoubleClick = () => {
    if (!effectiveCompleted) {
      setShowHiddenButton(true);
    }
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
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-xl mx-auto mt-8 ${
      effectiveCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        UI Bug Challenge
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        There's a UI bug in this interface. Find it and exploit it to reveal the hidden functionality.
        Try interacting with different elements in unexpected ways.
      </p>
      
      <div className="mb-4 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Sample Application</h3>
        <p className="text-gray-300 mb-4">This is a normal application interface...</p>
        
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
          onDoubleClick={handleDoubleClick}
          disabled={effectiveCompleted}
        >
          Normal Button
        </button>
        
        <button 
          className="bg-gray-500 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed"
          disabled
        >
          Disabled Button
        </button>
        
        {showHiddenButton && (
          <div className="mt-4 p-3 bg-red-900 border border-red-500 rounded">
            <p className="text-red-300 mb-2">🐛 Hidden functionality revealed!</p>
            <p className="text-white font-mono text-sm">Flag: {FLAG}</p>
          </div>
        )}
      </div>

      {(showHiddenButton || effectiveCompleted) && (
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

      {!showHiddenButton && !effectiveCompleted && (
        <div className="mt-4 text-sm text-gray-400">
          💡 Hint: Try different mouse interactions with the buttons...
        </div>
      )}
    </div>
  );
};

export default Challenge3UIBug; 