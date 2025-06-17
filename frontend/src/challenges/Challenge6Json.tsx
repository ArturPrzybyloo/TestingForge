import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'JSON-PARSER-PRO';
const CHALLENGE_ID = 'json-challenge';
const CHALLENGE_POINTS = 35;

const Challenge6Json: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFlag, setShowFlag] = useState(false);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  const sampleData = `{
  "users": [
    {"id": 1, "name": "Alice", "role": "user"},
    {"id": 2, "name": "Bob", "role": "admin"},
    {"id": 3, "name": "Charlie", "role": "user"}
  ],
  "config": {
    "version": "1.0",
    "debug": false,
    "secret_key": "hidden_flag_here"
  },
  "metadata": {
    "created": "2024-01-01",
    "flag": "${FLAG}"
  }
}`;

  const parseJson = () => {
    try {
      if (input.trim() === '') {
        setOutput('Please enter JSON data to parse');
        return;
      }

      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      
      // Check if the parsed JSON contains the flag
      if (JSON.stringify(parsed).includes(FLAG)) {
        setShowFlag(true);
        setFeedback('Flag found in JSON data!');
      }
    } catch (error) {
      setOutput('Invalid JSON format. Please check your syntax.');
    }
  };

  const loadSample = () => {
    setInput(sampleData);
    setOutput('');
    setShowFlag(false);
    setFeedback('Sample data loaded. Click "Parse JSON" to process it.');
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
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-4xl mx-auto mt-8 ${
      challengeCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        JSON Challenge
        {challengeCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        Parse and analyze JSON data to find the hidden flag. Load the sample data and examine its structure.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            JSON Input:
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-3 rounded bg-gray-700 text-white font-mono text-sm"
            placeholder="Enter JSON data here..."
            disabled={challengeCompleted}
          />
          <div className="flex gap-2 mt-2">
            <button 
              onClick={parseJson}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
              disabled={challengeCompleted}
            >
              Parse JSON
            </button>
            <button 
              onClick={loadSample}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
              disabled={challengeCompleted}
            >
              Load Sample Data
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Parsed Output:
          </label>
          <div className="w-full h-64 p-3 rounded bg-gray-700 text-green-400 font-mono text-sm overflow-auto whitespace-pre">
            {output || 'Output will appear here...'}
          </div>
        </div>
      </div>

      {showFlag && (
        <div className="mb-4 p-4 bg-green-900 border border-green-500 rounded-lg">
          <h3 className="text-green-400 font-semibold mb-2">🎉 Flag Found in JSON!</h3>
          <p className="text-white font-mono">Flag: {FLAG}</p>
        </div>
      )}

      {(showFlag || challengeCompleted) && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter the flag..."
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            disabled={challengeCompleted}
          />
          <button 
            onClick={checkFlag}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50"
            disabled={isSubmitting || challengeCompleted}
          >
            {isSubmitting ? 'Submitting...' : challengeCompleted ? 'Completed' : 'Submit Flag'}
          </button>
        </div>
      )}

      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : feedback.includes('found') ? 'text-blue-400' : 'text-red-400'}`}>
        {feedback}
      </div>

      {!showFlag && !challengeCompleted && (
        <div className="mt-4 text-sm text-gray-400">
          💡 Hint: Load the sample data and examine the JSON structure carefully. Look for nested properties.
        </div>
      )}
    </div>
  );
};

export default Challenge6Json; 