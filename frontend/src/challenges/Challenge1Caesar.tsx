import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'CAESAR-SHIFT-13';
const CHALLENGE_ID = 'caesar-cipher';
const CHALLENGE_POINTS = 30;

const Challenge1Caesar: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [inputText, setInputText] = useState('PNRFNE-FUVSG-13');
  const [outputText, setOutputText] = useState('');
  const [shift, setShift] = useState(0);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  const applyCaesarCipher = (text: string, shift: number) => {
    return text.replace(/[A-Z]/g, (char) => {
      const code = char.charCodeAt(0);
      const shifted = ((code - 65 + shift) % 26 + 26) % 26;
      return String.fromCharCode(shifted + 65);
    });
  };

  const handleShiftChange = (newShift: number) => {
    setShift(newShift);
    setOutputText(applyCaesarCipher(inputText, newShift));
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
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-2xl mx-auto mt-8 ${
      challengeCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        Caesar Cipher Challenge
        {challengeCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        Decode the Caesar cipher below to reveal the hidden message. Try different shift values.
      </p>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Encrypted Text:
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value.toUpperCase())}
          className="w-full p-2 rounded bg-gray-700 text-white font-mono"
          disabled={challengeCompleted}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Shift Value: {shift}
        </label>
        <input
          type="range"
          min="0"
          max="25"
          value={shift}
          onChange={(e) => handleShiftChange(parseInt(e.target.value))}
          className="w-full"
          disabled={challengeCompleted}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Decrypted Text:
        </label>
        <div className="w-full p-2 rounded bg-gray-700 text-green-400 font-mono min-h-[40px]">
          {outputText}
        </div>
      </div>

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

      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>
        {feedback}
      </div>
    </div>
  );
};

export default Challenge1Caesar; 