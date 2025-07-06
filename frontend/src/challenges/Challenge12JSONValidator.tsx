import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'FLAG-JSON-VALID';
const CHALLENGE_ID = 'json-validator';
const CHALLENGE_POINTS = 45;

const initialJson = [
  { key: 'id', value: '42', error: true, type: 'number', display: 'string' }, // should be number
  { key: 'email', value: 'user@forge', error: true, type: 'email', display: 'invalid' }, // invalid email
  { key: 'createdAt', value: '2023-13-99', error: true, type: 'date', display: 'invalid' }, // invalid date
  { key: 'isActive', value: 'yes', error: true, type: 'boolean', display: 'string' }, // should be boolean
  { key: 'role', value: 'user', error: false, type: 'string', display: 'string' },
];

const Challenge12JSONValidator: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [json, setJson] = useState(initialJson);
  const [found, setFound] = useState<string[]>([]);
  const [showFlag, setShowFlag] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [flagFeedback, setFlagFeedback] = useState('');

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setJson(initialJson);
      setFound([]);
      setShowFlag(false);
      setFlagInput('');
      setFlagFeedback('');
    }
  }, [isRetakeMode]);

  const handleFieldClick = (key: string, isError: boolean) => {
    if (effectiveCompleted) return;
    
    if (isError && !found.includes(key)) {
      const updated = [...found, key];
      setFound(updated);
      if (updated.length === initialJson.filter(f => f.error).length) {
        setShowFlag(true);
      }
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
        JSON Validator
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-6">
        Below is a simulated JSON response with several logic/type errors. Click all incorrect fields to unlock the flag.
      </p>
      <pre className="bg-gray-900 text-blue-200 rounded p-4 text-sm overflow-x-auto min-h-[64px] border border-gray-700 transition-all duration-300">
        <code>
          {'{'}
          {json.map((field, idx) => (
            <div key={field.key} style={{ display: 'flex', alignItems: 'center', cursor: field.error && !effectiveCompleted ? 'pointer' : 'default' }}>
              <span
                onClick={() => handleFieldClick(field.key, field.error)}
                className={
                  field.error
                    ? found.includes(field.key)
                      ? 'text-green-400 font-bold underline' : !effectiveCompleted ? 'hover:text-red-400 underline' : '' : ''
                }
              >
                &nbsp;  "{field.key}": "{field.value}"{idx < json.length - 1 ? ',' : ''}
              </span>
              {field.error && found.includes(field.key) && <span className="ml-2 text-green-400">✔</span>}
            </div>
          ))}
          {'}'}
        </code>
      </pre>
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

export default Challenge12JSONValidator; 