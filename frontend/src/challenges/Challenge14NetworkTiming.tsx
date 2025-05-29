import React, { useState } from 'react';

const FLAG = 'FLAG-NETWORK-HEADER';

const Challenge14NetworkTiming: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const simulateRequest = async () => {
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

  const checkFlag = () => {
    if (flagInput.trim() === FLAG) {
      setFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 14: true }));
    } else {
      setFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 text-green-400">Network Timing</h2>
      <p className="text-gray-300 mb-4">In the Network tab, click "Simulate Request". In the response body (Preview/Response), find the <b>flag</b> field with the flag value.</p>
      <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium" onClick={simulateRequest} disabled={loading}>
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
      />
      <button className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={checkFlag}>Check Flag</button>
      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{feedback}</div>
    </div>
  );
};

export default Challenge14NetworkTiming; 