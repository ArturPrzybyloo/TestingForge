import React, { useState } from 'react';

const FLAG = 'TEST-ORDER-123';
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

const Challenge2Order: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [steps, setSteps] = useState(INIT);
  const [dragged, setDragged] = useState<number | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [flagFeedback, setFlagFeedback] = useState('');

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

  const checkFlag = () => {
    if (flagInput.trim() === FLAG) {
      setFlagFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 2: true }));
    } else {
      setFlagFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 text-blue-400">Order Matters! (Drag & Drop Test Cases)</h2>
      <p className="text-gray-300 mb-4">Arrange the test cases in the correct order (from 1 to 4).</p>
      <div className="space-y-2 mb-2">
        {steps.map((step, idx) => (
          <div
            key={step}
            draggable
            onDragStart={() => onDragStart(idx)}
            onDragOver={() => onDragOver(idx)}
            className={`p-2 rounded bg-gray-700 text-white mb-1 cursor-move border ${dragged === idx ? 'border-blue-400' : 'border-gray-700'}`}
          >
            {step}
          </div>
        ))}
      </div>
      <button className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={checkOrder}>Check order</button>
      <div className="min-h-[24px] text-sm mb-2">{feedback}</div>
      {feedback.includes('flag') && (
        <div className="mt-4">
          <div className="mb-2">Flag: <span className="bg-blue-700 px-2 py-1 rounded text-white font-mono">{FLAG}</span></div>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            placeholder="Enter the flag..."
            value={flagInput}
            onChange={e => setFlagInput(e.target.value)}
          />
          <button className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={checkFlag}>Check Flag</button>
          <div className={`min-h-[24px] text-sm ${flagFeedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{flagFeedback}</div>
        </div>
      )}
    </div>
  );
};

export default Challenge2Order; 