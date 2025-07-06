import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'TEST-ORDER-123';
const CHALLENGE_ID = 'order-matters';
const CHALLENGE_POINTS = 20;

const CORRECT = [
  'Log in to the application',
  'Check the function works correctly',
  'Report a bug to the team',
  'Log out',
];
const INIT = [
  'Log out',
  'Report a bug to the team',
  'Log in to the application',
  'Check the function works correctly',
];

const Challenge2Order: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [steps, setSteps] = useState(INIT);
  const [dragged, setDragged] = useState<number | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [flagFeedback, setFlagFeedback] = useState('');

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  const onDragStart = (idx: number) => setDragged(idx);
  const onDragOver = (idx: number) => {
    if (dragged === null || dragged === idx) return;
    const newSteps = [...steps];
    const [removed] = newSteps.splice(dragged, 1);
    newSteps.splice(idx, 0, removed);
    setSteps(newSteps);
    setDragged(idx);
  };

  const checkOrder = () => {
    if (JSON.stringify(steps) === JSON.stringify(CORRECT)) {
      setFeedback('Correct order! Here is your flag.');
    } else {
      setFeedback('Incorrect order.');
    }
  };

  const checkFlag = async () => {
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
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-xl mx-auto mt-8 ${
      effectiveCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        Order Matters! (Drag & Drop Test Cases)
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">Arrange the test cases in the correct order (from 1 to 4).</p>
      <div className="space-y-2 mb-2">
        {steps.map((step, idx) => (
          <div
            key={step}
            draggable={!effectiveCompleted}
            onDragStart={() => onDragStart(idx)}
            onDragOver={() => onDragOver(idx)}
            className={`p-2 rounded bg-gray-700 text-white mb-1 border ${
              effectiveCompleted ? 'cursor-default border-green-500/50' : 
              dragged === idx ? 'cursor-move border-blue-400' : 'cursor-move border-gray-700'
            }`}
          >
            {step}
          </div>
        ))}
      </div>
      <button 
        className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50" 
        onClick={checkOrder}
        disabled={effectiveCompleted}
      >
        {effectiveCompleted ? 'Completed' : 'Check order'}
      </button>
      <div className="min-h-[24px] text-sm mb-2">{feedback}</div>
      {(feedback.includes('flag') || effectiveCompleted) && (
        <div className="mt-4">
          <div className="mb-2">Flag: <span className="bg-blue-700 px-2 py-1 rounded text-white font-mono">{FLAG}</span></div>
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
            onClick={checkFlag}
            disabled={isSubmitting || effectiveCompleted}
          >
            {isSubmitting ? 'Submitting...' : effectiveCompleted ? 'Completed' : 'Check Flag'}
          </button>
          <div className={`min-h-[24px] text-sm ${flagFeedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>
            {flagFeedback}
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenge2Order; 