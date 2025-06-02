import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

// Use the ID and flag from the backend challenges
const CHALLENGE_ID = 'missing-button'; // Maps to the first backend challenge
const FLAG = 'BUTTON_MISSING'; // From backend
const ORIGINAL = 'Automation is fun!';
const ENCODED = 'QXV0b21hdGlvbiBpcyBmdW4h';

const Challenge1Base64: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [flagFeedback, setFlagFeedback] = useState('');
  const [showFlag, setShowFlag] = useState(false);
  const [pointsEarned, setPointsEarned] = useState<number | null>(null);
  
  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  const handleEncode = () => {
    if (input.trim() === ENCODED) {
      setShowFlag(true);
      setFeedback('Great! You encoded the message. Here is your flag.');
    } else {
      setFeedback('Incorrect encoding. Try again.');
    }
  };

  const handleFlagCheck = async () => {
    if (flagInput.trim() === '') {
      setFlagFeedback('Please enter a flag. ❌');
      return;
    }

    const result = await submitFlag(CHALLENGE_ID, flagInput);
    
    if (result.success) {
      setFlagFeedback(`🎉 ${result.message}`);
      if (result.pointsEarned) {
        setPointsEarned(result.pointsEarned);
      }
      if (onComplete) onComplete();
    } else {
      setFlagFeedback(`❌ ${result.message}`);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-green-400">Base64 Encoder</h2>
        {challengeCompleted && (
          <div className="flex items-center text-green-400 text-sm">
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Completed
          </div>
        )}
      </div>
      
      <p className="text-gray-300 mb-4">
        Encode the following message to <span className="bg-gray-700 px-2 py-1 rounded">base64</span> and enter the result below. This is a common encoding used in web development and testing.<br />
        <span className="text-blue-400 font-mono text-lg">{ORIGINAL}</span>
      </p>
      
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-700 text-white mb-2"
        placeholder="Enter the base64 encoded message..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      
      <button 
        className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors" 
        onClick={handleEncode}
      >
        Check encoding
      </button>
      
      <div className="min-h-[24px] text-sm mb-2">{feedback}</div>
      
      {showFlag && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <div className="mb-2">
            Flag: <span className="bg-blue-700 px-2 py-1 rounded text-white font-mono">{FLAG}</span>
          </div>
          
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-600 text-white mb-2"
            placeholder="Enter the flag..."
            value={flagInput}
            onChange={e => setFlagInput(e.target.value)}
          />
          
          <button 
            className="w-full mb-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white rounded font-medium shadow py-2 transition-colors" 
            onClick={handleFlagCheck}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Flag'}
          </button>
          
          <div className={`min-h-[24px] text-sm ${flagFeedback.includes('🎉') ? 'text-green-400' : 'text-red-400'}`}>
            {flagFeedback}
          </div>
          
          {pointsEarned && (
            <div className="mt-2 text-green-400 font-semibold">
              +{pointsEarned} points earned!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Challenge1Base64; 