import React, { useState } from 'react';

const FLAG = 'FLAG-FORM-FUZZ';

const Challenge15FormInputFuzzer: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [jsonResponse, setJsonResponse] = useState('');

  const handleSubmit = () => {
    // Simulacja odpowiedzi JSON
    setJsonResponse(JSON.stringify({ flag: FLAG }, null, 2));
  };

  const checkFlag = () => {
    if (flagInput.trim() === FLAG) {
      setFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 15: true }));
    } else {
      setFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 text-blue-400">Form Input Fuzzer</h2>
      <p className="text-gray-300 mb-4">On the registration page, fill all fields with an extremely long string (e.g., 200 random characters). After clicking "Submit", in the JSON response (Network → Preview) you will find the <b>flag</b> field.</p>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 text-white mb-2"
          placeholder="Enter a long string (simulate fuzzing)..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={handleSubmit}>Submit</button>
        {jsonResponse && (
          <pre className="bg-gray-900 text-green-400 rounded p-2 mt-2 text-xs">{jsonResponse}</pre>
        )}
      </div>
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-700 text-white mb-2"
        placeholder="Enter the flag..."
        value={flagInput}
        onChange={e => setFlagInput(e.target.value)}
      />
      <button className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={checkFlag}>Check Flag</button>
      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{feedback}</div>
    </div>
  );
};

export default Challenge15FormInputFuzzer; 