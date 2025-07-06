import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'FLAG_A11Y_TAB_321';
const BROKEN_ID = 'btn-broken';
const CHALLENGE_ID = 'accessibility-audit';
const CHALLENGE_POINTS = 40;

const Challenge18AccessibilityAudit: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [brokenIdInput, setBrokenIdInput] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [idFeedback, setIdFeedback] = useState('');
  
  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setBrokenIdInput('');
      setFlagInput('');
      setFeedback('');
      setUnlocked(false);
      setIdFeedback('');
    }
  }, [isRetakeMode]);

  const checkId = () => {
    if (effectiveCompleted) return;
    
    if (brokenIdInput.trim() === BROKEN_ID) {
      setUnlocked(true);
      setIdFeedback('Correct! Now enter the flag.');
    } else {
      setIdFeedback('Incorrect id. Try again.');
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
        Accessibility Audit
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        Use <b>TAB</b> to navigate through the interactive elements below. One of them cannot be focused using TAB (it is broken for keyboard users).<br />
        Enter the <b>id</b> of the broken element to unlock the flag field.
      </p>
      <div className="flex flex-col gap-3 mb-6">
        <button id="btn1" className="px-4 py-2 rounded bg-blue-500 text-white">Button 1</button>
        <a id="link1" href="#" className="text-blue-300 underline">Link 1</a>
        <input id="input1" className="p-2 rounded bg-gray-700 text-white" placeholder="Input 1" />
        <button id="btn2" className="px-4 py-2 rounded bg-green-500 text-white">Button 2</button>
        <button id="btn-broken" className="px-4 py-2 rounded bg-green-500 text-white" tabIndex={-1}>Button 3</button>
        <a id="link2" href="#" className="text-blue-300 underline">Link 2</a>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 text-white mb-2"
          placeholder="Enter the id of the broken element..."
          value={brokenIdInput}
          onChange={e => setBrokenIdInput(e.target.value)}
          disabled={unlocked || effectiveCompleted}
        />
        <button 
          className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50" 
          onClick={checkId} 
          disabled={unlocked || effectiveCompleted}
        >
          Check id
        </button>
        <div className={`min-h-[24px] text-sm ${idFeedback.includes('Correct') ? 'text-green-400' : 'text-red-400'}`}>
          {idFeedback}
        </div>
      </div>
      {(unlocked || effectiveCompleted) && (
        <div className="mb-4">
          <div className="mb-2 text-green-300 font-mono text-lg select-all">{FLAG}</div>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            placeholder="Enter the flag..."
            value={flagInput}
            onChange={e => setFlagInput(e.target.value)}
            disabled={effectiveCompleted}
          />
          <button 
            className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50" 
            onClick={checkFlag}
            disabled={isSubmitting || effectiveCompleted}
          >
            {isSubmitting ? 'Submitting...' : effectiveCompleted ? 'Completed' : 'Check Flag'}
          </button>
          <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>
            {feedback}
          </div>
        </div>
      )}
      <div className="text-sm text-gray-400 mt-4">(Tip: Use TAB and Shift+TAB to move focus. Try to focus each element.)</div>
    </div>
  );
};

export default Challenge18AccessibilityAudit; 