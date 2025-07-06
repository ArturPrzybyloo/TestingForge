import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'FLAG-RACE-CONDITION';
const ENDPOINT = '/api/orders-mock.json';
const CHALLENGE_ID = 'race-condition-tester';
const CHALLENGE_POINTS = 55;

const Challenge16RaceConditionTester: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [jsonInput, setJsonInput] = useState('{\n  "orderId": 123,\n  "amount": 50.25,\n  "userId": 789\n}');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setJsonInput('{\n  "orderId": 123,\n  "amount": 50.25,\n  "userId": 789\n}');
      setResponse('');
      setLoading(false);
      setFlagInput('');
      setFeedback('');
    }
  }, [isRetakeMode]);

  const handleSend = async () => {
    if (effectiveCompleted) return;
    
    setLoading(true);
    try {
      let body = JSON.parse(jsonInput);
      const base = (window as any).PUBLIC_URL || process.env.PUBLIC_URL || '';
      const url = base.replace(/\/$/, '') + ENDPOINT;

      // Sprawdź czy JSON zawiera flag: true
      let responseText = `Status: 200\nResponse: {"status": "success"}`;
      if (body.flag === true) {
        responseText = `Status: 200\nResponse: {"status": "success", "flag": "${FLAG}"}`;
      }

      setTimeout(() => {
        setResponse(responseText);
        setLoading(false);
      }, 1000);
    } catch (e) {
      setResponse(`Error: Invalid JSON - ${e}`);
      setLoading(false);
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
      <h2 className="text-2xl font-bold mb-2 text-yellow-400">
        Order API Flag Challenge
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">Edit the JSON below and add <b>"flag": true</b> as a property. Then send a POST request. If the server receives <b>flag: true</b>, it will return the flag in the response. Find the flag in the response and enter it below.</p>
      <div className="mb-4">
        <textarea
          className="w-full p-2 rounded bg-gray-700 text-white font-mono mb-2"
          rows={6}
          value={jsonInput}
          onChange={e => setJsonInput(e.target.value)}
          disabled={effectiveCompleted}
        />
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium disabled:opacity-50" 
          onClick={handleSend} 
          disabled={loading || effectiveCompleted}
        >
          {loading ? 'Sending...' : 'Send POST'}
        </button>
        <p className="mt-2 text-sm text-gray-400">(POST to <code>{ENDPOINT}</code> is mocked in the browser)</p>
        {response && <pre className="bg-gray-900 text-green-400 rounded p-2 mt-2 text-xs">{response}</pre>}
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

export default Challenge16RaceConditionTester; 