import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'FLAG-NETWORK-HEADER';
const CHALLENGE_ID = 'network-timing';
const CHALLENGE_POINTS = 35;

const Challenge14NetworkTiming: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setFlagInput('');
      setFeedback('');
      setLoading(false);
    }
  }, [isRetakeMode]);

  const simulateRequest = async () => {
    if (effectiveCompleted) return;
    
    setLoading(true);
    try {
      const base = (window as any).PUBLIC_URL || process.env.PUBLIC_URL || '';
      const url = base.replace(/\/$/, '') + '/api/config-mock.json';
      await fetch(url);
    } catch (e) {
      // ignorujemy błąd, bo użytkownik i tak szuka flagi w Network
    }
    setLoading(false);
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
      <h2 className="text-2xl font-bold mb-2 text-green-400">
        Network Timing
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">In the Network tab, click "Simulate Request". In the response body (Preview/Response), find the <b>flag</b> field with the flag value.</p>
      <div className="mb-4">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium disabled:opacity-50" 
          onClick={simulateRequest} 
          disabled={loading || effectiveCompleted}
        >
          {loading ? 'Requesting...' : 'Simulate Request'}
        </button>
        <p className="mt-2 text-sm text-gray-400">(Use DevTools → Network → Preview/Response to inspect the flag.)</p>
      </div>
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
      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{feedback}</div>
    </div>
  );
};

export default Challenge14NetworkTiming; 