import React, { useState } from 'react';

const FLAG = 'FLAG-B64-2025';
const ORIGINAL = 'Automation is fun!';
const ENCODED = 'QXV0b21hdGlvbiBpcyBmdW4h';

const Challenge1Base64: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [flagFeedback, setFlagFeedback] = useState('');
  const [showFlag, setShowFlag] = useState(false);

  const handleEncode = () => {
    if (input.trim() === ENCODED) {
      setShowFlag(true);
      setFeedback('Great! You encoded the message. Here is your flag.');
    } else {
      setFeedback('Incorrect encoding. Try again.');
    }
  };

  const handleFlagCheck = () => {
    if (flagInput.trim() === FLAG) {
      setFlagFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      // Save progress
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 1: true }));
    } else {
      setFlagFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 text-green-400">Base64 Encoder</h2>
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
      <button className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={handleEncode}>Check encoding</button>
      <div className="min-h-[24px] text-sm mb-2">{feedback}</div>
      {showFlag && (
        <div className="mt-4">
          <div className="mb-2">Flag: <span className="bg-blue-700 px-2 py-1 rounded text-white font-mono">{FLAG}</span></div>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            placeholder="Enter the flag..."
            value={flagInput}
            onChange={e => setFlagInput(e.target.value)}
          />
          <button className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={handleFlagCheck}>Check Flag</button>
          <div className={`min-h-[24px] text-sm ${flagFeedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{flagFeedback}</div>
        </div>
      )}
    </div>
  );
};

export default Challenge1Base64; 